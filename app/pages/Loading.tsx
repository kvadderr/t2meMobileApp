//import react base 
import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

//import custom service
import { useAuth } from '../context/Auth'
import { setUser } from '../redux/actions'


const Loading = () => {

    const auth = useAuth();
    const dispatch = useDispatch();

    return (

        <Text>
            Loading logo
        </Text>

    )

}

const styles = StyleSheet.create({


}) 

export default Loading;