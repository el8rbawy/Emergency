import React from 'react';
import { StatusBar, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './style';

function Welcome({ navigation }) {
   return (
      <View style={ styles.container }>
         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
         <Image source={ require('../../assets/flasher.png') } />
         <Text style={ styles.text }>
            تطبيق الطوارئ يساعدك بالتواصل مع الطوارئ والجهات المختصة
            بشكل اسرع مما مضي.
         </Text>
         <TouchableOpacity 
            style={ styles.button }
            onPress={ _=> navigation.replace('Register') }
         >
            <View>
               <FontAwesome
                  name="long-arrow-left"
                  size={ 15 } 
                  color="#fff"
               />
            </View>
            <Text style={{ color: '#fff', marginLeft: 7 }}>
               التسجيل الآن!
            </Text>
         </TouchableOpacity>
         <Text style={ styles.version }>0.2v Beta (Graduation Project)</Text>
      </View>
   );
}

export default Welcome;