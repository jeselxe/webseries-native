/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import App from './Components/App.android';

const {
  AppRegistry,
} = React;


class webseriesnative extends React.Component{

    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('webseriesnative', () => webseriesnative);
