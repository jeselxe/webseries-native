import React, {PropTypes} from 'react-native';
import {connect} from 'react-redux/native';
import SeriesScreen from '../Containers/SeriesScreen';
import NewSerie from './NewSerie.ios';
import ModalWrapper from './ModalWrapper';
import Login from './Login';

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
                <TabBarIOS.Item icon={{uri: 'featured', scale: 3}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'series',
                        });
                    }}
                    selected={this.state.selectedTab === 'series'}
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
                </TabBarIOS.Item>
                <TabBarIOS.Item icon={{uri: 'featured', scale: 3}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'news',
                        });
                    }}
                    selected={this.state.selectedTab === 'news'}
                    title="Notícias"
                >
                    <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}><Text>PROXIMAMENTE</Text></View>
                </TabBarIOS.Item>
                <TabBarIOS.Item icon={{uri: 'featured', scale: 3}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'login',
                        });
                    }}
                    selected={this.state.selectedTab === 'login'}
                    title="Login"
                >
                    <Login />
                </TabBarIOS.Item>
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
