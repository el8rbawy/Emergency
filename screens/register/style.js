import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingLeft: 30,
      paddingRight: 30,
      backgroundColor: '#fff'
   },
   photo: {
      marginTop: 15,
      marginBottom: 15,
      alignItems: 'center',
   },
   input: {
      borderWidth: 1.5,
      borderColor: '#D7495A',
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 10,
      padding: 4,
      paddingLeft: 15,
      paddingRight: 15,
      color: '#D7495A'
   },
   button: {
      backgroundColor: '#D7495A',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 1,
      borderRadius: 3,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10
   }
});