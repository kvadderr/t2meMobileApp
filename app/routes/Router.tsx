import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from '../redux/store';

import {OperatorStack} from './OperatorStack';
import {AuthStack} from './AuthStack';
import {ClientStack} from './ClientStack';
import {useAuth} from '../context/Auth';
import Loading from '../pages/Loading';

export const Router = () => {
  const {authData, loading} = useAuth();

  console.log('authData', authData)
  if (loading) {
    return 
    <Provider store={Store}>
      <Loading />
    </Provider>
  }
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <StatusBar hidden />
      {
        authData ?
          authData.role === 'CLIENT' ? 
            <ClientStack />
            :
            <OperatorStack/> 
        : 
          <AuthStack />}
    </NavigationContainer>
    </Provider>
  );
};