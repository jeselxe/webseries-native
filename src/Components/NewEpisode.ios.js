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
            serie: PropTypes.number.isRequired,
            temporada: PropTypes.number.isRequired,
        }),
        getTemporada: PropTypes.func,
        send: PropTypes.func,
        token: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state= {
            title: 'Nuevo',
            description: 'Capitulo',
        };

    }
    componentDidMount() {
        this.props.send(this.submit.bind(this));
    }
    submit() {
        const capitulo = this.refs.form.getValue();
        if(capitulo){
            if(this.props.token) {

                this.props.addEpisode(this.props.token, this.props.data.serie, this.props.data.temporada, capitulo).then(() => {
                    this.props.getTemporada(this.props.data.serie, this.props.data.temporada);
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
