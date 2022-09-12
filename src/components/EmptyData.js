import { View, Text,Image } from 'react-native'
import React from 'react'

export default function EmptyData() {
  return (
    <View style={{alignItems:'center',justifyContent:'center'}}>
      <Image source={require('../assets/images/emptyData.png') } style={{height:300,width:300}}/>
      <Text style={{fontSize:25,fontWeight:"500"}}>There is no task to do</Text>
    </View>
  )
}