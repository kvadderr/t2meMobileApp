import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Login from '../pages/Login';

const Stack = createSharedElementStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};