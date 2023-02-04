import { useRef, useCallback, useEffect, useState } from 'react' 

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Linking
} from 'react-native'

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

//import custom components
import BottomSheet from '../components/BottomSheet';
import Header from '../components/Header'
import { MenuCard, OperatorCard, FavoriteCard } from '../components/Card'
import { FAQ, Support, Payment } from '../components/BSComponent'

//import custom service
import { useAuth } from '../context/Auth'
import { BACKEND_URL } from "../services/const";
import { socket } from '../services/const'

const Client = () => {

    //Custom service
    const auth = useAuth();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { favorite, user, onlineOperatorList } = useSelector(state => state.userReducer);

    //Custom data
    const [operator, setOperator] = useState([]);
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState();
    const [payURL, setPayURL] = useState();
    const [isLoad, setIsLoad] = useState(false);

    const ref = useRef<BottomSheetModal>(null);
    const ref2 = useRef<BottomSheetModal>(null);
    const ref3 = useRef<BottomSheetModal>(null);

    const FAQPresentModalPress = useCallback( () => {
        ref.current?.present();
    }, [] );

    const SupportPresentModalPress = useCallback( () => {
        ref2.current?.present();
    }, [] );

    const PaymentPresentModalPress = useCallback( () => {
        ref3.current?.present();
    }, [] );

    //Custom function
    _onPressExit = async () => {
        await auth.signOut();
    }

    const renderFavoriteItem = ({ item }) => {
        return (
            <FavoriteCard item={item} />
        );
    };

    useEffect(() => {

        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });

        getTopOperators();
        socket.emit('sendMeList', {"userId": user.id});
    }, [])

    
    useEffect(() => {
        _updateOperatorStatus();
    }, [onlineOperatorList])

    _updateOperatorStatus = () => {
        operator.map( item => {
            if (onlineOperatorList.includes(item.userId)) {
                console.log('item: ', item);
                item.status = 'Online';
            }
        })
    }

    const getTopOperators = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'operator/top');
            const json = await response.json();
            setOperator(json);
        } catch (error) {
          console.error(error);
        }
    }

    _linkPress = async () => {
        console.log(payURL);
        Linking.openURL(payURL).catch(err => console.error('An error occurred', err));
    }

    _getLink = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'payment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    amount: amount,
                    user_id: user.id
                }),
            });
            const json = await response.json();
            setPayURL(json.pay_url);
            setIsLoad(true);
        } catch (error) {
          console.error(error);
        }
    }


    _sendSupportMsg = async () => {
        ref2.current?.close();
        try 
        {
            const response = await fetch(BACKEND_URL + 'support', {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, message: message }),
            });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
            <Header onPress={PaymentPresentModalPress}/>
            <View style={styles.operatorListHeader}>
                <Text style={styles.secondaryText}>Best operators</Text>
                <Text style={styles.additionalText} onPress={()=>navigation.navigate('OperatorList')}>see all</Text>
            </View>

            {
                operator.map( item => {
                    return <OperatorCard props={item}/>
                })
            }

            {
                favorite.length > 0 ?
                        <View>
                        <View style={styles.operatorListHeader}>
                        <Text style={styles.secondaryText}>Favorite</Text>
                        </View>
                        <FlatList
                            data={favorite}
                            keyExtractor={item => "_K_" + item.id}
                            renderItem={renderFavoriteItem}
                            horizontal={true}
                        />
                        </View>
                : 
                ''
            }
                
        </View>
        
        <ScrollView 
            horizontal={true} 
            contentContainerStyle={styles.contentContainer} 
            indicatorStyle='black' 
            showsHorizontalScrollIndicator={false}>
            <MenuCard onPress={FAQPresentModalPress} image='0' title='FAQ' desk='we will answer all your questions'/>
            <MenuCard image='1' title='FAST CALL' desk='Звонок свободному оператору'/>
            <MenuCard onPress={SupportPresentModalPress} image='1' title='SUPPORT' desk='24/7 near you'/>
            <MenuCard image='0' title='SETTINGS' desk='control this app'/>
            <MenuCard onPress={_onPressExit} image='1' title='Exit' desk='Exit from this account'/>
        </ScrollView>
        <BottomSheet ref={ref}>
            <FAQ/>
        </BottomSheet>
        <BottomSheet ref={ref2}>
            <Support message={message} setMessage={setMessage} onPress={_sendSupportMsg}/>
        </BottomSheet> 
        <BottomSheet ref={ref3}>
            <Payment amount={amount} setAmount={setAmount} onPress={_getLink} linkPress={_linkPress} isLoad={isLoad}/>
        </BottomSheet>    
        </ScrollView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 40,
        flex: 1
    },

    operatorListHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingTop: 20,
    },

    secondaryText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 16,
    },

    additionalText: {
        fontFamily: 'Qanelas-Light',
        fontSize: 14,
    },

    contentContainer:{
        paddingLeft: 40,
        paddingBottom: 40,
        paddingRight: 20
    },
    
})

export default Client;