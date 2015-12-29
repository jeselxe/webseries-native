/*global fetch*/
import React, {PropTypes} from 'react-native';
import {connect} from 'react-redux/native';
import Listitem from 'react-native-listitem';
import Swipeout from 'react-native-swipeout';
import Spinner from 'react-native-spinkit';
import config from '../config';

import Serie from './Serie.ios';

const {
    View,
    Text,
    StyleSheet,
    Alert,
} = React;

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addSeason: (token, serie) => {
            const URL = `${config.api.url}/series/${serie}/temporada`;
            return fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        },
        deleteSerie: (token, serie) => {
            const URL = `${config.api.url}/series/${serie}`;
            return fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        },
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
        openModal: (title, component) => {
            dispatch({
                type: 'OPEN_MODAL',
                component,
                title,
            });
        },
    };
};

class Series extends React.Component {

    static propTypes = {
        addSeason: PropTypes.func,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        })),
        deleteSerie: PropTypes.func,
        getSerie: PropTypes.func,
        getSeries: PropTypes.func,
        navigator: PropTypes.shape({
            push: PropTypes.func,
        }),
        token: PropTypes.string,
    }

    onNewSeason(serie) {
        if (this.props.token){
            this.props.addSeason(this.props.token, serie)
            .then(() => {
                this.props.getSerie(serie);
            });
        }
        else {
            Alert.alert('No estás logueado','Inicia sesión primero');
        }
    }

    onDelete(serie) {
        if (this.props.token){
            this.props.deleteSerie(this.props.token, serie)
            .then(() => {
                this.props.getSeries();
            });
        }
        else {
            Alert.alert('No estás logueado','Inicia sesión primero');
        }
    }

    render () {
        return(
            <View style={styles.container}>
                <View style={styles.spinner}>
                    <Spinner isVisible={this.props.data == 0}
                        size={100}
                        type="ThreeBounce"
                    />
                </View>
                    {
                        this.props.data.map((serie) => {
                            let actions = [
                                {
                                    text: 'Borrar',
                                    backgroundColor: '#a94442',
                                    onPress: this.onDelete.bind(this, serie.id),
                                },
                                {
                                    text: 'Editar',
                                    backgroundColor: '#48BBEC',
                                },
                            ];
                            return (
                                <Swipeout key={serie.id}
                                    right={actions}
                                >
                                    <Listitem
                                        onPress={() => this.props.navigator.push({
                                            title: serie.title,
                                            component: Serie,
                                            onRightButtonPress: this.onNewSeason.bind(this, serie.id),
                                            passProps: {
                                                serie,
                                            },
                                            rightButtonTitle: 'Nueva temporada',

                                        })}
                                        text={serie.title}
                                    >
                                        <Text style={styles.title}>{serie.title}</Text>
                                        <Text style={styles.description}>{serie.description}</Text>
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
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Series);
