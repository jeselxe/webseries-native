/*global fetch*/
import React, {PropTypes} from 'react-native';
import {connect} from 'react-redux/native';

import Series from '../Components/Series.ios';
import config from '../config';

const {
    View,
    StyleSheet,
    Platform,
} = React;

const mapStateToProps = (state) => {
    return {
        series: state.series.series,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSeries : () => {
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
    };
};

class SeriesScreen extends React.Component {

    static propTypes = {
        drawer: PropTypes.func,
        getSeries: PropTypes.func,
        navigator: PropTypes.shape({

        }),
        series: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        })),
    };

    componentDidMount() {
        this.props.getSeries();
    }

    render () {

        return(
            <View style={styles.container}>
                <Series data={this.props.series}
                    drawer={this.props.drawer}
                    navigator={this.props.navigator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 0,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SeriesScreen);
