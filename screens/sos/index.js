import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, View, TouchableHighlight, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';
import { types, mapStyle } from './items.json';
import { AuthContext } from '../../services/context';
import { styles } from './style';

function Sos({ navigation }) {
   const { auth } = useContext(AuthContext);
   const mapHeight =  Dimensions.get('window').height - useHeaderHeight() - 320;

   const [location, setLocation] = useState(null);
   const [address, setAddress] = useState(null);
   const [items] = useState(types);
   const [selected, setSelected] = useState('حريق');
   const [isLoad, setIsLoad] = useState(false);
   
   // -- map
   useEffect(_=> {
      (async () => {
         let { status } = await Location.requestPermissionsAsync();
         
         if (status !== 'granted') {
            Alert.alert('تنبيه', 'يجب الموافقة علي اخذ صلاحية تحديد موقعك.');
            navigation.replace('Home');
            return;
         }

         handleLocation();
       })();
   }, []);

   // -- get location
   function handleLocation() {
      Location.getCurrentPositionAsync({})
         .then(res => {
            const gps = {
               latitude: res.coords.latitude,
               longitude: res.coords.longitude,
               latitudeDelta: 0,
               longitudeDelta: 0.0250
            }

            Location.reverseGeocodeAsync({ latitude: res.coords.latitude, longitude: res.coords.longitude })
               .then(res => setAddress(`${ res[0].city }, ${ res[0].subregion }, ${ res[0].region }`));

            setLocation(gps);
         })
         .catch((err) => {
            if (err.toString() === 'Error: Location request failed due to unsatisfied device settings.') {
               Alert.alert('تنبيه', 'يرجي منك فتح GPS لتحديد موقعك.');
               navigation.replace('Home');

            } else handleLocation();
         });
   }

   // --
   function handleSelect(title, index) {
      setSelected(title);
      for (let i in items) items[i].active = false;
      items[index].active = true;
   }

   // --
   function handleSubmit() {
      const values = {
         userInfo: auth,
         type: selected,
         location: {
            address,
            coordinates: location
         }
      }

      setIsLoad(true);

      fetch(`https://graduation-p-default-rtdb.europe-west1.firebasedatabase.app/emergency.json`, {
         method: 'POST',
         body: JSON.stringify(values)
      })
         .then(_=> {
            Alert.alert('تنبيه', 'تم ارسال الاستغاثة للجهة المختصة بنجاح\n (نتمي سلامتك).');
            navigation.replace('Home');
         })
         .catch(_=> {
            setIsLoad(false);
            Alert.alert('تنبيه', 'تأكد من اتصالك بالانترنت');
         });
   }

   // -- Types of emergencies
   const itemsMap = items.map((item, index) => (
      <TouchableHighlight
         key={ item.id }
         style={ styles.item }
         underlayColor="#fff" 
         onPress={ _=> handleSelect(item.title, index) }
      >
         <View style={{ alignItems: 'center' }}>
            <View 
               style={{ 
                  padding: 5,
                  backgroundColor: item.active ? '#D7495A' : '#fff',
                  borderRadius: item.active ? 25 : 0,
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center'
               }}
            >{
               item.icon_name === 'fire' || item.icon_name === 'knife' || item.icon_name === 'home-flood' 
               ? <MaterialCommunityIcons name={ item.icon_name } size={ item.size } color={ item.active ? '#fff' : '#AD404D' } />
               : item.icon_name === 'unlock-alt' || item.icon_name === 'ambulance' 
               ? <FontAwesome name={ item.icon_name } size={ item.size } color={ item.active ? '#fff' : '#AD404D' } />
               : <FontAwesome5 name={ item.icon_name } size={ item.size } color={ item.active ? '#fff' : '#AD404D' } />
            }</View>
            <Text style={ styles.textType }>{ item.title }</Text>
         </View>
      </TouchableHighlight>
   ));

   return (
      isLoad === false  ?
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
         <View style={{ height: 240, paddingTop: 15 }}>
            <ScrollView>
               <Text style={{ color: '#AD404D', fontSize: 18, paddingRight: 20 }}>اختر نوع حالة الطوارئ:</Text>
               <View style={ styles.items }>{ itemsMap }</View>
            </ScrollView>
         </View>
         <View style={ styles.location }>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <MaterialIcons name="gps-fixed" size={ 18 } color="#AD404D" />
               <Text 
                  style={{ marginLeft: 3, color: '#AD404D', width: Dimensions.get('window').width - 164 }}
                  numberOfLines = { 1 }
               >
                  { address && address }.
               </Text>
            </View>
            <TouchableOpacity style={ styles.update } onPress={ handleLocation }>
               <Text style={{ color: '#fff', textAlign: 'center' }}>تحديث</Text>
            </TouchableOpacity>
         </View>
         <View style={{ position: 'relative' }}>
            <MapView 
               initialRegion={ location } 
               style={{ height: mapHeight }}
               customMapStyle={ mapStyle }
            >
               { location && <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />}
            </MapView>
            <View style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 1 }}></View>
            <TouchableHighlight
               style={ styles.send } 
               onPress={ handleSubmit }
               underlayColor={false}
            >
               <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>إرسال!</Text>
            </TouchableHighlight>
         </View>
      </View> 
      : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
         <ActivityIndicator size={ 70 } color="#D7495A" />
         <Text style={{ marginTop: 10, color:'#D7495A', fontSize: 16 }}>من فضلك انتظر قليلا...</Text>
      </View>
   );
}

export default Sos;