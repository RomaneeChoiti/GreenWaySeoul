import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

function App(): React.JSX.Element {
  return ( 
  <SafeAreaView style={styles.container}>
    <View >
      <TextInput style={styles.input}/>
      <Text>zzzz</Text>
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
  }
});

export default App;
