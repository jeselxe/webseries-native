/*global fetch*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';
import Listitem from 'react-native-listitem';
import Swipeout from 'react-native-swipeout';
import config from '../config';
import Comentarios from './Comentarios.ios';
import ModalWrapper from './ModalWrapper';
import NewComment from './NewComment.ios';

const {
    StyleSheet,
    View,
    Alert,
} = React;

const mapStateToProps = (state) => {
    return {
        serie: state.series.serie,
        capitulos: state.series.capitulos,
        token: state.login.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTemporada: (serie, temporada) => {
            const api = config.api.url;
            fetch(`${api}/series/${serie}/temporada/${temporada}`)
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'GET_EPISODES',
                    episodes: data,
                });
            })
            .done();
        },
        deleteTemporada: (token, serie, temporada, capitulo) => {
            const URL = `${config.api.url}/series/${serie}/temporada/${temporada}/capitulo/${capitulo}`;
            return fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        },
        openModal: (title, component, data) => {
            dispatch({
                type: 'OPEN_MODAL',
                component,
                title,
                data,
            });
        },
    };
};

class Temporada extends React.Component {
    static propTypes = {
        capitulos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        })),
        deleteTemporada: PropTypes.func,
        getTemporada: PropTypes.func,
        navigator: PropTypes.shape({
            push: PropTypes.func,
        }),
        openModal: PropTypes.func,
        serie: PropTypes.shape({
            id: PropTypes.number,
        }),
        temporada: PropTypes.shape({
            id: PropTypes.number,
            season: PropTypes.number,
        }),
        token: PropTypes.string,
    }

    componentDidMount() {
        this.props.getTemporada(this.props.serie.id, this.props.temporada.id);
    }

    onDelete(capitulo) {
        if (this.props.token){
            this.props.deleteTemporada(this.props.token, this.props.serie.id, this.props.temporada.id, capitulo)
            .then(() => {
                this.props.getTemporada(this.props.serie.id, this.props.temporada.id);
            });
        }
        else {
            Alert.alert('No estás logueado','Inicia sesión primero');
        }
    }

    render () {
        return (
            <View style={styles.container}>
                {
                    this.props.capitulos.map((capitulo) => {
                        let actions = [
                            {
                                text: 'Borrar',
                                backgroundColor: '#a94442',
                                onPress: this.onDelete.bind(this, capitulo.id),
                            },
                            {
                                text: 'Editar',
                                backgroundColor: '#48BBEC',
                            },
                        ];
                        return (
                            <Swipeout key={capitulo.id}
                                right={actions}
                            >
                                <Listitem
                                    onPress={() => this.props.navigator.push({
                                        title: capitulo.title,
                                        component: Comentarios,
                                        passProps: {
                                            data: capitulo,
                                            temporada: this.props.temporada.id,
                                        },
                                        rightButtonTitle: 'Nuevo comentario',
                                        onRightButtonPress: () => this.props.openModal('Nuevo comentario',(<ModalWrapper>{NewComment}</ModalWrapper>), {serie: this.props.serie.id, temporada: this.props.temporada.id, capitulo: capitulo.id}),
                                    })}
                                    text={capitulo.title}
                                />
                        </Swipeout>
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Temporada);
