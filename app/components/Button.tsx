import { TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Text } from "react-native";

export const DefaultButton = (props) => {

    return (

        <TouchableOpacity onPress={ props.onPress }>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ props.text }</Text>
            </View>
        </TouchableOpacity>
    
    )

}

export const CodeButton = (props) => {

    return (

        <TouchableOpacity onPress={ props.onPress }>
            <View style={styles.codeButton}>
                <Text style={styles.buttonText}>{ props.text }</Text>
            </View>
        </TouchableOpacity>
    
    )

}

export const SimpleButton = (props) => {
    
    return (

        <TouchableWithoutFeedback onPress={ props.onPress } key={props.key}>
            <View style={styles.simpleButton}>
                <Text style={styles.buttonText}>{ props.text }</Text>
            </View>
        </TouchableWithoutFeedback>

    )

}

const styles = StyleSheet.create({
    button: {
        borderColor: '#909090',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 30, 
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'flex-start'
    },
    codeButton: {
        borderColor: '#909090',
        borderWidth: 1,
        width: 75,
        height: 75, 
        borderRadius: 75,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    simpleButton: {
        padding: 15
    },
    buttonText: {
        fontFamily: 'Qanelas-Regular',
        fontSize: 15
    }
})