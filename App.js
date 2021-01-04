import React, { useState } from 'react';
import Welcome from './screens/welcome';
import Register from './screens/register';
import Home from './screens/home';
import List from './screens/list';
import Sos from './screens/sos';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './services/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App() {
   const [auth, setAuth] = useState(undefined);

   React.useEffect(_=> {
      AsyncStorage.getItem('data').then(res => setAuth(JSON.parse(res)));
   }, []);

   return (
      <NavigationContainer>
         <AuthContext.Provider value={{ auth, setAuth }}>
            <Stack.Navigator>
               { auth === null ?
                  <>
                     <Stack.Screen name="Welcome" component={ Welcome } options={{ headerShown: false }} />
                     <Stack.Screen 
                        name="Register" 
                        component={ Register }
                        options={{ 
                           title: 'تسجيل البيانات',
                           headerLeft: null,
                           headerStyle: {backgroundColor: '#D7495A'}, headerTintColor: '#fff', headerTitleAlign: 'center' 
                        }} 
                     />
                  </> : <>
                     <Stack.Screen name="Home" component={ Home } options={{ headerShown: false }} />
                     <Stack.Screen 
                        name="Update" 
                        component={ Register }
                        options={{ 
                           title: 'تحديث البيانات',
                           headerStyle: {backgroundColor: '#D7495A'}, headerTintColor: '#fff', headerTitleAlign: 'center' 
                        }} 
                     />
                     <Stack.Screen 
                        name="List"
                        component={ List }
                        options={{ 
                           title: 'ارقام الطوارئ',
                           headerStyle: {backgroundColor: '#D7495A'}, headerTintColor: '#fff', headerTitleAlign: 'center' 
                        }}
                     />
                     <Stack.Screen 
                        name="Sos"
                        component={ Sos }
                        options={{ 
                           title: 'إرسال استغاثة',
                           headerStyle: {backgroundColor: '#D7495A'}, headerTintColor: '#fff', headerTitleAlign: 'center' 
                        }}
                     />
                  </>
               }
            </Stack.Navigator>
         </AuthContext.Provider>
      </NavigationContainer>
   );
}

export default App;