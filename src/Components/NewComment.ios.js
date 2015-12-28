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

const Form = t.form.Form;

const Comentario = t.struct({
    comment: t.String,
});

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (token, serie, season, episode, data) => {
            const URL = `${config.api.url}/series/${serie}/temporada/${season}/capitulo/${episode}/comentario`;
            const body = JSON.stringify(data);
            return fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body,
            });
        },
        getCapitulo: (serie, season, episode) => {
            const URL = `${config.api.url}/series/${serie}/temporada/${season}/capitulo/${episode}`;
            fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                //Alert.alert('getSerie', JSON.stringify(data.serie.temporadas));
                dispatch({
                    type: 'GET_COMMENTS',
                    comments: data.comentarios,
                });
            })
            .done();
        },
    };
};

class NewComment extends React.Component {
    static propTypes = {
        addComment: PropTypes.func,
        data: PropTypes.shape({
            serie: PropTypes.number.isRequired,
            temporada: PropTypes.number.isRequired,
            capitulo: PropTypes.number.isRequired,
        }),
        getCapitulo: PropTypes.func,
        send: PropTypes.func,
        token: PropTypes.string,
    }

    componentDidMount() {
        this.props.send(this.submit.bind(this));
    }
    submit() {
        const comentario = this.refs.form.getValue();
        if(comentario){
            if(this.props.token) {
                const {serie, temporada, capitulo} = this.props.data;
                this.props.addComment(this.props.token, serie, temporada, capitulo, comentario).then(() => {
                    this.props.getCapitulo(serie, temporada, capitulo);
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
                comment: {
                    label: 'Comentario',
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
                    type={Comentario}
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

export default connect(mapStateToProps,mapDispatchToProps)(NewComment);
