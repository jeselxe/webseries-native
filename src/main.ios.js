/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux/native';

import App from './Components/App.ios';
import Reducers from './Reducers';

const {
  AppRegistry,
} = React;

const store = createStore(Reducers);

class webseriesnative extends React.Component {
  render() {
    return (
        <Provider store={store}>
            {() => <App store={store} />}
        </Provider>
    );
  }

}


AppRegistry.registerComponent('webseriesnative', () => webseriesnative);
