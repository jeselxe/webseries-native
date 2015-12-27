import React from 'react-native';
import SeriesScreen from '../Containers/SeriesScreen';

const {
  StyleSheet,
  NavigatorIOS,
} = React;

class App extends React.Component {
    render () {
        let initialRoute = {
            title: 'Series',
            component: SeriesScreen,
            rightButtonTitle: 'New',
              onRightButtonPress: () => {

              },
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

export default App;
