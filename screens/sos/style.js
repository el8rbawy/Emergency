import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   items: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexWrap: 'wrap',
      paddingTop: 10,
   },
   item: {
     padding: 20,
     paddingTop: 10,
     paddingBottom: 5,
     alignItems: 'center'
   },
   textType: { 
      textAlign: 'center',
      color: '#AD404D',
      paddingTop: 5,
      fontWeight: '700'
   },
   location: {
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: "space-between",
      marginLeft: 20,
      marginRight: 20,
      borderTopColor: '#ccc',
      borderTopWidth: 1,
      marginTop: 15,
      borderBottomColor: '#AD404D',
      borderBottomWidth: 1,
      paddingTop: 5,
      paddingBottom: 5
   },
   update: {
      backgroundColor: '#D7495A',
      padding: 5, 
      width: 80,
      borderRadius: 5,
      marginRight: 5
   },
   send: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#D7495A',
      width: '100%',
      padding: 15,
      zIndex: 2
   }
});