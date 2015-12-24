import React from 'react-native';

import Series from '../Components/Series';

const {
    View,
    StyleSheet,
} = React;

class SeriesScreen extends React.Component {

    render () {
        const data = [
            {
                id: 1,
                title: 'Breaking Bad',
                description: 'description of Breaking Bad',
            },
            {
                id: 2,
                title: 'Jessica Jones',
                description: 'description of Jessica Jones',
            },
            {
                id: 3,
                title: 'The Big Bang Theory',
                description: 'descripcion of The Big Bang Theory',
            },
        ];
        return(
            <View style={styles.container}>
                <Series data={data} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
    },
});

export default SeriesScreen;
