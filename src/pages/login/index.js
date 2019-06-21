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
    ImageBackground,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import { AppStyles, AppColors } from '../../commons/styles/index';
import { Toast } from 'teaset';

import { observer, inject } from "mobx-react";
import NavigationService from '../../commons/components/navigationService';

@inject('rootStore')
@observer
export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    // 构造
    constructor(props) {
        super(props);

        this.loginStore = this.props.rootStore.loginStore;
        this.state = {

        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    _toLogin() {
        NavigationService.navigate('Home');
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={{
                    backgroundColor: AppColors.themecolor,
                    width: 200, borderRadius: 10,
                    padding: 15,
                }} onPress={() => this._toLogin()}>

                    <Text style={{ fontSize: 18, color: AppColors.white, textAlign: 'center' }}>立即登录</Text>

                </TouchableOpacity>

            </View >


        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.darkF9,
        alignItems: 'center',
        justifyContent: 'center'

    },

});
