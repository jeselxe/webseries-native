import React, {PropTypes} from 'react-native';
import {connect} from 'react-redux/native';
import SeriesScreen from '../Containers/SeriesScreen';
import NewSerie from './NewSerie.ios';
import ModalWrapper from './ModalWrapper';

const {
  StyleSheet,
  NavigatorIOS,
  Modal,
  View,
} = React;

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (component) => {
            dispatch({
                type: 'OPEN_MODAL',
                component,
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
    }
    render () {
        let initialRoute = {
            title: 'Series',
            component: SeriesScreen,
            rightButtonTitle: 'New',
            onRightButtonPress: () => this.props.openModal(<ModalWrapper><NewSerie /></ModalWrapper>),
        };
        return (
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
