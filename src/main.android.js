/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import {Toolbar, List} from 'react-native-material-design';

import SeriesScreen from './Containers/SeriesScreen';

const {
  AppRegistry,
  View,
  Navigator,
  DrawerLayoutAndroid,
  StyleSheet,
  ScrollView,
  Text,
} = React;

class webseriesnative extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            drawer: null,
            navigator: null,
            news: true,
        };
    }

    setDrawer = (drawer) => {
        this.setState({
            drawer,
        });
    };

    setNavigator = (navigator) => {
        this.setState({
            navigator,
        });
    };

    render() {
        const {drawer} = this.state;
        const initialRoute = {
            name: 'series',
            component: SeriesScreen,
        };
        let news = false;
        const navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.drawerCover}>
                    <Text>
                        WebSeries
                    </Text>
                </View>
                <ScrollView style={styles.page}>
                        <List primaryText="Series" />
                        <List onPress={() => {
                                    news=!news;
                            }}
                            primaryText="Noticias"
                        />
                        {
                            news ?
                            <View>
                                <List primaryText="Top" />
                                <List primaryText="Más Leidos" />
                                <List primaryText="Promocionados" />
                                <List primaryText="Últimás" />
                            </View>
                            :
                            null
                        }
                </ScrollView>
            </View>
        );
        return (
            <DrawerLayoutAndroid drawerPosition={DrawerLayoutAndroid.positions.Left}
                drawerWidth={300}
                ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null; }}
                renderNavigationView={() => navigationView}
            >
                {drawer &&
                    <Navigator configureScene={() => {
                            return Navigator.SceneConfigs.FadeAndroid;
                        }}
                        initialRoute={initialRoute}

                        ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null; }}
                        renderScene={(route, navigator) => {
                            if (this.state.navigator && route.component) {
                                return (
                                    <View>
                                        <Toolbar actions={[
                                                {
                                                    icon: 'add',
                                                },
                                            ]}
                                            icon="menu"
                                            onIconPress={()=> drawer.openDrawer()}
                                            title="Series"
                                        />
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <route.component data={route.data}
                                                navigator={navigator}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </ScrollView>
                                    </View>
                                );
                            }
                        }}
                    />
                }
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#e3e3e3',
    },
    content: {
        padding: 16,
    },
    drawerCover: {
        height: 168,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.2)',
    },
    scene: {
        marginTop: 56,
        paddingBottom: 56,
    },
    bar: {
        marginTop:0,
        top: 0,
    },
});

AppRegistry.registerComponent('webseriesnative', () => webseriesnative);
