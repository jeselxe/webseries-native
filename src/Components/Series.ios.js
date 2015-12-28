/*global fetch*/
import React, {PropTypes} from 'react-native';
import {connect} from 'react-redux/native';
import TableView from 'react-native-tableview';
import Spinner from 'react-native-spinkit';
import config from '../config';

import Serie from './Serie.ios';

const {
    View,
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
        getSerie: PropTypes.func,
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

    render () {
        return(
            <View style={styles.container}>
                <View style={styles.spinner}>
                    <Spinner isVisible={this.props.data == 0}
                        size={100}
                        type="ThreeBounce"
                    />
                </View>
                <TableView style={{flex: 1}}
                    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                    tableViewStyle={TableView.Consts.Style.Grouped}
                >
                    <TableView.Section arrow>
                        {
                            this.props.data.map((serie) => {
                                return (
                                    <TableView.Item detail={serie.description}
                                        key={serie.id}
                                        onPress={() => this.props.navigator.push({
                                            title: serie.title,
                                            component: Serie,
                                            onRightButtonPress: this.onNewSeason.bind(this, serie.id),
                                            passProps: {
                                                serie,
                                            },
                                            rightButtonTitle: 'Nueva temporada',

                                        })}
                                    >
                                        {serie.title}
                                    </TableView.Item>
                                );
                            })
                        }
                    </TableView.Section>
                </TableView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Series);
