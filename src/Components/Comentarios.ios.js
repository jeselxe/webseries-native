/*global fetch*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';
import Listitem from 'react-native-listitem';
import Swipeout from 'react-native-swipeout';
import config from '../config';

const {
    View,
    Text,
    StyleSheet,
} = React;

const mapStateToProps = (state) => {
    return {
        comentarios: state.series.comentarios,
        serie: state.series.serie,
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
        getComentarios: PropTypes.func,
        serie: PropTypes.shape({
            id: PropTypes.number,
        }),
        temporada: PropTypes.number,
    }

    componentDidMount() {
        this.props.getComentarios(this.props.serie.id, this.props.temporada, this.props.data.id);
    }

    render () {
        let actions = [
            {
                text: 'Borrar',
                backgroundColor: '#a94442',
            },
            {
                text: 'Editar',
                backgroundColor: '#48BBEC',
            },
        ];
        return(
            <View style={styles.container}>
                {
                    this.props.comentarios.map((comentario) => {
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
