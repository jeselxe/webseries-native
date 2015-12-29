import React, {PropTypes} from 'react-native';
import {connect} from 'react-redux/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SeriesScreen from '../Containers/SeriesScreen';
import NewSerie from './NewSerie.ios';
import ModalWrapper from './ModalWrapper';
import Login from './Login';
import localStorage from '../Utils/localStorage';

const {
  StyleSheet,
  NavigatorIOS,
  TabBarIOS,
  Modal,
  View,
  Text,
} = React;

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isLogged: () => {
            localStorage.get('token').then((token) => {
                let logged = (token !== null);
                dispatch({
                    type: 'INITIAL_LOGIN',
                    token,
                    logged,
                });
            });
        },
        openModal: (title, component) => {
            dispatch({
                type: 'OPEN_MODAL',
                component,
                title,
            });
        },
    };
};

class App extends React.Component {

    static propTypes = {
        isLogged: PropTypes.func,
        modal: PropTypes.shape({
            open: PropTypes.bool,
            component: PropTypes.element,
        }),
        openModal: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'series',
        };
        props.isLogged();
    }
    render () {
        let initialRoute = {
            title: 'Series',
            component: SeriesScreen,
            rightButtonTitle: 'New',
            onRightButtonPress: () => this.props.openModal('Nueva Serie', (<ModalWrapper>{NewSerie}</ModalWrapper>)),
        };
        return (
            <TabBarIOS >
                <Icon.TabBarItem iconName="ios-film"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'series',
                        });
                    }}
                    selected={this.state.selectedTab === 'series'}
                    selectedIconName="ios-film-outline"
                    title="Series"
                >
                    <View style={styles.container}>
                        <NavigatorIOS
                            initialRoute={initialRoute}
                            style={styles.container}
                        />
                        <Modal animated
                            visible={this.props.modal.open}
                        >
                            {
                                this.props.modal.component
                            }
                        </Modal>
                    </View>
                </Icon.TabBarItem>
                <Icon.TabBarItem iconName="ios-paper"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'news',
                        });
                    }}
                    selected={this.state.selectedTab === 'news'}
                    selectedIconName="ios-paper-outline"
                    title="Notícias"
                >
                    <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}><Text>PROXIMAMENTE</Text></View>
                </Icon.TabBarItem>
                <Icon.TabBarItem iconName="log-in"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'login',
                        });
                    }}
                    selected={this.state.selectedTab === 'login'}
                    title="Login"
                >
                    <Login />
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
