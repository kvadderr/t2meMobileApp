import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PassCode from '../pages/Passcode';
import Client from '../pages/Client';
import OperatorPage from '../pages/OperatorPage';
import OperatorList from '../pages/OperatorList';
import Call from '../pages/Call';
import ClientCall from '../pages/ClientCall';
import Settings from '../pages/Settings';
import Tips from '../pages/Tips';
import CallHistory from '../pages/CallHistory';

import { useSelector, useDispatch } from 'react-redux';

import { socket } from '../services/const'
import { setUser, setOnlineOperatorList } from '../redux/actions'

const Stack = createNativeStackNavigator();

export const ClientStack = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);

  useEffect( () => {
    socket.on("updateBalance", function (data) {
      user.balance = data;
      dispatch(setUser(user));
    });
    socket.on("listOnlineUser", function (data) {
      dispatch(setOnlineOperatorList(data));
    });
  })

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Passcode" component={PassCode} />
      <Stack.Screen name="Tips" component={Tips} />
      <Stack.Screen name="Client" component={Client} />
      <Stack.Screen name="OperatorPage" component={OperatorPage} />
      <Stack.Screen name="ClientCall" component={ClientCall} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="OperatorList" component={OperatorList} />    
      <Stack.Screen name="CallHistory" component={CallHistory} />      
    </Stack.Navigator>
  );
};