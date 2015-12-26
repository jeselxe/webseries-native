import React, {PropTypes} from 'react-native';
import {Toolbar, List} from 'react-native-material-design';

import Serie from './Serie';

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
        drawer: PropTypes.func.isRequired,
        navigator: PropTypes.shape({
            push: PropTypes.func,
        }),
    }

    render () {
        return(
            <View>
                <Toolbar actions={[
                        {
                            icon: 'add',
                        },
                    ]}
                    icon="menu"
                    onIconPress={() => this.props.drawer()}
                    title="Series"
                />
                {
                    this.props.data.map(serie => (
                        <List key={serie.id}
                            onPress={() => {
                                this.props.navigator.push({
                                    title: 'serie',
                                    component: Serie,
                                    data: serie,
                                });
                            }}
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
