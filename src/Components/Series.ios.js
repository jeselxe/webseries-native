import React, {PropTypes} from 'react-native';
import TableView from 'react-native-tableview';
import Spinner from 'react-native-spinkit';

import Serie from './Serie.ios';

const {
    View,
    StyleSheet,
} = React;

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
            <View style={styles.container}>
                <View style={styles.spinner}>
                    <Spinner isVisible={this.props.data == 0}
                        size={100}
                        type="ThreeBounce"
                    />
                </View>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Series;
