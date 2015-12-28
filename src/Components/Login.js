/*global fetch*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';
import t from 'tcomb-form-native';
import config from '../config';
import localStorage from '../Utils/localStorage';

const {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} = React;

const Form = t.form.Form;

const LoginForm = t.struct({
    nombre: t.String,
    password: t.String,
});
const Register = t.struct({
    nombre: t.String,
    password: t.String,
    confirm: t.String,
});

const mapStateToProps = (state) => {
    return {
        logged: state.login.logged,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (login) => {
            const URL = `${config.api.url}/usuario/login`;
            let body = JSON.stringify(login);
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            })
            .then((response) => response.json())
            .then((data) => {
                let token = data.token;

                localStorage.save('token', token);

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    token,
                });

                Alert.alert('Enhorabuena', 'Ha accedido al sistema correctamente');
            })
            .done();
        },
        logout: () => {
            localStorage.delete('token').then(() => {
                dispatch({
                    type: 'LOGOUT',
                });
                localStorage.delete('token');
            });
        },
        register: (data) => {
            const URL = `${config.api.url}/usuario`;
            let body = JSON.stringify(data);
            return fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });
        },
    };
};

class Login extends React.Component {

    static propTypes = {
        logged: PropTypes.bool,
        login: PropTypes.func,
        logout: PropTypes.func,
        register: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            login: true,
        };
    }

    onlogin() {
        const model = this.refs.login.getValue();
        if(model) {
            const data = {
                user: model.nombre,
                password: model.password,
            };
            this.props.login(data);
        }
    }

    onLogout() {
        this.props.logout();
    }

    onRegister() {
        const model = this.refs.register.getValue();
        if (model && model.password === model.confirm) {
            const data = {
                nickname: model.nombre,
                password: model.password,
            };

            this.props.register(data).then(() => {
                this.props.login({
                    user: model.nombre,
                    password: model.password,
                });
            });
        }
    }

    renderLogin(options) {
        return(
            <View>
                <Form
                    options={options}
                    ref= "login"
                    type={LoginForm}
                />
                <TouchableOpacity
                    onPress={this.onlogin.bind(this)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.setState({login: false})}
                    style={styles.registerButton}
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderLogout() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.onLogout.bind(this)}
                    style={styles.logoutButton}
                >
                    <Text style={styles.buttonText}>Salir</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderRegister(options) {
        return (
            <View>
                <Form
                    options={options}
                    ref="register"
                    type={Register}
                />
                <TouchableOpacity
                    onPress={this.onRegister.bind(this)}
                    style={styles.registerButton}
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.setState({login: true})}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render () {
        const options = {
            fields: {
                password: {
                    password: true,
                },
                confirm: {
                    password: true,
                },
            },
        };
        return (
            <View style={styles.container}>
                {
                    this.props.logged ?
                    this.renderLogout() :
                    (this.state.login ? this.renderLogin(options) : this.renderRegister(options))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    button: {
        height: 36,
        backgroundColor: '#5fec48',
        borderColor: '#5fec48',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    registerButton: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    logoutButton: {
        height: 36,
        backgroundColor: '#a94442',
        borderColor: '#a94442',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
