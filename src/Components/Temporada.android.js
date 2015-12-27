/*global fetch*/
import React, {PropTypes} from 'react-native';
import {Toolbar, List} from 'react-native-material-design';
import {connect} from 'react-redux/native';
import config from '../config';

const {
    View,
    Text,
    BackAndroid,
    StyleSheet,
    Alert,
} = React;

const mapStateToProps = (state) => {
    return {
        capitulos: state.series.capitulos,
        serie: state.series.serie,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCapitulos: (serie, temporada) => {
            const api = config.api.url;
            fetch(`${api}/series/${serie}/temporada/${temporada}`)
            .then((response) => response.json())
            .then((data) => {
                Alert.alert('data', data);
                dispatch({
                    type: 'GET_EPISODES',
                    episodes: data,
                });
            })
            .done();
        },
    };
};

class Serie extends React.Component {

    static propTypes = {
        capitulos: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            season: PropTypes.string,
        })),
        data: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
        getCapitulos: PropTypes.func,
        navigator: PropTypes.shape({
            pop: PropTypes.func,
        }),
        serie: PropTypes.shape({
            id: PropTypes.number,
        }),
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
               this.props.navigator.pop();
               return true;
        });
        this.props.getCapitulos(this.props.serie.id, this.props.data.id);
    }

    render () {
        Alert.alert('Capi', JSON.stringify(this.props.data));
        return(
            <View>
                <Toolbar actions={[
                        {
                            icon: 'mode-edit',
                        },
                    ]}
                    icon="keyboard-arrow-left"
                    onIconPress={() => this.props.navigator.pop()}
                    title={this.props.data.title}
                />
            <Text style={styles.content}>{this.props.data.description}</Text>
            {
                this.props.capitulos.map(capitulo => (
                    <List key={capitulo.id}
                        onPress={() => {

                        }}
                        primaryText={`Temporada ${capitulo.title}`}
                    />
                ))
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        margin: 5,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Serie);
