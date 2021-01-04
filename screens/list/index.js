import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, TextInput, Linking, TouchableHighlight } from 'react-native';
import data from './items.json';
import { Octicons } from '@expo/vector-icons';
import { styles } from './style';

function List() {
   const [items, setItems] = useState(data);
   const [empty, setEmpty] = useState(false);

   useEffect(_=> {
      if (items.length)
         setEmpty(false);
      else
         setEmpty(true);
   }, [items]);

   return(
      <SafeAreaView style={{ paddingTop: 30, backgroundColor: '#fff', flex: 1 }}>
         <View>
            <View style={{ position: 'relative' }}>
               <Octicons style={ styles.icon } name="search" size={18} color="#D7495A" />
               <TextInput 
                  placeholder="البحث في الارقام" 
                  style={ styles.search }
                  onChangeText={ value => setItems(data.filter(v => v.name.includes(value))) }
               />
            </View>
            <FlatList
               style={{ marginBottom: 80 }}
               data={ items }
               renderItem={ ({ item }) => (
                  <TouchableHighlight 
                     style={ styles.item }
                     underlayColor="rgb(235, 235, 235)" 
                     onPress={ _=> Linking.openURL(`tel:${ item.key }`) }
                  >
                     <View 
                        style={{
                           flexDirection: 'row-reverse',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           flexWrap: 'wrap'
                        }}
                     >
                        <Text style={{ color: '#AD404D' }}>{ item.name }:</Text>
                        <Text style={{ color: '#AD404D' }}>{ item.key }</Text>
                     </View>
                  </TouchableHighlight>
               )}
            />
            { empty && <Text style={{ color: '#AD404D', textAlign: 'center', fontSize: 15 }}>بحثك لا يطابق أي اسم طوارئ موجود.</Text> }
         </View>
      </SafeAreaView>
   );
}

export default List;