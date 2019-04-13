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
    BackHandler
} from 'react-native';

import { AppStyles, AppColors } from '../../commons/styles';
import { Toast } from 'teaset';
// import testStore from '../../mobx/testStore';
import { observer, inject } from "mobx-react";

@inject('rootStore')
@observer
export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '首页',
        headerLeft: (
            <TouchableOpacity onPress={() => { navigation.state.params.showToast() }}>
                <Text>左边点击</Text>
            </TouchableOpacity>

        ),
        headerRight: (<View />)

    });



    // 构造
    constructor(props) {
        super(props);
        this.testStore = this.props.rootStore.testStore;
        // 初始状态
        this.state = {
            content: '',
        };
    }

    componentWillMount() {

        this.props.navigation.setParams({
            showToast: () => this._showToast(),
            torefresh: (str) => this._toRefresh(str),
        });

    }

    componentDidMount() {
        this.testStore.getListData();
    }



    _showToast() {
        Toast.message('看下效果');
    }

    _todetails() {
        this.props.navigation.navigate('DetailsView', {
            headername: '详情',
            callback: (str) => this.props.navigation.state.params.torefresh(str),
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


                <Text style={{ marginTop: 15 }}>
                    {this.testStore.listdata}
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
