/*global fetch*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';
import TableView from 'react-native-tableview';
import config from '../config';
import Comentarios from './Comentarios.ios';

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
        return (
            <View style={styles.container}>
                <TableView style={{flex: 1}}
                    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                    tableViewStyle={TableView.Consts.Style.Grouped}
                >
                    <TableView.Section arrow>
                        {
                            this.props.capitulos.map((capitulo) => {
                                return (
                                    <TableView.Item
                                        key={capitulo.id}
                                        onPress={() => this.props.navigator.push({
                                            title: capitulo.title,
                                            component: Comentarios,
                                            passProps: {
                                                data: capitulo,
                                                temporada: this.props.temporada.id,
                                            },
                                            rightButtonTitle: 'Nuevo comentario',
                                            onRightButtonPress: () => {
                                                
                                            },
                                        })}
                                    >
                                        {capitulo.title}
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
        marginTop: 64,
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Temporada);
