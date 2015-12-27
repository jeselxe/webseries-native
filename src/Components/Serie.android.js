/*global fetch*/
import React, {PropTypes} from 'react-native';
import {Toolbar, List} from 'react-native-material-design';
import {connect} from 'react-redux/native';

import config from '../config';
import Temporada from './Temporada';

const {
    View,
    Text,
    BackAndroid,
    StyleSheet,
    Alert,
} = React;


const mapDispatchToProps = (dispatch) => {
    return {
        getTemporada: (serie, temporada) => {
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
        data: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
            temporadas: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                season: PropTypes.number,
            })),
        }),
        getSerie: PropTypes.func,
        navigator: PropTypes.shape({
            pop: PropTypes.func,
            push: PropTypes.func,
        }),
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
               this.props.navigator.pop();
               return true;
        });
    }

    render () {
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
                this.props.data.temporadas.map(temporada => (
                    <List key={temporada.id}
                        onPress={() => {
                            this.props.navigator.push({
                                title: 'temporada',
                                component: Temporada,
                                data: temporada,
                            });
                        }}
                        primaryText={`Temporada ${temporada.season}`}
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

export default connect(null, mapDispatchToProps)(Serie);
