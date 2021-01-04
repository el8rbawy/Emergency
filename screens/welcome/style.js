import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      position: 'relative',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
   },
   text: {
      fontSize: 20,
      color: '#AD404D',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
      width: 322,
      lineHeight: 30
   },
   button: {
      flexDirection: 'row',
      alignItems:'center',
      backgroundColor: '#D7495A',
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 3,
      elevation: 2,
      borderRadius: 3,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
   },
   version: {
      position: 'absolute',
      bottom: 30,
      color: '#777'
   }
});