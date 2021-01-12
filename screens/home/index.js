import React, { useContext } from 'react';
import { StatusBar, Text, View, TouchableHighlight } from 'react-native';
import { AuthContext } from '../../services/context';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import { styles } from './style';

function Home({ navigation }) {
   const { auth } = useContext(AuthContext);

   return(
      <>{ auth && <>
         <StatusBar backgroundColor="#D7495A" />
         <View emulateUnlessSupported={ false } style={ styles.container }>
            <View style={ styles.title }>
               <Feather 
                  style={{ padding: 10, paddingLeft: 15, paddingRight: 15 }}
                  name="phone-call"
                  size={19}
                  color="#fff"
                  onPress={ _=> navigation.navigate('List') }
               />
               <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20.5 }}>الطوارئ</Text>
               <SimpleLineIcons
                  style={{ padding: 10, paddingLeft: 15, paddingRight: 15 }}
                  name="settings" 
                  size={ 20 }
                  color="#fff"
                  onPress={ _=> navigation.navigate('Update') }
               />
            </View>
            <TouchableHighlight 
               activeOpacity={ 1 }
               underlayColor="#f2c0c6" 
               style={ styles.sos } 
               onPress={ _=> navigation.navigate('Sos') }
            >
               <View style={ styles.sos_2 }><Text style={ styles.sos_3 }>استغاثة</Text></View>
            </TouchableHighlight>
            <Text style={ styles.note }>
               بعد الضغط علي زر "استغاثة" سوف يتم نقلك الي صفحة اختيار نوع الاستغاثة والخريطة مباشرة.
            </Text>
         </View>
      </>}</>
   );
}

export default Home;