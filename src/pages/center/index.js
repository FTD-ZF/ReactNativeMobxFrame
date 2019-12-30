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
} from 'react-native';
import { Toast } from 'teaset';
import NavigationService from '../../commons/components/navigationService.js';
import { NavPages } from '../../root.js';

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

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'blue', marginTop: 10
                }} onPress={() => this._toPlayVideo()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>视频播放</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'green', marginTop: 10
                }} onPress={() => this._toPlaceHolder()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>骨架屏</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'yellow', marginTop: 10
                }} onPress={() => this._toFontAdapter()}>
                    <Text style={{ color: 'black', fontSize: 18 }}>字体，宽度，高度适配</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'yellow', marginTop: 10
                }} onPress={() => this._dragListItem()}>
                    <Text style={{ color: 'black', fontSize: 18 }}>item拖动，侧滑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'gray', marginTop: 10
                }} onPress={() => this._toTableView()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>表格布局</Text>
                </TouchableOpacity>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

});
