import { Image, StyleSheet, Text, View, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Images } from '../services/const'
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from 'react-navigation-shared-element';

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
    let st = styles.operatorAvatar;
    if (props?.status === 'Online') st = styles.onlineOperatorAvatar;
    if (props?.status === 'Busy') st = styles.busyOperatorAvatar;
    let specializationArray = []
    props.specializations.map( item => {
        specializationArray.push(item.name);
    })
    let specialization = specializationArray.join(' / ')
    console.log('specialization', specialization)
    return (
        <TouchableWithoutFeedback onPress={ () => navigation.navigate('OperatorPage', props)}>
            <View style={styles.operatorCard}>
                <SharedElement id={`trip.${props.user.avatar}.image`} style={{flex: 1}}>
                    <Image 
                        source={{
                            uri: props.user.avatar
                        }}
                        style={ st }
                    />
                </SharedElement>
                
                <View style={{flex: 2}}>
                    <Text style={styles.textFIO}>{props.user.nickname}</Text>
                    <Text style={styles.secondaryText}>{specialization}</Text>
                </View>
                <View>
                    <Text style={styles.textFIO}>{props.price}$</Text>
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    )
}


export const StatisticCard = (props) => {
    return (
        <View style={styles.containerStatistic}>
            <Text style={styles.title}>{props.value}</Text>
            <Text style={styles.desk}>{props.title}</Text>
        </View>
    );
}

export const NotificationCard = ({props}) => {

    const createdDate =(new Date(props.createdAt) + 'Z').toString().slice(0, 24);

    return (
        <TouchableWithoutFeedback>
            <View style={styles.operatorCard}>
                <View style={{flex: 2}}>
                    <Text style={styles.secondaryText}>{createdDate}</Text>
                    <Text style={styles.textFIO}>{props.detail}</Text>
                    <Text style={styles.secondaryText}>{props.amount}</Text>
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
                    <Text style={styles.textFIO}>{props.operator.nickname}</Text>
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
                    <Text style={styles.textFIO}>{props.client.nickname}</Text>
                    <Text style={styles.secondaryText}>{props.duration} s.</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const FavoriteCard = ({item}) => {
    
    const navigation = useNavigation();
    let sty = styles.operatorAvatar;
    if (item?.status === 'Online') sty = styles.onlineOperatorAvatar;
    if (item?.status === 'Busy') sty = styles.busyOperatorAvatar;

    return (
        <TouchableOpacity style={{paddingRight:20, paddingVertical: 10}} onPress={ () => navigation.navigate('OperatorPage', item)}>
            <Image 
                source={{
                    uri: item.user?.avatar
                }}
                style={ sty }
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

    containerStatistic: {
        paddingTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent:'space-around',
        alignItems:'center',
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
        borderRadius: 60/2,
    },

    onlineOperatorAvatar: {
        width: 60, 
        height: 60, 
        borderRadius: 400/2,
        borderColor: 'green', 
        borderWidth: 2, 
        overflow: "hidden"
    },

    busyOperatorAvatar: {
        width: 60, 
        height: 60, 
        borderRadius: 400/2,
        borderColor: 'orange', 
        borderWidth: 2, 
        overflow: "hidden"
    },

    title: {
        marginTop: 20,
        fontFamily: 'Qanelas-Regular',
        fontSize: 16,
    },
    desk: {
        marginTop: 10,
        fontFamily: 'Qanelas-Light',
        fontSize: 12,
    },

    line: {
        height: 30,
        width: 5,
        backgroundColor: 'orange',
        marginRight: 10
    },
})