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
    BackHandler,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Toast } from 'teaset';
import NavigationService from '../../commons/components/navigationService.js';
import { NavPages } from '../../root.js';
import BtnItemView from './components/BtnItemView.js';
import { screen, aHeight } from '../../commons/utils/screenUtils.js';

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "中心",
        // header:null

    })



    // 构造
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    componentWillMount() {

    }

    componentDidMount() {

    }

    _toPlayVideo() {
        NavigationService.navigate(NavPages.VideoPage)
    }

    _toPlaceHolder() {
        NavigationService.navigate(NavPages.PlaceHolderPage)
    }

    _toFontAdapter() {
        NavigationService.navigate(NavPages.FontAdapterPage);
    }

    _dragListItem() {
        NavigationService.navigate(NavPages.DragListItemPage);
    }

    _toTableView() {
        NavigationService.navigate(NavPages.TableView);
    }

    _toDropDown() {
        NavigationService.navigate(NavPages.DropDownView);
    }

    _toCusFlatList() {
        NavigationService.navigate(NavPages.CusListView);
    }

    _toChatIM() {
        NavigationService.navigate(NavPages.ChatIndex);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <BtnItemView
                        style={{ backgroundColor: 'blue', }}
                        title={'视频播放'}
                        txtStyle={{ color: 'white', }}
                        onPress={() => this._toPlayVideo()} />

                    <BtnItemView
                        style={{ backgroundColor: 'green', }}
                        title={'骨架屏'}
                        txtStyle={{ color: 'white', }}
                        onPress={() => this._toPlaceHolder()} />

                    <BtnItemView
                        style={{ backgroundColor: 'yellow', }}
                        title={'字体，宽度，高度适配'}
                        txtStyle={{ color: 'black', }}
                        onPress={() => this._toFontAdapter()} />

                    <BtnItemView
                        style={{ backgroundColor: 'yellow', }}
                        title={'item拖动，侧滑'}
                        txtStyle={{ color: 'red', }}
                        onPress={() => this._dragListItem()} />

                    <BtnItemView
                        style={{ backgroundColor: 'gray', }}
                        title={'表格布局'}
                        txtStyle={{ color: 'white', }}
                        onPress={() => this._toTableView()} />

                    <BtnItemView
                        style={{ backgroundColor: 'red', }}
                        title={'筛选'}
                        txtStyle={{ color: 'black', }}
                        onPress={() => this._toDropDown()} />

                    <BtnItemView
                        style={{ backgroundColor: 'blue', }}
                        title={'FlatList再封装'}
                        txtStyle={{ color: 'black', }}
                        onPress={() => this._toCusFlatList()} />

                    <BtnItemView
                        style={{ backgroundColor: 'gray', }}
                        title={'网易云信即时聊天模块'}
                        txtStyle={{ color: 'white', }}
                        onPress={() => this._toChatIM()} />




                    <View style={{ width: screen.width, height: aHeight(50) }} />
                </View>
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f8f8',
    },

});
