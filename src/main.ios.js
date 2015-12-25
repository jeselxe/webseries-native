/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import SeriesScreen from './Containers/SeriesScreen';
const {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

class webseriesnative extends React.Component {
  render() {
      let initialRoute = {
          title: 'Series',
          component: SeriesScreen,
      };
    return (
        <NavigatorIOS
            initialRoute={initialRoute}
            style={styles.container}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('webseriesnative', () => webseriesnative);
