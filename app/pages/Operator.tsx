//import react base 
import { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native'

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwitchSelector from "react-native-switch-selector";

//import custom components
import Header from '../components/Header'
import { DefaultButton, SimpleButton } from '../components/Button';
import Alert from '../components/Alert';

//import custom services
import { socket } from '../services/const'

const Operator = () => {

    //Custom service
    const navigation = useNavigation();

    //Custom data
    const options = [
        { label: "I'm offline", value: "OFFLINE" },
        { label: "I'm online", value: "ONLINE" },
    ];
    const [calling, setCalling] = useState(false);
    const [callData, setCallData] = useState({});

    _goToCall = () => {
        setCalling(false);
        socket.emit('connectionConfirmation', callData);
        navigation.navigate('OperatorCall', callData);
    }

    //lock go to back
    useEffect (() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });

        socket.on("connectionRequest", function(data) {

            const someData = {
                FIO: data.clientFIO,
                channelName: data.channelName,
                token: data.token,
                user: {
                    avatar: data.clientAvatar,
                    id: data.clientId,
                },
                operatorId: data.operatorId,
                clientId: data.clientId
            }
            
            setCallData(someData);
            setCalling(true);
        });

    }, [])


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>

            <Header/>
            
            <SwitchSelector
                style={styles.switch}
                options={options}
                initial={0}
                buttonColor={'#038E11'}
                animationDuration={200}
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
                    <SimpleButton text={'Reject'} onPress={() => setCalling(false)}/>
                    <DefaultButton text={'Accept'} onPress={_goToCall}/>
                </View>
            </Alert>

        </View>
        </GestureHandlerRootView>
    
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