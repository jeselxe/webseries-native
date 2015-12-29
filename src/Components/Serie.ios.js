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
    ScrollView,
    StyleSheet,
} = React;

const mapStateToProps = (state) => {
    return {
        temporadas: state.series.temporadas,
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
    }

    componentDidMount() {
        this.props.getSerie(this.props.serie.id);
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
                <Text style={styles.description}>{this.props.serie.description}</Text>
                <ScrollView>
                    {
                        this.props.temporadas.map((temporada) => {
                            const title = `Temporada ${temporada.season}`;
                            return (
                                <Swipeout key={temporada.id}
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
