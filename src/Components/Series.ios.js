import React, {PropTypes} from 'react-native';
import TableView from 'react-native-tableview';

import Serie from './Serie.ios';

class Series extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
        })),
        navigator: PropTypes.shape({
            push: PropTypes.func,
        }),
    }

    render () {
        return(
            <TableView style={{flex: 1}}
                tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                tableViewStyle={TableView.Consts.Style.Grouped}
            >
                <TableView.Section arrow>
                    {
                        this.props.data.map((serie) => {
                            return (
                                <TableView.Item detail={serie.description}
                                    key={serie.id}
                                    onPress={() => this.props.navigator.push({
                                        title: serie.title,
                                        component: Serie,
                                        passProps: {
                                            serie,
                                        },
                                        rightButtonTitle: 'Nueva temporada',
                                        onRightButtonPress: () => {
                                            
                                        },
                                    })}
                                >
                                    {serie.title}
                                </TableView.Item>
                            );
                        })
                    }
                </TableView.Section>
            </TableView>
        );
    }
}

export default Series;
