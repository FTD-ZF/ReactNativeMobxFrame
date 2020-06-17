
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';


/**
 * 导航栏左边返回按钮
 */
export default class NavBackButton extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        const { onPress } = this.props;



        return (
            <TouchableOpacity onPress={onPress}>
                <Image source={require('../../assets/imgs/arrow.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>

        );
    }
}
