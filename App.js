import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {Provider} from 'react-redux';
import ToDoScreen from './src/screens/ToDoScreen';
import store from './src/redux/store';
const App = () => {
  return (
    <Provider store={store}>
     <View style={{flex:1,backgroundColor: "beige",}}> 
      <SafeAreaView >
        <ToDoScreen />
       
      </SafeAreaView>
      </View>
    </Provider>
  );
};

export default App;
