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
} = React;

const mapStateToProps = (state) => {
    return {
        serie: state.series.serie,
        capitulos: state.series.capitulos,
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
    }

    componentDidMount() {
        this.props.getTemporada(this.props.serie.id, this.props.temporada.id);
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
        return (
            <View style={styles.container}>
                {
                    this.props.capitulos.map((capitulo) => {
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
