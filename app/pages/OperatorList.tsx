import { useState, useEffect, useRef, useCallback } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native';

//Import downloaded package
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import custom components
import BottomSheet from '../components/BottomSheet';
import { OperatorCard } from '../components/Card'
import { Filter } from '../components/BSComponent'
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../services/const'
//import icons
import { LeftArrowSVG } from '../icons/leftArrow';
import { FilterSVG } from '../icons/filter';
import { BACKEND_URL } from '../services/const'

const OperatorList = () => {

    const navigation = useNavigation();
    const { onlineOperatorList } = useSelector(state => state.userReducer);
    const { user } = useSelector(state => state.userReducer);
    //bottom sheet data
    const ref = useRef<BottomSheetModal>(null);

    const refPresentModalPress = useCallback( () => {
        ref.current?.present();
    }, [] );

    const [operator, setOperator] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        operator.map( item => {
            if (onlineOperatorList.includes(item.userId)) {
                item.status = 'Online';
            }
        })
    }, [onlineOperatorList])

    const [FIO, setFIO] = useState();

    _clearFilter = () => {

    }

    useEffect( () => {

        if(FIO) {
            const newData = operator.filter((item) => {
                const itemData = item.user.FIO ? item.user.FIO.toUpperCase() : ''.toUpperCase();
                const textData = FIO.toUpperCase();
                return itemData.indexOf(textData) > -1; 
            });
            setFilteredData(newData);
        } else {
            setFilteredData(operator)
        }

    }, [FIO]);

    useEffect(() => {
        getOperators();
        socket.emit('sendMeList', {"userId": user.id});
    }, [])

    const getOperators = async () => {
        try {
            const response = await fetch(BACKEND_URL + 'operator/');
            const json = await response.json();
            setOperator(json);
            setFilteredData(json);
        } catch (error) {
          console.error(error);
        }
    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
            <LeftArrowSVG onPress={ () => navigation.goBack()}/>
            <FilterSVG onPress={refPresentModalPress}/>
        </View>
        <View style={styles.container}>
            {
                filteredData.map( item => {
                    return <OperatorCard props={item}/>
                })
            }
        </View>
        </ScrollView>
        <BottomSheet ref={ref}>
            <Filter
                FIO = {FIO} setFIO={setFIO}
                onPress = {_clearFilter}
            />
        </BottomSheet> 
        </GestureHandlerRootView>
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

export default OperatorList;