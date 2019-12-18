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
} from 'react-native';

import AppStyles from '../../../commons/styles/styles';

import AppColors from '../../../commons/styles/colors';

import { screen, dFont, aWidth, aHeight, } from '../../../commons/utils/screenUtils';


export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '字体，宽度，高度',
    });


    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {


    }


    /**
     *  text中属性需要使用 allowFontScaling={false} 来控制不随系统字体大小而变化
     */

    render() {

        return (
            <ScrollView>

                <View style={styles.container} >

                    {/* 字体 */}
                    <View style={{ flexDirection: 'row', marginTop: aHeight(15), }}>
                        <Text style={{ fontSize: 15 }}>配</Text>

                        <Text style={{ fontSize: dFont(15) }} allowFontScaling={false} >配</Text>
                    </View>

                    {/* 线 */}
                    <View style={{ backgroundColor: 'black', height: 1, width: screen.width, marginTop: aHeight(15), }} />
                    <View style={{ backgroundColor: 'black', height: aHeight(1), width: screen.width, marginTop: aHeight(15), }} />

                    {/* 图 */}
                    <View style={{ width: screen.width, alignItems: 'center', marginTop: aHeight(15) }}>

                        <View style={{ backgroundColor: 'blue', width: screen.width - aWidth(32), height: aHeight(150) }} >
                            <Text style={{ color: 'white', fontSize: 40 }}>width:{screen.width - aWidth(32)}</Text>
                            <Text style={{ color: 'white', fontSize: 40 }}>height:{aHeight(150)}</Text>
                        </View>

                    </View>


                    <Image style={{ width: screen.width, height: aHeight(180), marginTop: aHeight(15) }}
                        source={require('../../../assets/imgs/test_bg.png')} resizeMode='stretch' />

                </View >
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },


});
