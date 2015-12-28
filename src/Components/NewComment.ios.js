import React, { PropTypes } from 'react-native';
import t from 'tcomb-form-native';

const {
    View,
    StyleSheet,
    Alert,
} = React;

const Form = t.form.Form;

const Comentario = t.struct({
    comment: t.String,
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
        const options = {
            fields: {
                comment: {
                    label: 'Descripción',
                    multiline: true,
                    stylesheet: Object.assign({},t.form.Form.stylesheet,{textbox: {normal: styles.normal, error: styles.error}}),
                },
            },
        };
        return (
            <View style={styles.container}>
                <Form
                    options={options}
                    ref="form"
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
    normal: {
      color: '#000000',
      fontSize: 17,
      height: 72,
      padding: 7,
      borderRadius: 4,
      borderColor: '#cccccc',
      borderWidth: 1,
      marginBottom: 5,
    },
    // the style applied when a validation error occours
    error: {
      color: '#000000',
      fontSize: 17,
      height: 72,
      padding: 7,
      borderRadius: 4,
      borderColor: '#a94442',
      borderWidth: 1,
      marginBottom: 5,
    },
});

export default NewComment;
