import React, {PropTypes} from 'react-native';

import Series from '../Components/Series.android';

const {
    View,
    StyleSheet,
    Platform,
} = React;

class SeriesScreen extends React.Component {

    static propTypes = {
        navigator: PropTypes.object,
    };

    render () {
        const data = [
            {
                id: 1,
                title: 'Breaking Bad',
                description: 'Description of Breaking Bad',
            },
            {
                id: 2,
                title: 'Jessica Jones',
                description: 'Description of Jessica Jones',
            },
            {
                id: 3,
                title: 'The Big Bang Theory',
                description: 'Description of The Big Bang Theory',
            },
        ];
        return(
            <View style={styles.container}>
                <Series data={data}
                    navigator={this.props.navigator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 70 : 0,
    },
});

export default SeriesScreen;
