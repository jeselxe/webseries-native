/*global fetch*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';
import Listitem from 'react-native-listitem';
import Swipeout from 'react-native-swipeout';
import config from '../config';

const {
    View,
    Text,
    Alert,
    StyleSheet,
} = React;

const mapStateToProps = (state) => {
    return {
        comentarios: state.series.comentarios,
        serie: state.series.serie,
        token: state.login.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getComentarios: (serie, temporada, capitulo) => {
            const api = config.api.url;
            const URL = `${api}/series/${serie}/temporada/${temporada}/capitulo/${capitulo}`;
            //console.log(URL);
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
        deleteComments: (token, serie, temporada, capitulo, comentario) => {
            const URL = `${config.api.url}/series/${serie}/temporada/${temporada}/capitulo/${capitulo}/comentario/${comentario}`;
            return fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        },
    };
};

class Comentarios extends React.Component {

    static propTypes = {
        comentarios: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            UsuarioId: PropTypes.number,
            comment: PropTypes.string,
        })),
        data: PropTypes.shape({
            id: PropTypes.number,
        }),
        deleteComments: PropTypes.func,
        getComentarios: PropTypes.func,
        serie: PropTypes.shape({
            id: PropTypes.number,
        }),
        temporada: PropTypes.number,
        token: PropTypes.string,
    }

    componentDidMount() {
        this.props.getComentarios(this.props.serie.id, this.props.temporada, this.props.data.id);
    }

    onDelete(comentario) {
        if (this.props.token){
            this.props.deleteComments(this.props.token, this.props.serie.id, this.props.temporada, this.props.data.id, comentario)
            .then(() => {
                Alert.alert('Borrado!!','El comentario se ha borrado correctamente');
                this.props.getComentarios(this.props.serie.id, this.props.temporada, this.props.data.id);
            });
        }
        else {
            Alert.alert('No estás logueado','Inicia sesión primero');
        }
    }

    render () {
        return(
            <View style={styles.container}>
                {
                    this.props.comentarios.map((comentario) => {
                        let actions = [
                            {
                                text: 'Borrar',
                                backgroundColor: '#a94442',
                                onPress: this.onDelete.bind(this, comentario.id),
                            },
                            {
                                text: 'Editar',
                                backgroundColor: '#48BBEC',
                            },
                        ];
                        return (
                            <Swipeout key={comentario.id}
                                right={actions}
                            >
                                <Listitem>
                                    <Text style={styles.title}>Nombre</Text>
                                    <Text style={styles.description}>{comentario.comment}</Text>
                                </Listitem>
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
    title: {
        fontSize: 17,
        fontWeight: '500',
    },
    description: {
        fontSize: 13,
        fontWeight: '300',
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Comentarios);
