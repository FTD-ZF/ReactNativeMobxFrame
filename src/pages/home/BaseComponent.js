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
   
    }


    componentUnWillMount() {

    }

    componentDidMount() {


    }

    getNavProps() {
        return this.props.navigation
    }

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


