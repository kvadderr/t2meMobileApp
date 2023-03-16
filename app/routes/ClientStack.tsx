import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import PassCode from '../pages/Passcode';
import Client from '../pages/Client';
import OperatorPage from '../pages/OperatorPage';
import OperatorList from '../pages/OperatorList';
import Call from '../pages/Call';
import ClientCall from '../pages/ClientCall';
import Settings from '../pages/Settings';
import Tips from '../pages/Tips';
import CallHistory from '../pages/CallHistory';
import Notification from '../pages/Notification';

import { useSelector, useDispatch } from 'react-redux';
//import custom service
import { useAuth } from '../context/Auth'
import { socket } from '../services/const'
import { setBalance, setBonus, setOnlineOperatorList } from '../redux/actions'
import { BACKEND_URL } from '../services/const';

const Stack = createSharedElementStackNavigator();

export const ClientStack = () => {

  const dispatch = useDispatch();
  const auth = useAuth();
  const { user } = useSelector(state => state.userReducer);

  useEffect( () => {
    
    socket.on("updateBalance", function (data) {
      console.log('UPDATE BALANCE', data)
      console.log('USER', user)
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

  //Custom function
  

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
      <Stack.Screen name="Notification" component={Notification} />     
    </Stack.Navigator>
  );
};