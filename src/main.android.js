/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';

import Series from './android/Components/Series';

const {
  AppRegistry,
  StyleSheet,
  View,
} = React;

class webseriesnative extends React.Component{
    render() {
        const data = [
            {
                id: 1,
                title: 'Breaking Bad',
                description: 'description of Breaking Bad',
            },
            {
                id: 2,
                title: 'Jessica Jones',
                description: 'description of Jessica Jones',
            },
            {
                id: 3,
                title: 'The Big Bang Theory',
                description: 'The Big Bang Theory',
            },
        ];
        return (
        <View style={styles.container}>
            <Series data={data} />
        </View>
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
