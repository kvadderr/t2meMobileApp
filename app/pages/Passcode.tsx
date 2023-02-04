//import react base 
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import custom service
import { useAuth } from '../context/Auth'
import { setUser } from '../redux/actions'
import { socket } from '../services/const'
import { BACKEND_URL } from '../services/const';

//import custom components
import { CodeButton, SimpleButton } from '../components/Button'

const PassCode = () => {

    //Custom service
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const auth = useAuth();

    //Custom data    
    const [passCode, setPassCode] = useState();
    const [code, setCode] = useState(['', '', '', '']);
    const [check, setCheck] = useState(false);
    const numbers = [
        { id : 1 },
        { id : 2 },
        { id : 3 },
        { id : 4 },
        { id : 5 },
        { id : 6 },
        { id : 7 },
        { id : 8 },
        { id : 9 },
        { id : 0 } 
    ];

    useEffect (() => {
        const currentCode = code.join('');
        
        console.log('currentCode', currentCode);
        console.log('passCode', passCode);

        if (!passCode && currentCode.length === 4) {
            AsyncStorage.setItem('code', currentCode);
            if (auth.authData.role === 'CLIENT') navigation.navigate('Client');
            if (auth.authData.role === 'OPERATOR') navigation.navigate('Operator');
        }

        if (currentCode === passCode) {
            if (auth.authData.role === 'CLIENT') navigation.navigate('Client');
            if (auth.authData.role === 'OPERATOR') navigation.navigate('Operator');
        }
    }, [check])

    useEffect ( () => {
        socket.emit('join', {"userId": auth.authData.userId});
        _loadUserData();
        _loadPassCode();
    }, [])


    _loadPassCode = async () => {
        const pass = await AsyncStorage.getItem('code');
        setPassCode(pass);
    }

    //Custom function
    _loadUserData = async () => {
        const response = await fetch(BACKEND_URL + 'user/'+auth.authData.userId);
        const json = await response.json();
        dispatch(setUser(json));
    } 

    _onPressNumber = num => {
        let tempCode = code;
        let emptyCode = ['', '', '', ''];

        for (var i = 0; i < tempCode.length; i++) {
            if (tempCode[i] === '') {
                tempCode[i] = num;
                break;
            } else {
                continue;
            }
        }
        
        setCode(tempCode);
        setCheck(!check); 
    }

    _onPressCancel = () => {
        for (var i = code.length - 1; i >=0; i--) {
            if (code[i] !== '') {
                code[i] = '';
                break;
            } else {
                continue;
            }
        }
        setCheck(!check); 
    }

    _onPressExit = async () => {
        await auth.signOut();
    }
  
    
    return (

        <View style={styles.container}>

            <Text style={styles.text}>Enter passcode</Text>
            <View style={styles.codeContainer}>
                {
                    code.map( (c, index) => {
                        let style = c !== '' ? styles.code2 : styles.code1;
                        return <View style={style} key={index}/>
                    })
                }
            </View>
            <View style={styles.numberContainer}>
                {
                    numbers.map( num => {
                        return <CodeButton onPress={() => _onPressNumber(num.id)} key={num.id} text={num.id} />
                    })
                }
            </View>
            <View style={styles.footer}>
                <SimpleButton text={'Exit'} onPress={_onPressExit}/>
                <SimpleButton text={'Cancel'} onPress={_onPressCancel} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        padding: 40,
        minHeight: '100%',
        flex: 1,
        alignItems: 'center',
    },

    codeContainer: {
        marginTop:40,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    text: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 15,
        marginTop: 40
    },

    code1: {
        width: 13,
        height: 13, 
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#000'
    },

    code2: {
        width: 13,
        height: 13, 
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: '#000'
    },

    numberContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 40,
        width: 282,
        height: 342,
        alignItems: 'center',
        justifyContent: 'center'
    },

    footer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 50,
        left: 0,
        right: 0,
    }

})

export default PassCode;