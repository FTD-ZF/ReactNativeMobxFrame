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
    BackHandler,
    TouchableOpacity,
} from 'react-native';
import { Toast } from 'teaset';
import NavigationService from '../../commons/components/navigationService.js';

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "中心",
        // header:null

    })



    // 构造
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    componentWillMount() {

    }

    componentDidMount() {

    }

    _toPlayVideo() {
        NavigationService.navigate('VideoPage')
    }

    _toPlaceHolder() {
        NavigationService.navigate('PlaceHolderPage')
    }

    _toFontAdapter() {
        NavigationService.navigate('FontAdapterPage');
    }

    _toLongPicPage() {
        NavigationService.navigate('LongPicPage')
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'blue', marginTop: 10
                }} onPress={() => this._toPlayVideo()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>视频播放</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'green', marginTop: 10
                }} onPress={() => this._toPlaceHolder()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>骨架屏</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'yellow', marginTop: 10
                }} onPress={() => this._toFontAdapter()}>
                    <Text style={{ color: 'black', fontSize: 18 }}>字体，宽度，高度适配</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'yellow', marginTop: 10
                }} onPress={() => this._toLongPicPage()}>
                    <Text style={{ color: 'black', fontSize: 18 }}>长图展示</Text>
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
