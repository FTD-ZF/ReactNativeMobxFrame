
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar,
    StyleSheet,
    Slider,
} from 'react-native';
import { AppColors } from '../../../../commons/styles';



export default class TabTwiceView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            boolShow: true,//默认展示左边
        }
    }

    _toChangeFirst() {
        this.setState({
            boolShow: true,
        })
        this.props.getChangeStatus('1')
    }

    _toChangeTwice() {
        this.setState({
            boolShow: false,
        })
        this.props.getChangeStatus('2')
    }

    render() {
        const { firstName = '左边', secondName = '右边', leftPress, rightPress, boolShow = true } = this.props;
        // const { boolShow } = this.state;
        return (

            <View style={{ flexDirection: 'row', height: 50 }} >
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ flex: 1, alignItems: 'center', paddingTop: 10, paddingBottom: 5, justifyContent: 'center' }}
                    onPress={leftPress} >
                    <Text style={{ fontSize: 16, color: boolShow ? AppColors.themecolor : AppColors.dark3 }} >{firstName}</Text>
                    <View style={{
                        marginTop: 5,
                        width: 26, height: 2, borderRadius: 1,
                        backgroundColor: boolShow ? AppColors.themecolor : AppColors.transparent
                    }} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ flex: 1, alignItems: 'center', paddingTop: 10, paddingBottom: 5, justifyContent: 'center' }}
                    onPress={rightPress} >
                    <Text style={{ fontSize: 16, color: !boolShow ? AppColors.themecolor : AppColors.dark3 }} >{secondName}</Text>
                    <View style={{
                        marginTop: 5,
                        width: 26, height: 2, borderRadius: 1,
                        backgroundColor: !boolShow ? AppColors.themecolor : AppColors.transparent
                    }} />
                </TouchableOpacity>
            </View>

        );
    }
}

