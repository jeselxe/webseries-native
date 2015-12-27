/*global fetch*/
import React, { PropTypes } from 'react-native';
import {connect} from 'react-redux/native';
import TableView from 'react-native-tableview';
import config from '../config';

const {
    View,
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
        return(
            <View style={styles.container}>
            <TableView style={{flex: 1}}
                tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                tableViewStyle={TableView.Consts.Style.Grouped}
            >
                <TableView.Section>
                    {
                        this.props.comentarios.map((comentario) => {
                            return (
                                <TableView.Item detail={comentario.comment}
                                    key={comentario.id}
                                >
                                    Nombre
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

export default connect(mapStateToProps,mapDispatchToProps)(Comentarios);
