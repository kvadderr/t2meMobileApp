import { Image, StyleSheet, Text, View, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Images } from '../services/const'
import { useNavigation } from "@react-navigation/native";

export const MenuCard = (props) => {
    const img = props.image;
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.container}>
            <ImageBackground source={Images.menus[img]} resizeMode="cover" style={styles.image} imageStyle={{borderRadius:25}}>
                <Text style={styles.text}>{props.title}</Text>
                <Text style={styles.secondaryTextCard}>{props.desk}</Text>
            </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
    )
}

export const OperatorCard = ({props}) => {

    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={ () => navigation.navigate('OperatorPage', props)}>
            <View style={styles.operatorCard}>
                <View style={{flex: 1}}>
                <Image 
                    source={{
                        uri: props.user.avatar
                    }}
                    style={ props.status? styles.onlineOperatorAvatar: styles.operatorAvatar}
                />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.textFIO}>{props.user.FIO}</Text>
                    <Text style={styles.secondaryText}>Release of emotion</Text>
                </View>
                <View>
                    <Text style={styles.textFIO}>{props.price}$</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const HistoryCallByClient = ({props}) => {

    return (
        <TouchableWithoutFeedback>
            <View style={styles.operatorCard}>
                <View style={{flex: 1}}>
                <Image 
                    source={{
                        uri: props.operator.avatar
                    }}
                    style={styles.operatorAvatar}
                />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.textFIO}>{props.operator.FIO}</Text>
                    <Text style={styles.secondaryText}>{props.duration} s.</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export const HistoryCallByOperator = ({props}) => {

    return (
        <TouchableWithoutFeedback>
            <View style={styles.operatorCard}>
                <View style={{flex: 1}}>
                <Image 
                    source={{
                        uri: props.client.avatar
                    }}
                    style={styles.operatorAvatar}
                />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.textFIO}>{props.client.FIO}</Text>
                    <Text style={styles.secondaryText}>{props.duration} s.</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const FavoriteCard = ({item}) => {
    
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{paddingRight:20, paddingVertical: 10}} onPress={ () => navigation.navigate('OperatorPage', item)}>
            <Image 
                source={{
                    uri: item.user.avatar
                }}
                style={item.status? styles.onlineOperatorAvatar: styles.operatorAvatar}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        width: 260,
        height: 140,
    },

    operatorCard: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    image: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 25,
        padding: 30
    },

    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },

    textFIO: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 16,
    },
    
    secondaryTextCard: {
        width: '70%',
        color: "white",
        fontSize: 14,
        fontFamily: 'Qanelas-Light',
    },

    secondaryText: {
        width: '70%',
        fontSize: 12,
        fontFamily: 'Qanelas-Light',
    },

    operatorAvatar: {
        width: 60, 
        height: 60, 
        borderRadius: 400/2,
    },

    onlineOperatorAvatar: {
        width: 60, 
        height: 60, 
        borderRadius: 400/2,
        borderColor: 'green', 
        borderWidth: 2, 
        overflow: "hidden"
    },
})