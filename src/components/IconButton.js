import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function IconButton({icon, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}> 
        <AntDesign name={icon} size={25} />
      </TouchableOpacity>
    </View>
  );
}
