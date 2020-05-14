/**
 * Created by Administrator on 2017/3/23.
 */
import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Animated,
} from 'react-native';


export default class LoadFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {

        const { isLoading = true, noDataName = '没有更多数据了～' } = this.props;

        const noData = (<View style={styles.item}>
            <Text style={{ color: '#CCCCCC', fontSize: 13, }}>{noDataName}</Text>
        </View>);

        const foot = <View style={styles.item}>
            <ActivityIndicator />
            <Text>数据加载中..</Text>
        </View>;
        const mainView = isLoading ? noData : foot;

        return (
            <View style={styles.container}>
                {mainView}
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    item: {
        marginTop: 21,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 56
    },
})