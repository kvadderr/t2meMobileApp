//import react base 
import { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, Button, StyleSheet, Image, FlatList, ScrollView } from 'react-native'

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import SwitchSelector from "react-native-switch-selector";

//import custom components
import { DefaultButton, SimpleButton } from '../components/Button';
import { Withdrawal } from '../components/BSComponent'
import BottomSheet from '../components/BottomSheet';
import Header from '../components/Header'
import Alert from '../components/Alert';
import { StatisticCard } from '../components/Card';

//import custom services
import { socket, BACKEND_URL } from '../services/const'

const Operator = () => {

    //Custom service
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer);
    const [operStat, setOperStat] = useState({});
    console.log('STAT DATA', operStat);

    const ref = useRef<BottomSheetModal>(null);
    const WithdrawalPresentModalPress = useCallback( () => {
        ref.current?.present();
    }, [] );

    const stat = [
        {
            title: 'Average rating',
            value: operStat.avgRaitConst
        },
        {
            title: 'Place of rating',
            value: '-'
        },
        {
            title: 'Added to favorites',
            value: operStat.favoriteCountConst
        },
        {
            title: 'Call for today',
            value: operStat.callForTodayCount
        },
        {
            title: 'Call for week',
            value: operStat.callForWeekConst
        },
        {
            title: 'Call for month',
            value: operStat.callForMonthConst
        },
        {
            title: 'Amount of money earned',
            value: operStat.moneyConst
        },

    ]

    const renderItem = ({ item }) => {
        return (
             <StatisticCard value={item.value} title={item.title}/>
        );
    };

    const getOperStat = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'analytics/operatorStat/'+user.id);
            const json = await response.json();
            setOperStat(json);
        } catch (error) {
          console.error(error);
        }
    }

    //Custom data
    const options = [
        { label: "I'm offline", value: "OFFLINE" },
        { label: "I'm online", value: "ONLINE" },
    ];
    const [calling, setCalling] = useState(false);
    const [callData, setCallData] = useState({});

    _goToCall = () => {
        setCalling(false);
        socket.emit('callConfirmation', callData);
        navigation.navigate('OperatorCall', callData);
    }

    _rejectCall = () => {
        setCalling(false);
        socket.emit('dropCall', callData);
    }

    _sendRequestToWithdrawal = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'withdrawals', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    status: 'PROCESS',
                    userId: user.id
                }),
            });
            ref.current?.close();
        } catch (error) {
          console.error(error);
        }
    }

    //lock go to back
    useEffect (() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });

        getOperStat();

        socket.on("callRequest", function(data) {

            const someData = {
                FIO: data.clientFIO,
                channelName: data.channelName,
                token: data.token,
                balance: data.balance,
                bonus: data.bonus,
                user: {
                    avatar: data.clientAvatar,
                    id: data.clientId,
                },
                operatorId: user.id,
                clientId: data.clientId
            }
            
            setCallData(someData);
            setCalling(true);
        });

        socket.on("dropCall", function(data) {
            setCalling(false)
        })

    }, [])


    return (
        <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>

            <Header onPress={WithdrawalPresentModalPress}/>
            
            <SwitchSelector
                style={styles.switch}
                options={options}
                initial={0}
                buttonColor={'#038E11'}
                animationDuration={200}
                onPress={value => {
                    if (value === 'OFFLINE') socket.emit('offlineStatus', user.id);
                    if (value === 'ONLINE') socket.emit('onlineStatus', user.id);
                }}
            />

            <FlatList
                data={stat}
                keyExtractor={item => "_" + item.id}
                numColumns={2}
                renderItem={renderItem}
            />

            <Alert visible={calling}>
                <Image 
                    source={{
                        uri: callData.user?.avatar
                    }}
                    style={styles.operatorAvatar}
                />
                <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
                    {callData.FIO}
                </Text>
                <View style={styles.twoColumn}> 
                    <SimpleButton text={'Reject'} onPress={_rejectCall}/>
                    <DefaultButton text={'Accept'} onPress={_goToCall}/>
                </View>
            </Alert>
            <BottomSheet ref={ref}>
                <Withdrawal onPress ={_sendRequestToWithdrawal}/>
            </BottomSheet>

        </View>
        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        minHeight: '100%'
    },
    
    contentContainer: {
        padding: 40,
    },

    operatorAvatar: {
        width: 180, 
        height: 180, 
        borderRadius: 400/2,
    },

    twoColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

})

export default Operator;