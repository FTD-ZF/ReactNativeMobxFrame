/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PureComponent } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    BackHandler,
    TextInput,
} from 'react-native';
import { AppColors } from '../../../commons/styles/index';
import TestComponent from './TestComponent';
import { observer, inject } from "mobx-react";
import BaseComponent from '../BaseComponent';


@inject('rootStore')
@observer
export default class TwoPage extends BaseComponent {
    static navigationOptions = ({ navigation }) => {
        return {

            headerTitle: '第二个页面',
            // headerRight: (<Text>www</Text>),
            headerLeft: (<TouchableOpacity onPress={() => navigation.state.params.goBack()}>
                <Image source={require('../../../assets/imgs/arrow.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>)
        }

    }


    // 构造
    constructor(props) {
        super(props);
        this.testStore = this.props.rootStore.testStore;
        // 初始状态
        this.state = {
            name: 'oop',
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        this.getNavProps().setParams({
            goBack: () => this._goBack(),
        });
    }

    componentUnWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }


    _onBackAndroid = () => {
        // this.props.navigation.pop(2);
        this.goNavPop(2)
        return true
    }

    _goBack() {
        // this.props.navigation.pop(2);
        this.goNavPop(2)
    }
    _toNextPage() {
        // this.props.navigation.pop(2);
        this.goNavPop(2)
    }

    _toChangeTxt() {
        this.testStore.textname='123'
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
                        点击回到详情页面
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,
                        marginTop: 50,
                    }} onPress={() => this._toChangeTxt()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击修改内容
                </Text>
                </TouchableOpacity>

                <TestComponent name={this.testStore.textname} />
               
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
