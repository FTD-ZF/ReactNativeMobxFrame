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
// import testStore from '../../mobx/testStore';
import { observer, inject } from "mobx-react";
import NavigationService from '../../commons/components/navigationService';


export default class BaseComponent extends Component {




    // 构造
    constructor(props) {
        super(props);


        this.state = {

        };

    }

    componentWillMount() {
        console.log('=======BaseComponent===========componentWillMount========')
    }


    componentUnWillMount() {

    }

    componentDidMount() {
        console.log('=======BaseComponent===========componentDidMount========')

    }


    //进行设置导航的方法
    getNavProps() {
        return this.props.navigation
    }

    //获取设置在导航中的方法
    getNavParams() {
        return this.props.navigation.state.params
    }

    goBack() {
        this.props.navigation.goBack();
    }

    //返回页面数
    goNavPop(position) {
        this.props.navigation.pop(position);
    }






}


