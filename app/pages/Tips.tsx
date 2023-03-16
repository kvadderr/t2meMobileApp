//import react base 
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { DefaultButton, SimpleButton } from '../components/Button'

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';

//import custom services
import { socket } from '../services/const'
import { setUser } from '../redux/actions'

const Tips = ({route}) => {

    const callData = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.userReducer);
    
    console.log('adadad', user);


    _sendTips = (balance) => {
        const data = {
            clientId: user.id,
            operatorId: callData.operatorId,
            balance: balance
        };
        socket.emit('tips', data);
        navigation.navigate('Client')
        
    }

    return (
        
        <View style={styles.container}>
            <Text style={styles.text}>Perfect!</Text>
            <Text style={styles.secondaryText}>And now, if you wish, you can leave a tip. Also, do not forget to leave your feedback on the personal page. Thank you!</Text>

            <View style={styles.column}>
                <DefaultButton onPress={() => _sendTips(5)} text={'5$'} />
                <DefaultButton onPress={() => _sendTips(10)} text={'10$'} />
                <DefaultButton onPress={() => _sendTips(20)} text={'20$'} />
            </View>

            <View style={styles.column}>
                <DefaultButton onPress={()=>navigation.navigate('Client')} text={'Skip'} />
            </View>
            
        </View>
    
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 40
    },

    text: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 30,
        marginTop: 40
    },

    secondaryText: {
        fontFamily: 'Qanelas-Light',
        fontSize: 15,
        marginTop: 20
    },

    column: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text2: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 20,
        marginTop: 40
    }


})

export default Tips;