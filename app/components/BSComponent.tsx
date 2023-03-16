import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { DefaultInput, MultiInput, NumericInput } from './Input'
import { DefaultButton, SimpleButton } from './Button'
import SwitchSelector from "react-native-switch-selector";
import { DefaultList } from './List';
import { BACKEND_URL } from "../services/const";


export const ForgotPassword = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Forgot password</Text>
          
            <View style={styles.inputGroup}>
                <DefaultInput placeholder='E-mail' text={props.loginData} setText={props.setLoginData}/>
            </View>
            <DefaultButton text={'Restore password'} onPress={props.onPress} />
        </View>
    );
}

export const ConfirmMail = (props) => {
    
    useEffect(() => {
        sendForgotPass()
    }, []);

    const sendForgotPass = async () => {
    try {
        const response = await fetch(BACKEND_URL + 'auth/sendCode', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    userId: props.userId
                }),
        });

        const json = await response.json();
        props.setConfirmCode(json);
    } catch (error) {
        console.log(error)
    }};


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Put the code from mail</Text>
          
            <View style={styles.inputGroup}>
                <DefaultInput placeholder='Код' text={props.code} setText={props.setCode}/>
            </View>
            <DefaultButton text={'Send code'} onPress={props.onPress}/>
        </View>
    );
}

export const ChangeProfileData = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile data edit</Text>
          
            <View style={styles.inputGroup}>
                <DefaultInput placeholder='Your name' text={props.name} setText={props.setName}/>
                <DefaultInput placeholder='New password' text={props.password} setText={props.setPassword}/>
                <NumericInput placeholder='Full years' text={props.years} setText={props.setYears}/>
            </View>
            <DefaultButton text={'Save data'} onPress={props.onPress}/>
        </View>
    );
}

export const DeleteProfile = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Are you sure you want to delete your profile?</Text>
            <DefaultList title="Profile recovery" detail="Profile recovery is available only when contacting the service support service. We do not store your sensitive data" />
            <View style={{paddingTop: 40}}>
            <DefaultButton text={'DELETE MY PROFILE'} onPress={props.onPress} />
            </View>
        </View>
    );
}

export const Payment = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Payment</Text>
            <DefaultList title="About process" detail="Enter the desired value and follow the link to make a payment" />
            <View style={{paddingTop: 40}}>
            <SimpleButton text={'Go to payment system'} onPress={props.linkPress} /> 
            </View>
        </View>
    );
}

export const OperatorProfileData = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Operator profile data edit</Text>
          
            <View style={styles.inputGroup}>
                <DefaultInput placeholder='Brief information' text={props.brief} setText={props.setBrief}/>
                <DefaultInput placeholder='About me' text={props.about} setText={props.setAbout}/>
                <DefaultInput placeholder='My goals' text={props.goals} setText={props.setGoals}/>
            </View>
            <DefaultButton text={'Save data'} onPress={props.onPress}/>
        </View>
    );
}

export const Register = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Register</Text>
            <SwitchSelector
                style={styles.switch}
                options={props.options}
                initial={0}
                buttonColor={'#038E11'}
                animationDuration={200}
                onPress={value => props.setRole(value)}
            />
            <View style={styles.inputGroup}>
                <DefaultInput placeholder='Full name' text={props.FIO} setText={props.setFIO}/>
                <DefaultInput placeholder='E-mail' text={props.loginData} setText={props.setLoginData}/>
                <DefaultInput placeholder='Password' text={props.password} setText={props.setPassword}/>
                <DefaultInput placeholder='Referral code' text={props.referral} setText={props.setReferral}/>
            </View>
            <DefaultButton text={'Confirm data'} onPress={props.onPress}/>
        </View>
    )

}

export const FAQ = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>FAQ</Text>
            {
                props.faq.map( item => {
                    return <DefaultList title={item.title} detail={item.detail} key={item.id}/>
                })
            }
            <TouchableWithoutFeedback onPress={props.link}>
            <View style={styles.created}>
                <Text style={styles.createdHeaderText}>Created by</Text>
                <Text style={styles.createdMainText}>SUMBEMBAYEV BAKYTBEK</Text>
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
};

export const Reviews = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Reviews</Text>

            {
                props.reviews.map( item => {
                    return <DefaultList title={item.client.nickname} detail={item.review} key={item.id}/>
                })
            }

        </View>
    )
}

export const OperatorDetails = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>About me</Text>
            <DefaultList title="BIO" detail={props.aboutMe} />
            <DefaultList title="Goals" detail={props.goals} />
        </View>
    )
}

export const Filter = (props) => {

    const options = [
        { label: "Online", value: "1" },
        { label: "Offline", value: "2" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Use filter</Text>
            <DefaultInput placeholder='Full name' text={props.FIO} setText={props.setFIO}/>
            
        </View>
    )
}


export const GiveFeedback = (props) => {

    const options = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Feedback</Text>
            <SwitchSelector
                style={styles.switch}
                options={options}
                initial={0}
                buttonColor={'#038E11'}
                animationDuration={200}
                onPress={value => props.setGrade(value)}
            />
            <View style={styles.inputGroup}>
                <MultiInput placeholder='Comment' text={props.comment} setText={props.setComment}/>
            </View>
            <DefaultButton text={'Send feedback'} onPress={props.onPress}/>
        </View>
    )
}


export const Support = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>SUPPORT</Text>
            <View style={styles.inputGroup}>
                <MultiInput placeholder='Your message' text={props.message} setText={props.setMessage}/>
            </View>
            <DefaultButton text={'Send message'} onPress={props.onPress}/>
        </View>
    )
}

export const Withdrawal = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Withdrawal</Text>
            <DefaultList title="" detail="Some detail data about withdrawal" />
            <DefaultButton text={'Submit a withdrawal request'} onPress={props.onPress}/>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 40
    },

    headerText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 18,
    },

    switch: {
        paddingTop: 40
    },

    inputGroup: {
        paddingTop:20,
        paddingBottom: 40,
        flex: 1,
    },

    created: {
        paddingTop: 40,
        paddingBottom: 80,
    },

    createdMainText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 14,
        color: 'gray',
        textDecorationLine: 'underline'
    },

    createdHeaderText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 12,
        color: 'gray',
    },
})

