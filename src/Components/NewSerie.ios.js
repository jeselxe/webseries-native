import React from 'react-native';

const {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Alert,
} = React;

class NewSerie extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            title: '',
            description: '',
        };
    }
    submit() {
        Alert.alert('text', `${this.state.title} - ${this.state.description}`);
    }
    render () {
        return (
            <View>
                <Text style={styles.title}>NUEVA SERIE</Text>
                <TextInput onChangeText={(title) => this.setState({title})}
                    placeholder="Título"
                    style={styles.input}
                    value={this.state.title}
                />
                <TextInput multiline
                    onChangeText={(description) => this.setState({description})}
                    style={styles.input}
                    value={this.state.description}
                />
            <TouchableHighlight onPress={this.submit.bind(this)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Crear</Text>
            </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 400,
        marginBottom: 20,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: 'gray',
        borderBottomWidth: 1,
        backgroundColor: '#d7d7d7',
    },
    button: {
        width: 400,
        height: 40,
        backgroundColor: '#61dd62',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 24,
    },
});

export default NewSerie;
