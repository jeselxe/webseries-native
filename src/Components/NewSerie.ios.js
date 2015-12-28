import React, { PropTypes } from 'react-native';
import t from 'tcomb-form-native';

let Form = t.form.Form;

const Serie = t.struct({
  titulo: t.String,
  descripcion: t.String,
});

const {
    View,
    StyleSheet,
    Alert,
} = React;

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
        Alert.alert(serie.titulo, serie.descripcion);
    }
    render () {
        return (
            <View style={styles.container}>
                <Form ref="form"
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
});

export default NewSerie;
