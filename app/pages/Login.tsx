//import react base 
import { useState, useRef, useCallback } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'

//Import downloaded package
import { useNavigation } from "@react-navigation/native"
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import custom components
import { DefaultInput } from '../components/Input'
import { DefaultButton, SimpleButton } from '../components/Button'
import { Register, ForgotPassword } from '../components/BSComponent'
import BottomSheet from '../components/BottomSheet';
import Alert from '../components/Alert';

//import services
import { BACKEND_URL } from '../services/const'
import { useAuth } from '../context/Auth'


const Login = () => {

    //Custom service
    const navigation = useNavigation();
    const auth = useAuth();
    
    //Custom data
    const [loginData, setLoginData] = useState('');
    const [passwordData, setPasswordData] = useState('');
    const [roleData, setRoleData] = useState('CLIENT');
    const [FIOData, setFIOData] = useState('');
    const [alert, showAlert] = useState(false);
    const [referral, setReferral] = useState('');

    const options = [
        { label: "I'm client", value: "CLIENT" },
        { label: "I'm operator", value: "OPERATOR" },
    ];

    //Bottom sheet's settings
    const ref = useRef<BottomSheetModal>(null);
    const ref2 = useRef<BottomSheetModal>(null);
    
    const RegisterPresentModalPress = useCallback( () => {
        ref.current?.present();
    }, [] );

    const ForgotPasswordPresentModalPress = useCallback( () => {
        ref2.current?.present();
    }, [] );


    //Custom function
    const signIn = async () => {
        console.log('signin');
        await auth.signIn(loginData, passwordData);
    };

    _forgotPassword = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'auth/restorePassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    login: loginData
                }),
            });
            showAlert(true);
        } catch (error) {
            console.log(error)
        }
    };


    _register = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'auth/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: loginData,
                    password: passwordData,
                    nickname: FIOData,
                    role: roleData,
                    referral: referral
                }),
            });
            showAlert(true);
        } catch (error) {
            console.log(error)
        }
    };
   
    return (

        <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.logo}>
                <Lottie source={require('../../assets/animation/welcome.json')} autoPlay loop />
            </View>
            <DefaultInput 
                placeholder='E-mail' 
                text={loginData} 
                setText={setLoginData} />
            <DefaultInput 
                placeholder='Password'
                isPassword={true} 
                text={passwordData} 
                setText={setPasswordData}/>
            <View style={styles.twoColumn}>
                <SimpleButton text={'Forgot password'} onPress={ForgotPasswordPresentModalPress}/>
                <DefaultButton text={'Login'} onPress={signIn}/>
                <SimpleButton text={'Register'} onPress={RegisterPresentModalPress}/>
            </View>
            
            <View style={styles.footer}>
               
            </View>
        </View>
        </ScrollView>
        <BottomSheet ref={ref}>
            <Register 
                setRole={setRoleData}
                options={options}
                loginData={loginData}
                setLoginData={setLoginData}
                password={passwordData}
                setPassword={setPasswordData}
                FIO={FIOData}
                setFIO={setFIOData}
                referral={referral}
                setReferral={setReferral}
                onPress={_register}/>
        </BottomSheet>
        <BottomSheet ref={ref2}>
            <ForgotPassword
                loginData={loginData}
                setLoginData={setLoginData}
                onPress={_forgotPassword}/>
        </BottomSheet> 
        <Alert visible={alert}>
            <Lottie style={{height: 200, marginBottom:40, alignItems:'center',}} source={require('../../assets/animation/success.json')} autoPlay loop />
            <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
                Nice work! 
            </Text>
            <DefaultButton text={'Okay'} onPress={() => showAlert(false)}/>
        </Alert>
        </GestureHandlerRootView>

    )

}

const styles = StyleSheet.create({

    container: {
        padding: 40,
        minHeight: '100%',
        flex: 1
    },

    twoColumn: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    logo: {
        height: 250,
        left: 0,
        right: 0,
    },

    footer: {
        position: 'absolute',
        alignItems:'center',
        bottom: 150,
        left: 0,
        right: 0,
    }

}) 

export default Login;