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
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import MyTabBar from './MyTabBar';
import { Toast } from 'teaset';

import { AppColors } from '../../commons/styles';

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



    render() {

        return (
            <View style={styles.container}>


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
