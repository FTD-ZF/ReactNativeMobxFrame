/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Slider,
    Dimensions,
    ScrollView,
    PixelRatio,
    FlatList,
} from 'react-native';

import AppStyles from '../../../commons/styles/styles';

import AppColors from '../../../commons/styles/colors';
import DragSortableView from 'react-native-drag-sort';
import { screen, dFont, aWidth, aHeight, } from '../../../commons/utils/screenUtils';
import Swipeout from 'react-native-swipeout';
import { Toast } from 'teaset';
import testStore from '../../../mobx/testStore';
import { observer } from 'mobx-react';
import LoadFooter from './components/LoadFooter';
import CusFlatListView from './components/CusFlatListView';
import BaseComponent from '../../home/BaseComponent';

@observer
export default class DetailListView extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'FlatList第二个页面',
    });


    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        testStore.resetListDataSecond();
    }

    _toRefreshRequest() {
        testStore.refreshStatusSecond = true;
        testStore.getSecondListData(1)
    }

    _toLoadRequest(currentPage) {
        testStore.getSecondListData(currentPage)
    }



    _renderItem = (item) => {
        return (
            <View style={{ height: 600 }}>
                <Text>第{item.index}个item</Text>
            </View>
        )
    }



    render() {

        return (

            /**
             * requestRefreshData-下拉刷新func
             * requestLoadData-上拉加载func
             * listData-flatlist数据源
             * renderItem-item的布局
             * totalPages-当前列表数据的总页数-默认一页10条计算
             * refreshStatus-下拉刷新状态默认false
             * listEndPageStatus-底部布局根据数据 是否显示不同-默认false
             */

            <CusFlatListView
                requestRefreshData={() => this._toRefreshRequest()}
                requestLoadData={(currentPage) => this._toLoadRequest(currentPage)}
                listData={testStore.listDataSecond}
                renderItem={this._renderItem}
                totalPages={testStore.totalPagesSecond}
                refreshStatus={testStore.refreshStatusSecond}
                listEndPageStatus={testStore.listEndPageStatusSecond} />

        );
    }
}


