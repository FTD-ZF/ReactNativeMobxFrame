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
import { AppColors } from '../../../../commons/styles';


export default class ListNoDataView extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {


        const { title = '暂无数据' } = this.props;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 120 }}>
                <Text style={{ fontSize: 22, color: AppColors.dark3 }}>{title}</Text>
            </View>
        );
    }


}
