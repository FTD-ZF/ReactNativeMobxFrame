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
    BackHandler,
} from 'react-native';



import Swipeout from 'react-native-swipeout';
import { Toast } from 'teaset';
import { observer } from 'mobx-react';

import BtnItemView from '../components/BtnItemView';
import { Input, } from 'react-native-elements';
import BaseComponent from '../../home/BaseComponent';
import { screen } from '../../../commons/utils/screenUtils';
import linkStore from '../../../mobx/chat/linkStore';
import MD5 from '../../../commons/chatUtils/md5';
import NavigationService from '../../../commons/components/navigationService';
import { NavPages } from '../../../root';


let loginIntroduction = '项目中直接用的云信官方demo的key, 所以可直接使用官方给的体验账号：000-999，a01-a99，b01-b99均可用于体验，密码均为123456，如果登录不上可以切换账号再尝试（也可以去官方demo中注册一个账号来用）';

/**
 * 进入聊天--选择不同账号进入后进行聊天，
 */
@observer
export default class Index extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '输入账号进入',
    });


    constructor(props) {
        super(props)

        this.state = {
            account: 'a01-a99',
            password: '123456',
        }
    }

    componentDidMount() {

    }

    setAccount = (text) => {
        this.setState({
            account: text,
        });
    }

    setPwd = (text) => {
        this.setState({
            password: text,
        });
    }

    _toChatList() {
        let userAccount = this.state.account;
        let pwd = this.state.password;
        if (!userAccount) {
            Toast.message('请输入账号')
            return
        }
        if (!pwd) {
            Toast.message('请输入密码')
            return
        }

        console.log('=========_toChatList========')
        //云信的demo中使用的账号需要进行MD5,而平台直接创建的账号不需要进行MD5,此处需要注意
        //此处登录使用官方推荐的体验账号：000-999，a01-a99，b01-b99均可用于体验，密码均为123456；
        linkStore.login(userAccount, MD5(pwd), (error) => {
            if (error) {
                console.log('=========login=error========')
                console.log(error)
                Toast.message('账号异常，请重新登录')
            } else {
                NavigationService.navigate(NavPages.ChatListView)
            }
        })
    }


    render() {

        return (

            <View>

                <Input
                    inputContainerStyle={{ width: screen.width }}
                    inputStyle={{ color: '#333', height: 50 }}
                    placeholder="请输入账号"
                    placeholderTextColor="#999"
                    onChangeText={this.setAccount}
                    value={this.state.account}
                    maxLength={20}
                />
                <Input
                    inputContainerStyle={{ width: screen.width }}
                    inputStyle={{ color: '#333', height: 50 }}
                    placeholder="请输入密码"
                    placeholderTextColor="#999"
                    onChangeText={this.setPwd}
                    value={this.state.password}
                    maxLength={20}
                />

                <Text style={{ color: 'red', lineHeight: 25, margin: 10 }} >{loginIntroduction}</Text>
                <BtnItemView
                    style={{ backgroundColor: 'blue', marginTop: 50 }}
                    title={'进入聊天列表'}
                    txtStyle={{ color: 'white', }}
                    onPress={() => this._toChatList()} />
            </View>

        );
    }
}


