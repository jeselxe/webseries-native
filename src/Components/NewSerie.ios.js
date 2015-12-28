/*global fetch*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';
import t from 'tcomb-form-native';
import config from '../config';

const {
    View,
    StyleSheet,
    Alert,
} = React;

let Form = t.form.Form;

const Serie = t.struct({
  title: t.String,
  description: t.String,
});

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSeries: () => {
            const api = config.api.url;
            fetch(`${api}/series`)
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'GET_SERIES',
                    series: data.series,
                });
            })
            .done();
        },
    };
};

class NewSerie extends React.Component {

    static propTypes = {
        getSeries: PropTypes.func,
        send: PropTypes.func,
        token: PropTypes.string,
    }

    componentDidMount() {
        this.props.send(this.submit.bind(this));
    }
    submit() {
        const serie = this.refs.form.getValue();
        if(serie){
            if(this.props.token) {
                const URL = `${config.api.url}/series`;
                const body = JSON.stringify(serie);
                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${this.props.token}`,
                    },
                    body,
                })
                .then(() => {
                    this.props.getSeries();
                })
                .done();
            }
            else {
                Alert.alert('No estás logueado', 'Inicia sesión primero');
            }
        }
    }
    render () {
        const options = {
            fields: {
                title: {
                    label: 'Título',
                },
                description: {
                    label: 'Descripción',
                    multiline: true,
                    stylesheet: Object.assign({},t.form.Form.stylesheet,{textbox: {normal: styles.normal, error: styles.error}}),
                },
            },
        };
        return (
            <View style={styles.container}>
                <Form
                    options={options}
                    ref="form"
                    type={Serie}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    normal: {
      color: '#000000',
      fontSize: 17,
      height: 72,
      padding: 7,
      borderRadius: 4,
      borderColor: '#cccccc',
      borderWidth: 1,
      marginBottom: 5,
    },
    // the style applied when a validation error occours
    error: {
      color: '#000000',
      fontSize: 17,
      height: 72,
      padding: 7,
      borderRadius: 4,
      borderColor: '#a94442',
      borderWidth: 1,
      marginBottom: 5,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSerie);
