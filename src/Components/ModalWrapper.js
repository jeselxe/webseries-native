import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';

const {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} = React;

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch({
                type: 'CLOSE_MODAL',
            });
        },
    };
};

class ModalWrapper extends React.Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        closeModal: PropTypes.func,
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableHighlight onPress={() => this.props.closeModal()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableHighlight>
                </View>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 44,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#2292c2',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        flex: 1,
        backgroundColor: '#079aba',
    },
});

export default connect(null,mapDispatchToProps)(ModalWrapper);
