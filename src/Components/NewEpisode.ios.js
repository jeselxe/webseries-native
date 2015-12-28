import React, { PropTypes } from 'react-native';
import t from 'tcomb-form-native';

const {
    View,
    StyleSheet,
    Alert,
} = React;

const Form = t.form.Form;

const Capitulo = t.struct({
    nombre: t.String,
});

class NewEpisode extends React.Component {
    static propTypes = {
        send: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state= {
            title: 'Nuevo',
            description: 'Capitulo',
        };

    }
    componentDidMount() {
        this.props.send(this.submit.bind(this));
    }
    submit() {
        Alert.alert(this.state.title, this.state.description);
    }
    render () {
        return (
            <View style={styles.container}>
                <Form ref="form"
                    type={Capitulo}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});


export default NewEpisode;
