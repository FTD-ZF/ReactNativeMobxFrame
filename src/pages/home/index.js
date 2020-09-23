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
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    PixelRatio,
    StatusBar,
} from 'react-native';

import { AppStyles, AppColors } from '../../commons/styles';
import { Toast } from 'teaset';
import { observer, inject } from "mobx-react";
import NavigationService from '../../commons/components/navigationService';
import { NavPages } from '../../root';
import BaseComponent from './BaseComponent';
import testStore from '../../mobx/testStore';

@observer
export default class Index extends BaseComponent {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '首页',
        headerLeft: (
            <TouchableOpacity onPress={() => { navigation.state.params.showToast() }}>
                <Text>左边点击</Text>
            </TouchableOpacity>

        ),
        headerRight: (<View />),
    });


    // 构造
    constructor(props) {
        super(props);

        // 初始状态
        this.state = {

        };
        // StatusBar.setTranslucent(true);
        // StatusBar.setBackgroundColor(AppColors.backgroundColor)
        // StatusBar.setBarStyle('light-content');

    }

    componentWillMount() {


        this.getNavProps().setParams({
            showToast: () => this._showToast(),
            torefresh: (str) => this._toRefresh(str),
        });

    }

    componentUnWillMount() {

    }

    componentDidMount() {
        // testStore.getListData()
        // Toast.message('' + StatusBar.currentHeight)


        // this.getNavProps().addListener((res) => {
        //     console.log(res)
        // })

    }

    _showToast() {
        Toast.message('看下效果');
    }

    _todetails() {
   
        NavigationService.navigate(NavPages.DetailsView, {
            headername: '详情',
            callback: (str) => this.getNavParams().torefresh(str),
        });
    }

    _toRefresh(str) {
        this.setState({
            content: str,
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />

                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,
                    }} onPress={() => this._todetails()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击进入详情
                    </Text>
                </TouchableOpacity>


                <Text style={{ marginTop: 5 }}>
                    详情通知来了：{this.state.content}
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 5,
        backgroundColor: AppColors.dark9,
    },
});
