import {
    StyleSheet, 
    Text, 
    View,
    TouchableWithoutFeedback
} from 'react-native';

export const DefaultList = (props) => {
    return (
        <>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.detailText}>{props.detail}</Text>
        </>
    )
}

export const MenuList = (props) => {
    return (
        <>
        <View style={styles.line} />
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.item}>
            <View style={styles.aboutItem}>
                {props.icon}
                <Text style={styles.secondaryText, {marginLeft: 10}}>{props.text}</Text>
            </View>
            {props.secondIcon}
            </View>
        </TouchableWithoutFeedback >
        </>
    )
}

const styles = StyleSheet.create({

    title: {
        marginTop: 20,
        fontFamily: 'Qanelas-Regular',
        fontSize: 16,
    },

    detailText: {
        marginTop: 10,
        fontFamily: 'Qanelas-Light',
        fontSize: 12,
    },

    line: {
        borderWidth: 0.1,
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    item: { 
        paddingTop: 20,
        paddingBottom: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    aboutItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    secondaryText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 16
    },
})