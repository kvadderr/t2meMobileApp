import { useSelector, useDispatch } from 'react-redux';
import { Image, StyleSheet, Text, View, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { SettingsSVG } from '../icons/settings'
import { HistorySVG } from '../icons/history'
import { CardSVG } from '../icons/card'
import { NotificationSVG } from '../icons/notification'
import { DollarSVG } from '../icons/dollar'


const Header = (props) => {

    const dispatch = useDispatch();
    const { user, balance, bonus } = useSelector(state => state.userReducer);
    const navigation = useNavigation();

    return(
        <View style={styles.header}>
            <Text style={styles.text}>Welcome, {user.nickname}, your balance</Text>
            <View style={styles.balanceLine}>
            <Text style={styles.balance}>{balance}$</Text>
            {
                user.role === 'CLIENT' ? <Text style={styles.bonus}>  | {bonus}B</Text> : null
            }
            
            </View>
            <View style={styles.headerMenu}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
                <View style={styles.headerMenuItem}>
                    <SettingsSVG/>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={() => navigation.navigate('CallHistory')}>
                <View style={styles.headerMenuItem}>
                    <HistorySVG/>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Notification')}>
                <View style={styles.headerMenuItem}>
                    <NotificationSVG/>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={props.onPress}>
                <View style={styles.headerMenuItem}>
                    <DollarSVG/>
                </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop:80,
        height: 300,
    },
    text: {
        fontFamily: 'Qanelas-Light',
        fontSize: 14,
        marginLeft: 'auto',
        marginRight: 'auto', 
        marginTop: 10,
        textAlign: 'center'
    },
    balanceLine: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto', 
        marginTop: 15,
    },
    balance: {
        fontFamily: 'Qanelas-Light',
        fontSize: 36,
    },
    bonus: {
        fontFamily: 'Qanelas-Light',
        fontSize: 16,
    },
    headerMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop:40,
        paddingBottom:25,
    },
    headerMenuItem: {
        padding: 15,
    },

})
export default Header;