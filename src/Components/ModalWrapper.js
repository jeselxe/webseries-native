/*eslint react/no-set-state:0*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';

const {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
    };
};

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
        children: PropTypes.func.isRequired,
        closeModal: PropTypes.func,
        modal: PropTypes.shape({
            title: PropTypes.string,
        }),
    }

    constructor(props) {
        super(props);
        this.state = {
            handler: null,
        };
    }

    handler() {
        this.state.handler();
        this.props.closeModal();
    }

    setHandler(handler) {
        this.setState({
            handler,
        });
    }

    render () {
        return (
            <View style={styles.conatiner}>
                <View style={styles.navBarContainer}>
                    <View style={styles.statusBar} />
                    <View style={styles.navBar}>
                        <Text style={styles.title}>{this.props.modal.title}</Text>
                        <TouchableOpacity onPress={() => this.props.closeModal()}>
                            <View style={[styles.button, {marginLeft: 8}]}>
                                <Text style={styles.buttonText}>Cerrar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handler()}>
                            <View style={[styles.button, {marginRight: 8}]}>
                                <Text style={styles.buttonText}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <this.props.children send={this.setHandler.bind(this)} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 12,
        bottom: 7,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        letterSpacing: 0.5,
        marginTop: 12,
    },
    container: {

        backgroundColor: 'white',
    },
    content: {
        backgroundColor: 'white',
    },
    navBarContainer: {
        paddingBottom: 5,
        backgroundColor: '#007aff',
    },
    navBar: {
        height: 39,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusBar: {
        height: 20,
    },
    title: {
        fontSize: 19,
        letterSpacing: 0.5,
        color: 'white',
        fontWeight: '500',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 7,
        textAlign: 'center',
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(ModalWrapper);
