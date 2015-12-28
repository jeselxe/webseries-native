import React from 'react-native';
import t from 'tcomb-form-native';

const {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
        };
    }

    renderLogin(options) {
        return(
            <View>
                <Form
                    options={options}
                    ref= "form"
                    type={LoginForm}
                />
                <TouchableOpacity
                    onPress={this.onPress}
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

    renderRegister(options) {
        return (
            <View>
                <Form
                    options={options}
                    ref="register"
                    type={Register}
                />
                <TouchableOpacity
                    onPress={this.onPress}
                    style={styles.registerButton}
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
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
                {this.state.login ? this.renderLogin(options) : this.renderRegister(options)}
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
});

export default Login;
