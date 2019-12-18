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
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Fade,
    Loader,
    Shine,
    ShineOverlay,
} from 'rn-placeholder';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import AppColors from '../../../commons/styles/colors';

import { screen, pFont, pSize, autoWidth, autoHeight, dSize, pxTodp } from '../../../commons/utils/screenUtils';


export default class LongPicPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '长图展示',
    });


    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {


    }



    render() {

        return (
            <ScrollView>



                {/* <View style={styles.container} > */}

                    <Image style={{ height: pSize(1800), width:pSize(500) }} source={require('../../../assets/imgs/longpic.jpg')} />
                    {/* <Image style={{ height: autoHeight(2000), width:autoWidth(500) }} source={require('../../../assets/imgs/longpic.jpg')} /> */}
      
                {/* </View > */}
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
