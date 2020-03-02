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
    TouchableOpacity
} from 'react-native';
import { AppColors } from '../../../commons/styles/index';
import NavigationService from '../../../commons/components/navigationService';
import { NavPages } from '../../../root';
import BaseComponent from '../BaseComponent';

export default class OnePage extends BaseComponent {
    static navigationOptions = ({ navigation }) => {
        return {

            headerTitle: '第一个页面',
            // headerRight: (<Text>www</Text>),
            // headerLeft: <Text>返回</Text>
        }

    }


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentWillMount() {

    }

    _toNextPage() {
        NavigationService.navigate(NavPages.TwoPageView);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,
                    }} onPress={() => this._toNextPage()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击下一个页面
                </Text>
                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});
