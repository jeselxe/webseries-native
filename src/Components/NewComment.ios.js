import React, { PropTypes } from 'react-native';
import t from 'tcomb-form-native';

const {
    View,
    StyleSheet,
    Alert,
} = React;

const Form = t.form.Form;

const Comentario = t.struct({
    comentario: t.String,
});

class NewComment extends React.Component {
    static propTypes = {
        send: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state= {
            title: 'Nuevo',
            description: 'Comentario',
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
                    type={Comentario}
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

export default NewComment;
