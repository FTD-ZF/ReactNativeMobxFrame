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
    BackHandler,
} from 'react-native';
import { AppColors } from '../../../commons/styles/index';

export default class TwoPage extends Component {
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
        // 初始状态
        this.state = {};
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        this.props.navigation.setParams({
            goBack: () => this._goBack(),
        });
    }

    componentUnWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }


    _onBackAndroid = () => {
        this.props.navigation.pop(2);
        return true
    }

    _goBack() {
        this.props.navigation.pop(2);
    }
    _toNextPage() {
        this.props.navigation.pop(2);
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
