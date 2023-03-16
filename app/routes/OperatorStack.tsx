import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import PassCode from '../pages/Passcode';
import Operator from '../pages/Operator';
import Call from '../pages/Call';
import Settings from '../pages/Settings';
import OperatorCall from '../pages/OperatorCall';
import CallHistory from '../pages/CallHistory';
import Notification from '../pages/Notification';

import { useSelector, useDispatch } from 'react-redux';

import { socket } from '../services/const'
import { setBalance, setBonus } from '../redux/actions'

const Stack = createSharedElementStackNavigator();

export const OperatorStack = () => {

  const dispatch = useDispatch();

  useEffect( () => {

    socket.on("updateBalance", function (data) {
      dispatch(setBalance(data));
    })

    socket.on("updateBonus", function (data) {
      console.log('UPDATE BONUS', data)
      dispatch(setBonus(data));
    })

    socket.on("listOnlineUser", function (data) {
      console.log('listOnlineUser getting')
      dispatch(setOnlineOperatorList(data));
    });

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
      <Stack.Screen name="Notification" component={Notification} />  
    </Stack.Navigator>
  );
};