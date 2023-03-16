import React, {useRef, useState, useEffect, useLayoutEffect} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { ClientRoleType, createAgoraRtcEngine, IRtcEngine, ChannelProfileType } from 'react-native-agora';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
//import custom component
import { DefaultButton } from '../components/Button';

//import custom services
import { socket } from '../services/const'

//Formatted seconds to 00:00
const getPadTime = (time) => time.toString().padStart(2, '0');

const appId = 'ddafd74f4177415b9a7201aa56ecc12f';
const uid = 0;

const summer = new Sound('sound.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + summer.getDuration() + 'number of channels: ' + summer.getNumberOfChannels());
});

const alert = new Sound('alert.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + summer.getDuration() + 'number of channels: ' + summer.getNumberOfChannels());
});

const ClientCall = ({route}) => {

    const callData = route.params;
    const dispatch = useDispatch();
    const { user, balance, bonus } = useSelector(state => state.userReducer);
    const navigation = useNavigation();

    //Agora connect params
    const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    const [music, setMusic] = useState(null)

    const [timeLeft, setTimeLeft] = useState(0);    
    const minutes = getPadTime(Math.floor(timeLeft/60));
    const seconds = getPadTime(timeLeft - minutes *60); 
    
    const [token, setToken] = useState();
    const [channelName, setChannelName] = useState();
    const opponentId = callData.user.id;
    const [availableTime, setAvailableTime] = useState(0)

    const [currentClientId, setCurrentClientId] = useState();
    const [currentOperatorId, setCurrentOperatorId] = useState();

    const [customBalance, setBalance] = useState(0);
    const [customBonus, setBonus] = useState(0);

    const join = async () => {

        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
        } catch (e) {
            console.log(e);
        }
    };


    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('You left the channel');
        } catch (e) {
            console.log(e);
        }
    };

    //if i'm client, we send our data to operator
    useEffect (() => {
        
        const dataToSendFromClientToOperator = {
            "clientFIO": user.FIO,
            "avatar": user.avatar,
            "clientId": user.id,
            "operatorId": callData.user.id,
            "balance": balance,
            "price": callData.price
        }

        console.log('dataToSendFromClientToOperator', dataToSendFromClientToOperator);
        socket.emit('callRequest', dataToSendFromClientToOperator);
        
        //When opponent leave
        socket.on("leaveChannel", function(data) {
            leave();            
            navigation.goBack();
        });

        socket.on("callConfirmation", function(data) {
            console.log('kvadder', data);
            summer.stop();
            setToken(data.token);
            setChannelName(data.channelName);
        });
    
        socket.on("timerUpdate", function(data) {
            setTimeLeft(data.timer);
            setBalance(data.currentBalance);
            setBonus(data.currentBonus);
            setAvailableTime(data.availableTime);
            if (data.availableTime <= 1) alert.play();
            console.log('POADASD');
            console.log(data.currentBalance);
            console.log(data.currentBonus);
            if (data.currentBalance <= 0 && data.currentBonus <= 0)
            {
                console.log('END CALL');
                _goBack(); 
            }
        });

        socket.on("callEnding", function() {
            console.log('callEnding')
            leave();
            _goToTips();
        });

        setBalance(balance)

        console.log('duration in seconds: ' + summer.getDuration() + 'number of channels: ' + summer.getNumberOfChannels());
        summer.play()
    }, [])


    useEffect( () => {
        join();
    }, [channelName, token])

    
    //custom function
    _goBack = () => {
        summer.stop();
        leave();
        const data = {
            opponentId: opponentId,
            clientId: user.id,
            operatorId: opponentId,
            duration: timeLeft,
            currentBalance: customBalance,
            currentBonus: customBonus,
        }
        if (timeLeft < 5) {
            console.log('DROOOP CALL')
            socket.emit('dropCall', data)
        } 
        else socket.emit('callEnding', data);
        _goToTips();
    }

    _goToTips = () => {

        const data = {
            opponentId: opponentId,
            clientId: user.id,
            operatorId: opponentId,
            duration: timeLeft
        }
        navigation.navigate('Tips', data);
    }

    //Agora Function    
    const getPermission = async () => {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
        }
    };

    useEffect(() => {
        setupVoiceSDKEngine();
    }, []);

    const setupVoiceSDKEngine = async () => {
        try {
            if (Platform.OS === 'android') { await getPermission()};
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    showMessage('CLIENT joined the channel with role ' + user.role);
                    setIsJoined(true);
                },
                onUserJoined: (_connection, Uid) => {
                    //showMessage('Remote user joined with uid ' + Uid);
                    setRemoteUid(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    //showMessage('Remote user left the channel. uid: ' + Uid);
                    setRemoteUid(0);
                },
            });
            agoraEngine.initialize({
                appId: appId,
            });
        } catch (e) {
            console.log(e);
        }
    };

    function showMessage(msg: string) {
        console.log(msg);
    }

    return (
        <View style={styles.container}>
            <View style={styles.available}>
                <Text style={styles.availableText}>Avialable: {availableTime} minutes</Text>
            </View>
            <View style={styles.callDetail}>
                <Image 
                    source={{
                        uri: callData.user.avatar
                    }}
                    style={styles.avatar}
                />
                <Text style={styles.opponentName}>{callData.user.nickname}</Text>
                <Text style={styles.callStatus}>{timeLeft > 0 ? minutes + ':' + seconds : 'Connection...' }</Text>
            </View>
                
            <View style={styles.footer}>
                <DefaultButton text={'Complete'} onPress={_goBack}/>
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        height: '100%',
    },
    avatar: {
        width: 128, 
        height: 128, 
        borderRadius: 400/2,
    },
    callDetail: {
        marginTop: 100,
        justifyContent:'center',
        alignItems:'center',
    },
    available: {
        flexDirection: 'row-reverse'
    },
    footer: {        
        position: 'absolute',
        alignItems:'center',
        bottom: 100,
        left: 0,
        right: 0
    },
    opponentName: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 24,
        marginTop: 10
    },
    callStatus: {
        fontFamily: 'Qanelas-Light',
        fontSize: 18,
        marginTop: 10
    },
    availableText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 14,
    }
})

export default ClientCall;