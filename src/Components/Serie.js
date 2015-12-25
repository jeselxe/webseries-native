import React, {PropTypes} from 'react-native';

const {
    View,
    Text,
} = React;

class Serie extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    }

    render () {
        return(
            <View>
                <Text>{this.props.data.title}</Text>
                <Text>{this.props.data.description}</Text>
            </View>
        );
    }
}

export default Serie;
