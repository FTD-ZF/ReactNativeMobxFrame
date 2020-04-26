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
    FlatList,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import MyTabBar from './MyTabBar';
import { Toast } from 'teaset';

import { AppColors } from '../../commons/styles';
import NavigationService from '../../commons/components/navigationService';

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({

        headerTitle: '我的'

    })

    // 构造
    constructor(props) {
        super(props);

        this.state = {
        };
    }


    _toLogin() {

        NavigationService.navigate('Login')

    }


    render() {

        return (
            <View style={styles.container}>

                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'green', marginTop: 10
                }} onPress={() => this._toLogin()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>退出登录</Text>
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
