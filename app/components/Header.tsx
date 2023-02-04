import { useSelector, useDispatch } from 'react-redux';
import { Image, StyleSheet, Text, View, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { SettingsSVG } from '../icons/settings'
import { HistorySVG } from '../icons/history'
import { CardSVG } from '../icons/card'


const Header = (props) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer);
    const navigation = useNavigation();

    return(
        <View style={styles.header}>
            <Text style={styles.text}>Welcome, {user.FIO}, your balance</Text>
            <Text style={styles.balance}>{user.balance}$</Text>
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
                <TouchableWithoutFeedback onPress={props.onPress}>
                <View style={styles.headerMenuItem}>
                    <CardSVG/>
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
    balance: {
        fontFamily: 'Qanelas-Light',
        fontSize: 36,
        marginLeft: 'auto',
        marginRight: 'auto', 
        marginTop: 15,
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