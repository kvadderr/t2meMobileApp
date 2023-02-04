import { TextInput, StyleSheet, Text } from "react-native";

export const DefaultInput = ({placeholder, isPassword, text, setText}) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isPassword}
            onChangeText={(text) => setText(text)}
            value={text}
        />
    )
}

export const NumericInput = ({placeholder, text, setText}) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType="numeric"
            onChangeText={(text) => setText(text)}
            value={text}
        />
    )
}

export const MultiInput = ({placeholder, text, setText}) => {
    return (
        <TextInput
            style={styles.multiInput}
            placeholder={placeholder}
            multiline={true}
            onChangeText={(text) => setText(text)}
            value={text}
        />
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#909090', 
      padding: 5,
      fontFamily: 'Qanelas-Light',
      fontSize: 15
    },

    multiInput: {
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#909090', 
        padding: 5,
        fontFamily: 'Qanelas-Light',
        fontSize: 15
      },
});

