import React, { useEffect, useState, useContext } from 'react';
import { StatusBar, ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from '../../services/context';
import { styles } from './style';

function Register() {
   const { auth, setAuth } = useContext(AuthContext);

   const [isLoad, setIsLoad] = useState(false);
   const [api_ID, setApi_ID] = useState('');
   const [values, setValues] = useState({
      id: auth?.id || '',
      name: auth?.name || '',
      gender: auth?.gender || 'ذكر',
      phone: auth?.phone || '01',
      address: auth?.address || '',
      email: auth?.email || ''
   });

   useEffect(_=> {
      if (auth)
         AsyncStorage.getItem('id').then(res => setApi_ID(res));
   }, []);

   // -- Send data
   function handleSubmit() {
      if (!Object.values(values).every(v => v !== '')) {
         alert('لا يمكنك ترك أي حقل فارغاً.');
         return;
      }

      const data = JSON.stringify(values);
      const url  = 'https://graduation-p-default-rtdb.europe-west1.firebasedatabase.app/users';

      if (auth) {
         function yesDifferent() { // Comparison Are there differences?
            for(var key in auth)
               if(auth[key] !== values[key]) 
                  return true;
      
            return false;
         }

         if (yesDifferent()) {
            setIsLoad(true);

            fetch(`${ url }/${ api_ID }.json`, {
               method: 'PUT',
               body: data
            })
               .then(_=> {
                  AsyncStorage.setItem('data', data);               
                  setAuth(JSON.parse(data));
                  setIsLoad(false);
                  Alert.alert('تنبيه', 'تم التحديث بنجاح.');
               })
               .catch(_=> {
                  setIsLoad(false);
                  Alert.alert('تنبيه', 'تأكد من اتصالك بالانترنت');
               });
         }
      }
      else {
         setIsLoad(true);

         fetch(`${ url }.json`, {
            method: 'POST',
            body: data
         })
            .then(res => {
               AsyncStorage.setItem('data', data);
               res.json().then(res => AsyncStorage.setItem('id', res.name));
               
               setAuth(JSON.parse(data));
            })
            .catch(_=> {
               setIsLoad(false);
               Alert.alert('تنبيه', 'تأكد من اتصالك بالانترنت');
            });
      }
   }

   return (
      <>
      <StatusBar backgroundColor="#D7495A" />
      { !isLoad ? 
         <ScrollView style={ styles.container }>
            <View style={ styles.photo }>
               <AntDesign name="user" size={ 70 } color="#D7495A" />
            </View>
            <View>
               <Text style={{ color: '#444' }}>الاسم بالكامل:</Text>
               <TextInput value={ values.name } onChangeText={ v => setValues({ ...values, name: v }) } style={ styles.input } />
            </View>
            <View>
               <Text style={{ color: '#444' }}>الرقم القومي:</Text>
               <TextInput value={ values.id } onChangeText={ v => setValues({ ...values, id: v }) } maxLength={ 14 } keyboardType="numeric" style={ styles.input } />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
               <View style={{ width: '48%' }}>
                  <Text style={{ color: '#444' }}>رقم الهاتف:</Text>
                  <TextInput onChangeText={ v => setValues({ ...values, phone: v }) } value={ values.phone } keyboardType="numeric" style={ styles.input } />
               </View>
               <View style={{ width: '48%' }}>
                  <Text style={{ marginBottom: 5, color: '#444' }}>النوع:</Text>
                  <DropDownPicker
                     items={[
                        { label: 'ذكر', value: 'ذكر' },
                        { label: 'انثي', value: 'انثي' }
                     ]}
                     defaultValue={ values.gender }
                     containerStyle={{height: 40}}
                     style={{ flexDirection: 'row-reverse', borderColor: '#D7495A', borderWidth: 1.5 }}
                     labelStyle={{ textAlign: 'right', color: '#D7495A' }}
                     dropDownStyle={{
                        backgroundColor: '#eee',
                        marginTop: 2,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 2
                     }}
                     itemStyle={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}
                     arrowColor="#D7495A"
                     onChangeItem={ v => setValues({ ...values, gender: v.value }) }
                  />
               </View>
            </View>
            <View>
               <Text style={{ color: '#444' }}>عنوان المنزل:</Text>
               <TextInput value={ values.address } onChangeText={ v => setValues({ ...values, address: v }) } style={ styles.input } />
            </View>
            <View>
               <Text style={{ color: '#444' }}>البريد الإلكتروني:</Text>
               <TextInput value={ values.email } onChangeText={ v => setValues({ ...values, email: v }) } keyboardType="email-address" style={ styles.input } />
            </View>
            <TouchableOpacity onPress={ handleSubmit } style={ styles.button }>
               <Text style={{ color: '#fff', textAlign: 'center' }}>
                  حفظ البيانات!
               </Text>
            </TouchableOpacity>
         </ScrollView>
         : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <ActivityIndicator size={ 70 } color="#D7495A" />
            <Text style={{ marginTop: 10, color:'#D7495A', fontSize: 16 }}>من فضلك انتظر قليلا...</Text>
         </View>
      }</>
   );
}

export default Register;