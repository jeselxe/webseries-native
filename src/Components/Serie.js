import React, {PropTypes} from 'react-native';
import {Toolbar} from 'react-native-material-design';

const {
    View,
    Text,
    BackAndroid,
    StyleSheet,
} = React;

class Serie extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
        navigator: PropTypes.shape({
            pop: PropTypes.func,
        }),
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
               this.props.navigator.pop();
               return true;
        });
    }

    render () {
        return(
            <View>
                <Toolbar actions={[
                        {
                            icon: 'mode-edit',
                        },
                    ]}
                    icon="keyboard-arrow-left"
                    onIconPress={() => this.props.navigator.pop()}
                    title={this.props.data.title}
                />
            <Text style={styles.content}>{this.props.data.description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        margin: 5,
    },
});

export default Serie;
