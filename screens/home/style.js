import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff'
   },
   title: {
      position: 'relative',
      width: '100%',
      height: 55.8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#D7495A',
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.22,
      elevation: 5,
   },
   sos: {
      backgroundColor: '#ffe5e8',
      width: 220,
      height: 220,
      borderRadius: 110,
      alignItems: 'center',
      justifyContent: 'center'
   },
   sos_2: {
      backgroundColor: '#f2c0c6',
      width: 195,
      height: 195,
      borderRadius: 97.5,
      alignItems: 'center',
      justifyContent: 'center'
   },
   sos_3: {
      fontSize: 40,
      color: '#fff',
      backgroundColor: '#D7495A',
      width: 170,
      height: 170,
      borderRadius: 85,
      textAlign: 'center',
      lineHeight: 170,
      shadowOffset: {
         width: 0,
         height: 10,
      },
      shadowOpacity: 10,
      shadowRadius: 85,
      elevation: 12
   },
   note: {
      color: '#AD404D', 
      textAlign: 'center',
      fontSize: 18,
      width: 280,
      marginBottom: 70,
   }
});