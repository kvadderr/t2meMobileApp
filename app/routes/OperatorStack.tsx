import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PassCode from '../pages/Passcode';
import Operator from '../pages/Operator';
import Call from '../pages/Call';
import Settings from '../pages/Settings';
import OperatorCall from '../pages/OperatorCall';
import CallHistory from '../pages/CallHistory';

import { useSelector, useDispatch } from 'react-redux';

import { socket } from '../services/const'
import { setUser } from '../redux/actions'

const Stack = createNativeStackNavigator();

export const OperatorStack = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);

  useEffect( () => {
    socket.on("updateBalance", function (data) {
      console.log('WINWINWI', data)
      user.balance = data;
      dispatch(setUser(user));
    })

  }, [])

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Passcode" component={PassCode} />
      <Stack.Screen name="Operator" component={Operator} />
      <Stack.Screen name="OperatorCall" component={OperatorCall} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CallHistory" component={CallHistory} />   
    </Stack.Navigator>
  );
};