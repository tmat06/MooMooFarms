import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from './components/Map';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Map/>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})

