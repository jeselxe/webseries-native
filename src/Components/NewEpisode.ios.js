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

const Capitulo = t.struct({
    title: t.String,
});

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addEpisode: (token, serie, season, data) => {
            const URL = `${config.api.url}/series/${serie}/temporada/${season}/capitulo`;
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
        editEpisode: (token, serie, season, episode, data) => {
            const URL = `${config.api.url}/series/${serie}/temporada/${season}/capitulo/${episode}`;
            const body = JSON.stringify(data);
            return fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body,
            });
        },
        getTemporada: (serie, season) => {
            const api = config.api.url;
            fetch(`${api}/series/${serie}/temporada/${season}`)
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'GET_EPISODES',
                    episodes: data,
                });
            })
            .done();
        },
    };
};

class NewEpisode extends React.Component {
    static propTypes = {
        addEpisode: PropTypes.func,
        data: PropTypes.shape({
            edit: PropTypes.bool,
            serie: PropTypes.number.isRequired,
            temporada: PropTypes.number.isRequired,
            capitulo: PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
            }),
        }),
        editEpisode: PropTypes.func,
        getTemporada: PropTypes.func,
        send: PropTypes.func,
        token: PropTypes.string,
    }

    componentDidMount() {
        this.props.send(this.submit.bind(this));
    }
    submit() {
        const episode = this.refs.form.getValue();
        if(episode){
            if(this.props.token) {
                const {edit, serie, temporada, capitulo} = this.props.data;
                if (edit) {
                    this.props.editEpisode(this.props.token, serie, temporada, capitulo.id, episode).then(() => {
                        this.props.getTemporada(serie, temporada);
                    })
                    .done();
                }
                else {
                    this.props.addEpisode(this.props.token, serie, temporada, episode).then(() => {
                        this.props.getTemporada(serie, temporada);
                    })
                    .done();
                }
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
                    label: 'Nombre del capítulo',
                },
            },
        };
        return (
            <View style={styles.container}>
                <Form
                    options={options}
                    ref="form"
                    type={Capitulo}
                    value={this.props.data.capitulo}
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
});


export default connect(mapStateToProps,mapDispatchToProps)(NewEpisode);
