import React, {PropTypes} from 'react-native';
import {List} from 'react-native-material-design';

const {
    View,
} = React;

class Series extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        })),
    }

    render () {
        return(
            <View>
                {
                    this.props.data.map(serie => (
                        <List key={serie.id}
                            primaryText={serie.title}
                            secondaryText={serie.description}
                        />
                    ))
                }
            </View>
        );
    }
}

export default Series;
