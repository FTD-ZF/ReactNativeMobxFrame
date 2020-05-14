
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';


/**
 * 按钮点击
 */
export default class BtnItemView extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        /**
         * txt 文字
         * style样式
         */
        const { style, txtStyle, title, onPress } = this.props;

        return (
            <TouchableOpacity style={[{
                width: '100%', alignItems: 'center', paddingVertical: 20, marginTop: 10
            }, style]} activeOpacity={0.8} onPress={onPress}>
                <Text style={[{ color: 'black', fontSize: 18 }, txtStyle]}>{title}</Text>
            </TouchableOpacity>
        );
    }
}
