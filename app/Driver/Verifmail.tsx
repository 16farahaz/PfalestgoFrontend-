import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Verifmail = () => {
  return (
   <SafeAreaView style={styles.cont}>
     <View>
        <Image source={require('../../assets/images/verif.jpeg')} style={styles.imgg} />
      <Text>we gone verify your email </Text>
      <Text>Please press the button Verify </Text>
    </View>
   </SafeAreaView>
  )
}

export default Verifmail

const styles = StyleSheet.create({
 body:{
    backgroundColor: '#CACACA',
    height: 830,
    width: 410,

 },
 cont:{
    
 },

imgg:{

    width: 410,
    height: 210,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
},

    
})