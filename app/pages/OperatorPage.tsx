import { useState, useRef, useCallback, useEffect } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { SharedElement } from 'react-navigation-shared-element';
import Lottie from 'lottie-react-native';
import Sound from 'react-native-sound';

//import custom component
import { MenuList } from '../components/List';
import { DefaultButton } from '../components/Button';
import { Reviews, OperatorDetails, GiveFeedback } from '../components/BSComponent'
import BottomSheet from '../components/BottomSheet';
import Alert from '../components/Alert';

//import custom services
import { setFavorite } from '../redux/actions';
import { BACKEND_URL } from '../services/const';

//import icons
import { BookmarkSVG } from '../icons/bookmark';
import { LeftArrowSVG } from '../icons/leftArrow';
import { FavoriteSVG } from '../icons/favorite';
import { FavoriteActiveSVG } from '../icons/favoriteActive';
import { StarSVG } from '../icons/star';
import { DocumentSVG } from '../icons/document'
import { FlashSVG } from '../icons/flash';
import { RightArrowSVG } from '../icons/rightArrow'
import { MusicSVG } from '../icons/music'
import { InfoSVG } from '../icons/info'
 
const OperatorPage = ({route}) => {

    const profile = route.params;
    const dispatch = useDispatch();
    const { user, favorite } = useSelector(state => state.userReducer);
    const navigation = useNavigation();

    //custom data
    const [isFavorite, setIsFavorite] = useState(false);
    const [operatorReview, setOperatorReview] = useState([]);
    const [grade, setGrade] = useState(0);
    const [operatorGrade, setOperatorGrade] = useState();
    const [comment, setComment] = useState('');
    const [alert, showAlert] = useState(false);
    const [music, setMusic] = useState(null);
    const [audioPlay, setAudioPlay] = useState(false);
    const [specialization, setSpecialization] = useState('');

    //bottom sheet data
    const ref = useRef<BottomSheetModal>(null);
    const ref2 = useRef<BottomSheetModal>(null);
    const ref3 = useRef<BottomSheetModal>(null);
    const DetailPresentModalPress = useCallback( () => {
        ref.current?.present();
    }, [] );

    const ReviewPresentModalPress = useCallback( () => {
        ref2.current?.present();
    }, [] );

    const FeedbackPresentModalPress = useCallback( () => {
        ref3.current?.present();
    }, [] );

    //functions

    _play =  async () => {        
        setAudioPlay(true);
        console.log('press play')
        music.play();
    }

    _stop = async() => {
        setAudioPlay(false)
        console.log(music)
        music.stop();
    }

    const ListenAudio = () => {
        console.log(audioPlay)
        audioPlay ? _stop() : _play()
    }

    useEffect( () => {
        if (favorite.length > 0 && favorite.filter(value => value.id === profile.id).length > 0) {
            setIsFavorite(true);
        }
        
        _getOperatorReview();
        _getOperatorGrade();
        _initSound();
        
        let specializationArray = []
        profile.specializations.map( item => {
            specializationArray.push(item.name);
            
        })
        console.log('profilePRO', profile.specializations)
        setSpecialization(specializationArray.join(' / '))
        
    }, [])

    _initSound = async() => {
        let summer = await new Sound(profile.audio, '',(err, _sound) => {
            if (err) {
                console.log('ga', err);
                return;
            }
            summer.play((success) => {
                summer.release();
                console.log('end', success)
            })
            summer.stop(() => {
                summer.stop();
            })
        })
        setMusic(summer);
    }

    _getOperatorReview = async() => {
        try {
            const response = await fetch(BACKEND_URL+'review/'+profile.user.id);
            const json = await response.json();
            setOperatorReview(json);
        } catch (error) {
          console.error(error);
        }
    }

    _getOperatorGrade = async () => {
        try {
            const response = await fetch(BACKEND_URL+'review/grade/'+profile.user.id);
            const json = await response.json();
            const avgGrade = json.AVG * 10;
            const formatted = Math.round(avgGrade);
            setOperatorGrade(formatted/10);
        } catch (error) {
          console.error(error);
        }
    }

    _addFavorite = async () => {
        try 
        {
            const response = await fetch(BACKEND_URL + 'favorite', {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, operatorId: profile.id }),
            });
            console.log('ADD FAVORITE!', profile.id)
        } catch (error) {
            console.log(error)
        }
    };

    _deleteFavorite = async () => {
        try 
        {
            const response = await fetch(BACKEND_URL + 'favorite', {
                method: 'DELETE',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, operatorId: profile.id }),
            });
        } catch (error) {
            console.log(error)
        }
    };

    _setFavorite = () => {

        if (isFavorite) { 
            favRemoved = favorite.filter(value => value.id !== profile.id)
            dispatch(setFavorite(favRemoved));            
            _deleteFavorite();
        } else {
            favorite.push(profile)
            dispatch(setFavorite(favorite));
            _addFavorite();
        }

        setIsFavorite(!isFavorite);
    }

    _goToCall = () => {
        navigation.navigate('ClientCall', profile);
    }

    _goBack = () => {
        navigation.goBack();
    }

    _addReview = () => {
        const data = {
            client: {
                nickname: user.nickname
            },
            review: comment
        }
        operatorReview.push(data);
        ref3.current?.close();
        _sendReviewToBack();
        showAlert(true);
    }

    _sendReviewToBack = async () => {
        try {
          const response = await fetch(BACKEND_URL + 'review',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    clientId: user.id,
                    operatorId: profile.user.id,
                    review: comment,
                    grade: grade
                }),
            }
          );

        }catch (error) {
          console.log(error)
        }
      };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic">
            <View style = {styles.header}>
                <LeftArrowSVG onPress={_goBack}/>
                {isFavorite ? <FavoriteActiveSVG onPress={_setFavorite}/> : <FavoriteSVG onPress={_setFavorite}/>}
            </View>
            <SharedElement id={`trip.${profile.user.avatar}.image`}>
                <Image 
                    source={{
                        uri: profile.user.avatar
                    }}
                    style={styles.operatorAvatar}
                />
            </SharedElement>
            <View style={styles.container}>
                <View style={styles.aboutBlock}>
                    <Text style={styles.data}>{specialization}</Text>
                    <InfoSVG/>
                </View>
                <Text style={styles.fioText}>{profile.user.nickname}</Text>
                <View style={styles.aboutBlock}>
                    <View style={styles.aboutItem}>
                        <StarSVG/>
                        <Text style={styles.thirdText, {marginLeft: 2}}>{operatorGrade}</Text>
                    </View>
                    <View style={styles.aboutItem}>
                        <FlashSVG/>
                        <Text style={styles.thirdText, {marginLeft: 2}}>{profile.user.birth}</Text>
                    </View>
                    <View style={styles.aboutItem}>
                        <FlashSVG/>
                        <Text style={styles.thirdText, {marginLeft: 2}}>{ profile.status? profile.status : 'Offline'}</Text>
                    </View>
                </View>
                <View style={styles.briefBlock}>
                    <Text style={styles.secondaryText}>Brief information</Text>
                    <Text style={styles.briefText}>{profile.brief}</Text>
                </View>

                { 
                    profile.audio ?
                    <MenuList onPress={ListenAudio} text="Listen to the operator's voice" icon={<MusicSVG/>}/> : null
                }
                <MenuList onPress={DetailPresentModalPress} text="More details" icon={<BookmarkSVG/>} secondIcon={<RightArrowSVG/>}/>
                <MenuList onPress={ReviewPresentModalPress} text="Reviews" icon={<DocumentSVG/>} secondIcon={<RightArrowSVG/>}/>
                <MenuList onPress={FeedbackPresentModalPress} text="Give feedback" icon={<BookmarkSVG/>} secondIcon={<RightArrowSVG/>}/>

                <View style={styles.callBlock}>
                    <View>
                        <Text style={styles.fioText}>$ {profile.price}</Text>
                        <Text style={styles.thirdText}>per minutes</Text>    
                    </View>
                    {
                        profile.status === 'Online' ? 
                        <DefaultButton text={'Call'} onPress={_goToCall}/> :
                        null
                    }
                    
                </View>
            </View>
            <BottomSheet ref={ref}>
                <OperatorDetails aboutMe={profile.aboutMe} goals={profile.goals}/>
            </BottomSheet>
            <BottomSheet ref={ref2}>
                <Reviews reviews={operatorReview}/>
            </BottomSheet>
            <BottomSheet ref={ref3}>
                <GiveFeedback setGrade={setGrade} comment={comment} setComment={setComment} onPress={_addReview}/>
            </BottomSheet>
            <Alert visible={alert}>
                <Lottie style={{height: 200, marginBottom:40, alignItems:'center',}} source={require('../../assets/animation/success.json')} autoPlay loop />
                <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
                Your review has been added
                </Text>
                <DefaultButton text={'Okay'} onPress={() => showAlert(false)}/>
            </Alert>
        </ScrollView>    
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 40,
        paddingTop: 40
    },

    operatorAvatar: {
        width: 180, 
        height: 180, 
        borderRadius: 180/2,
        marginTop: -20,
        marginLeft: 'auto',
        marginRight: 'auto' 
    },

    container: {
        padding: 40,
    },

    fioText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 24,
        marginTop: 10
    }, 

    data: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 14,
        color: '#909090'
    },

    secondaryText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 16
    },

    thirdText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 12,
    },

    briefText: {
        fontFamily: 'Qanelas-Light',
        fontSize: 12,
        marginTop: 10
    },

    aboutBlock: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    aboutItem: {
        flex: 1,
        flexDirection: 'row'
    },

    briefBlock: {
        marginTop: 30,
        marginBottom: 30
    },

    callBlock: {
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

})


export default OperatorPage;