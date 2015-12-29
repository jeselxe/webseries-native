/*global fetch*/
import React, {PropTypes} from 'react-native';
import {connect} from 'react-redux/native';
import Listitem from 'react-native-listitem';
import Swipeout from 'react-native-swipeout';
import config from '../config';
import Temporada from './Temporada.ios';
import ModalWrapper from './ModalWrapper';
import NewEpisode from './NewEpisode.ios';

const {
    View,
    Text,
    Alert,
    ScrollView,
    StyleSheet,
} = React;

const mapStateToProps = (state) => {
    return {
        temporadas: state.series.temporadas,
        token: state.login.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSerie: (id) => {
            const api = config.api.url;
            fetch(`${api}/series/${id}`)
            .then((response) => response.json())
            .then((data) => {
                //Alert.alert('getSerie', JSON.stringify(data.serie.temporadas));
                dispatch({
                    type: 'SELECT_SERIE',
                    serie: data.serie,
                });
                dispatch({
                    type: 'GET_SEASONS',
                    seasons: data.serie.temporadas,
                });
            })
            .done();
        },
        deleteTemporada: (token, serie, temporada) => {
            const URL = `${config.api.url}/series/${serie}/temporada/${temporada}`;
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

class Serie extends React.Component {

    static propTypes = {
        deleteTemporada: PropTypes.func,
        getSerie: PropTypes.func,
        navigator: PropTypes.shape({
            push: PropTypes.func,
        }),
        openModal: PropTypes.func,
        serie: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
        temporadas: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            season: PropTypes.number,
        })),
        token: PropTypes.string,
    }

    componentDidMount() {
        this.props.getSerie(this.props.serie.id);
    }

    onDelete(temporada) {
        if (this.props.token){
            this.props.deleteTemporada(this.props.token, this.props.serie.id, temporada)
            .then(() => {
                Alert.alert('Borrada!!','La temporada se ha borrado correctamente');
                this.props.getSerie(this.props.serie.id);
            });
        }
        else {
            Alert.alert('No estás logueado','Inicia sesión primero');
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>{this.props.serie.description}</Text>
                <ScrollView>
                    {
                        this.props.temporadas.map((temporada) => {
                            const title = `Temporada ${temporada.season}`;
                            let actions = [
                                {
                                    text: 'Borrar',
                                    backgroundColor: '#a94442',
                                    onPress: this.onDelete.bind(this, temporada.id),
                                },
                            ];
                            return (
                                <Swipeout autoClose
                                    key={temporada.id}
                                    right={actions}
                                >
                                    <Listitem
                                        onPress={() => this.props.navigator.push({
                                            title,
                                            component: Temporada,
                                            passProps: {
                                                temporada,
                                            },
                                            rightButtonTitle: 'Nuevo capítulo',
                                            onRightButtonPress: () => this.props.openModal('Nuevo capítulo',(<ModalWrapper>{NewEpisode}</ModalWrapper>), {serie: this.props.serie.id, temporada: temporada.id}),
                                        })}
                                        text={title}
                                    />
                                </Swipeout>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
    },
    description: {
        fontSize:18,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Serie);
