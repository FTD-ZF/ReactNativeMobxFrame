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
import { AppColors } from '../commons/styles';
import NavigationService from '../commons/components/navigationService';

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {

            headerTitle: navigation.state.params.headername,
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

    _goBack() {
        this.props.navigation.state.params.callback('你好！！！');
        this.props.navigation.goBack();
    }

    _toNextPage() {
        NavigationService.navigate('OnePageView');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,
                    }} onPress={() => this._goBack()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击返回通知刷新
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,
                        marginTop: 50,
                    }} onPress={() => this._toNextPage()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击进入下个页面
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
