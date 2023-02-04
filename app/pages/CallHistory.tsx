import { useState, useEffect, useRef, useCallback } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native';

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

//import custom components
import BottomSheet from '../components/BottomSheet';
import { HistoryCallByClient, HistoryCallByOperator } from '../components/Card'
import { Filter } from '../components/BSComponent'


//import icons
import { LeftArrowSVG } from '../icons/leftArrow';
import { FilterSVG } from '../icons/filter';

import { BACKEND_URL } from "../services/const";

const CallHistory = () => {

    const navigation = useNavigation();
    const [callH, setCallH] = useState([]);
    const { user } = useSelector(state => state.userReducer);

    useEffect( () => {
        getCallHistory()
    }, []);

    if (user.role === 'CLIENT') {
        BACK_URL = BACKEND_URL + 'call/client/' + user.id;
    } else {
        BACK_URL = BACKEND_URL + 'call/operator/' + user.id;
    }


    const getCallHistory = async () => {
        try {
            const response = await fetch(BACK_URL);
            const json = await response.json();
            console.log(json);
            setCallH(json);
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
                callH.map( item => {
                    return user.role === 'CLIENT' ? 
                        <HistoryCallByClient props={item}/>
                        :
                        <HistoryCallByOperator props={item}/>
                })
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

export default CallHistory;