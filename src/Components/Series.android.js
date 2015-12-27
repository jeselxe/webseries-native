/*global fetch*/
import React, {PropTypes} from 'react-native';
import {Toolbar, List} from 'react-native-material-design';
import {connect} from 'react-redux/native';

import Serie from './Serie';
import config from '../config';

const {
    View,
} = React;

const mapStateToProps = (state) => {
    return {
        serie: state.series.serie,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSerie: (navigator, id) => {
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
                navigator.push({
                    title: 'serie',
                    component: Serie,
                    data: data.serie,
                });
            })
            .done();
        },
    };
};

class Series extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        })),
        drawer: PropTypes.func.isRequired,
        getSerie: PropTypes.func,
        navigator: PropTypes.shape({
            push: PropTypes.func,
        }),
    }

    render () {
        return(
            <View>
                <Toolbar actions={[
                        {
                            icon: 'add',
                        },
                    ]}
                    icon="menu"
                    onIconPress={() => this.props.drawer()}
                    title="Series"
                />
                {
                    this.props.data.map(serie => (
                        <List key={serie.id}
                            onPress={() => {
                                this.props.getSerie(this.props.navigator,serie.id);
                            }}
                            primaryText={serie.title}
                            secondaryText={serie.description}

                        />
                    ))
                }
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);
