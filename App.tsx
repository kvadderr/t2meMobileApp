import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import {Router} from './app/routes/Router';
import {AuthProvider} from './app/context/Auth';


const App = () => {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
