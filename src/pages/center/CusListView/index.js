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
import NavigationService from '../../../commons/components/navigationService';
import { NavPages } from '../../../root';


/**
 * FlatList结合mobx使用的再次封装-目的是为了简化代码便于后期更好地维护
 */
@observer
export default class Index extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'FlatList再封装',
    });


    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        testStore.resetListData();
    }


    _toRefreshRequest() {
        testStore.refreshStatus = true;
        testStore.getListData(1)
    }

    _toLoadRequest(currentPage) {
        testStore.getListData(currentPage)
    }


    //跳转详情flatlist
    _toDetailListView() {
        NavigationService.navigate(NavPages.DetailListView)
    }

    _renderItem = (item) => {
        return (
            <TouchableOpacity style={{ height: 600 }} onPress={() => this._toDetailListView()} >
                <Text>第{item.index}个item</Text>
            </TouchableOpacity>
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
                listData={testStore.listData}
                renderItem={this._renderItem}
                totalPages={testStore.totalPages}
                refreshStatus={testStore.refreshStatus}
                listEndPageStatus={testStore.listEndPageStatus} />

        );
    }
}


