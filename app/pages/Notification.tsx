import { useState, useEffect, useRef, useCallback } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native';

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

//import custom components
import BottomSheet from '../components/BottomSheet';
import { NotificationCard } from '../components/Card'
import { Filter } from '../components/BSComponent'


//import icons
import { LeftArrowSVG } from '../icons/leftArrow';
import { FilterSVG } from '../icons/filter';

import { BACKEND_URL } from "../services/const";

const Notification = () => {

    const navigation = useNavigation();
    const [notificationList, setNotificationList] = useState([]);
    const { user } = useSelector(state => state.userReducer);

    useEffect( () => {
        getCallHistory()
    }, []);

    const getCallHistory = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'notification/' + user.id);
            const json = await response.json();
            console.log('jOLOLOLOson', json);
            setNotificationList(json);
            
            console.log('jOLOLOLOson', notificationList);
        } catch (error) {
          console.error(error);
        }
    }


    return (

        <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
            <LeftArrowSVG onPress={ () => navigation.goBack()}/>
        </View>
        <View style={styles.container}>
            {
                notificationList.map( item => 
                    <NotificationCard props={item}/>
                )
            }
        </View>
        </ScrollView>


    )
}


const styles = StyleSheet.create({
    container: {
        padding: 40,
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 40,
        paddingTop: 40
    },
})

export default Notification;