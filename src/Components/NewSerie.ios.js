import React, { PropTypes } from 'react-native';
import t from 'tcomb-form-native';

const {
    View,
    StyleSheet,
    Alert,
} = React;

let Form = t.form.Form;

const Serie = t.struct({
  title: t.String,
  description: t.String,
});

class NewSerie extends React.Component {

    static propTypes = {
        send: PropTypes.func,
    }

    componentDidMount() {
        this.props.send(this.submit.bind(this));
    }
    submit() {
        const serie = this.refs.form.getValue();
        if(serie)
        Alert.alert(serie.title, serie.description);
    }
    render () {
        const options = {
            fields: {
                title: {
                    label: 'Título',
                },
                description: {
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
                    type={Serie}
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

export default NewSerie;
