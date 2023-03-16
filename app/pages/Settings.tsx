//import react base 
import { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, Button, StyleSheet, Image, ScrollView } from 'react-native'

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
  } from 'react-native-document-picker'

//import custom components
import BottomSheet from '../components/BottomSheet';
import { ChangeProfileData, OperatorProfileData, DeleteProfile, ConfirmMail } from '../components/BSComponent'
import { MenuList } from '../components/List';

//import icons
import { LeftArrowSVG } from '../icons/leftArrow';
import { BookmarkSVG } from '../icons/bookmark';
import { FavoriteSVG } from '../icons/favorite';
import { FavoriteActiveSVG } from '../icons/favoriteActive';
import { StarSVG } from '../icons/star';
import { DocumentSVG } from '../icons/document';
import { RightArrowSVG } from '../icons/rightArrow';
import { TrashSVG } from '../icons/trash';
import { LogoutSVG } from '../icons/logout';
import { UploadSVG } from '../icons/upload';
import { ChatSVG } from '../icons/chat';
import { MusicSVG } from '../icons/music';
import { InfoSVG } from '../icons/info';

//import custom services
import { setUser } from '../redux/actions'
import { useAuth } from '../context/Auth'
import { BACKEND_URL } from '../services/const';

const includeExtra = true;
const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
}
const Settings = () => {

    //Custom service
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { user } = useSelector(state => state.userReducer);

    //custom data
    const [photo, setPhoto] = useState();
    const [brief, setBrief] = useState();
    const [about, setAbout] = useState();
    const [goals, setGoals] = useState();
    const [code, setCode] = useState();
    const [confirmCode, setConfirmCode] = useState();
    const [referralCode, setReferralCode] = useState(null);
    
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [years, setYears] = useState();

    const [result, setResult] = useState<Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null>()

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }

    //save data to local
    useEffect( () => {
        setName(user.nickname);
        setPassword(user.password);
        setYears(user.birth);
        if (user.role === 'CLIENT') _getReferralCode();
    }, [])

    

    //bottom sheet data
    const ref = useRef<BottomSheetModal>(null);
    console.log('settings user', user);
    const ref1PresentModalPress = useCallback( () => {
        ref.current?.present();
    }, [] );

    //bottom sheet data
    const ref2 = useRef<BottomSheetModal>(null);

    const ref2PresentModalPress = useCallback( () => {
        ref2.current?.present();
    }, [] );

    //bottom sheet data
    const ref3 = useRef<BottomSheetModal>(null);

    const ref3PresentModalPress = useCallback( () => {
        ref3.current?.present();
    }, [] );

    //bottom sheet data
    const ref4 = useRef<BottomSheetModal>(null);

    const ref4PresentModalPress = useCallback( () => {
        ref4.current?.present();
    }, [] );


    //Custom function
    _onPressExit = async () => {
        await auth.signOut();
    }


    _checkCode = () => {
        console.log('code', code)
        console.log('confirmCode', confirmCode)
        ref4.current?.close();
        if (code == confirmCode) {
            _confirmMail();
            user.isSuccessful = true;
            dispatch(setUser(user));
        } 
    }

    _confirmMail = async () => {
        try {
          const response = await fetch(BACKEND_URL + 'auth/confirm',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    login: user.login
                }),
            }
          );

        }catch (error) {
          console.log(error)
        }
      };

    _saveProfileData = async () => {

        let newUser = user;
        newUser.nickname = name;
        newUser.birth = years;
        
        dispatch(setUser(newUser));
        ref.current?.close();

        try {
            const response = await fetch(BACKEND_URL + 'auth/updateBaseData',{
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  body: JSON.stringify({
                      login: user.login,
                      FIO: name,
                      password: password,
                      years: years
                  }),
              }
            );
  
          }catch (error) {
            console.log(error)
          }
    }

    _saveOperatorProfileData = async () => {

        ref2.current?.close();

        try {
            const response = await fetch(BACKEND_URL+'operator',{
                  method: 'PUT',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  body: JSON.stringify({
                      userId: user.id,
                      brief: brief,
                      aboutMe: about,
                      goals: goals
                  }),
              }
            );
  
          }catch (error) {
            console.log(error)
          }
    }

    _deleteProfile = async () => {

        ref3.current?.close();

        try {
            const response = await fetch(BACKEND_URL+'user/ban',{
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  body: JSON.stringify({
                      id: user.id,
                      isBanned: 1,
                      banCause: 'Профиль удален'
                  }),
              }
            );
            //Выйдем из профиля
            _onPressExit();
  
          }catch (error) {
            console.log(error)
          }
    }

    _importAudio = async() => {
        DocumentPicker.pick({
            type: types.audio,
          })
            .then(setResult)
            .catch(handleError)
        console.log('result', result)
    }

    _getReferralCode = async () => {
        try {
            const response = await fetch(BACKEND_URL+'client/'+user.id);
            const json = await response.json();
            console.log('json', json)
            setReferralCode(json.referralCode)
        } catch (error) {
          console.error('error', error);
        }
    }

    _importImage = async() => {
        
        const images = await launchImageLibrary(options);
        const formData = new FormData()
        
        formData.append('image', {
            uri: images.assets[0].uri,
            type: images.assets[0].type,
            name: images.assets[0].fileName
        });

        let res = await fetch(BACKEND_URL+'user/uploadPhoto', 
            { 
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                body: formData 
            });
        let responseJSON = await res.json();
        console.log('responseJSON', responseJSON);
        const newUri = BACKEND_URL + responseJSON.fileName;
        user.avatar = newUri;
        dispatch(setUser(user));
        console.log(user);
        let res2 = await fetch(BACKEND_URL + 'user/updateAvatar', 
            { 
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, filename: newUri }),
            });
        let responseJSON2 = await res2.json();
        console.log('responseJSON2', responseJSON2);

    }
   
    useEffect(() => {
        _sendAudio();        
    }, [result])

    _sendAudio = async () => {
        console.log(JSON.stringify(result, null, 2))
        const formData = new FormData()
        let uri = null;
        let type= null;
        let name = null;
        result.map(item => {
            uri = item.uri;
            type = item.type;
            name = item.name;
        })
        
        formData.append('file', {
            uri: uri,
            type: type,
            name: name
        });
        console.log('formDATA')
        let res = await fetch(BACKEND_URL+'operator/uploadAudio', 
            { 
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                body: formData 
            });
        let responseJSON = await res.json();
        console.log('responseJSON', responseJSON);
        const newUri = BACKEND_URL + responseJSON.fileName;
        let res2 = await fetch(BACKEND_URL + 'operator/updateAudio', 
            { 
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, filename: newUri }),
            });
        let responseJSON2 = await res2.json();
        console.log('responseJSON2', responseJSON2);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        
        <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
            <LeftArrowSVG onPress={ () => navigation.goBack()}/>
        </View>
        <Image 
            source={{
                uri: user.avatar
            }}
            style={styles.operatorAvatar}
        />
        <View style={styles.container}>
            <MenuList onPress={_importImage} text="Load photo" icon={<UploadSVG/>}/>
            { user.role === 'OPERATOR' ? <MenuList onPress={_importAudio} text="Load audio" icon={<MusicSVG/>}/> : null }
            <MenuList onPress={ref1PresentModalPress} text="Change profile data" icon={<DocumentSVG/>} secondIcon={<RightArrowSVG/>}/>
            { user.role === 'OPERATOR' ? <MenuList onPress={ref2PresentModalPress} text="About me" icon={<DocumentSVG/>} secondIcon={<RightArrowSVG/>} /> : ''}
            { !user.isSuccessful ? <MenuList onPress={ref4PresentModalPress} text="Confirm mail" icon={<ChatSVG/>} secondIcon={<RightArrowSVG/>} /> : ''}
            <MenuList onPress={ref3PresentModalPress} text="Delete this profile" icon={<TrashSVG/> } secondIcon={<RightArrowSVG/>}/>
            { user.role === 'CLIENT' ? <MenuList text={"Referral code:  " + referralCode} icon={<InfoSVG/>} /> : null }
            <MenuList onPress={_onPressExit}  text="Exit from account" icon={<LogoutSVG/>} />

        </View>
           
        </ScrollView>
        <BottomSheet ref={ref}>
            <ChangeProfileData
                name={name} setName={setName}
                password={password} setPassword={setPassword}
                years={years} setYears={setYears}
                onPress={_saveProfileData}
            />
        </BottomSheet>
        <BottomSheet ref={ref2}>
            <OperatorProfileData
                brief={brief} setBrief={setBrief}
                about={about} setAbout={setAbout}
                goals={goals} setGoals={setGoals}
                onPress={_saveOperatorProfileData}
            />
        </BottomSheet>
        <BottomSheet ref={ref3}>
            <DeleteProfile
                onPress={_deleteProfile}
            />
        </BottomSheet> 
        <BottomSheet ref={ref4}>
            <ConfirmMail
                code={code} setCode={setCode}
                userId={user.id} setConfirmCode={setConfirmCode}
                onPress={_checkCode}
            />
        </BottomSheet> 
        </GestureHandlerRootView>
    
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 40,
        paddingTop: 40
    },
    
    contentContainer: {
        padding: 40,
    },

    operatorAvatar: {
        width: 180, 
        height: 180, 
        borderRadius: 400/2,
        marginTop: -20,
        marginLeft: 'auto',
        marginRight: 'auto' 
    },

    

})

export default Settings;