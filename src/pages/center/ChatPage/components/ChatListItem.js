
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../../commons/styles';
import { screen } from '../../../../commons/utils/screenUtils';
import Swipeout from 'react-native-swipeout';

/**
 * 聊天列表item
 */
export default class ChatListItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        const { headerSource, title, lastMsg, lastTime, onPress, deleteItem } = this.props;
        let lastStringMsg = true;
        if (lastMsg) {
            lastStringMsg = true;
        } else {
            lastStringMsg = false;
        }


        let swipeoutBtns = [

            {
                text: '删除',
                backgroundColor: 'red',
                onPress: deleteItem

            }
        ]

        return (
            <Swipeout autoClose={true} right={swipeoutBtns}>
                <View style={{ backgroundColor: 'white' }} >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ flexDirection: 'row', alignItems: 'center', padding: 15, justifyContent: 'space-between' }}
                        onPress={onPress} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image style={{ width: 45, height: 45 }} source={headerSource} />
                            <View style={{ marginLeft: 15, height: 45, justifyContent: lastStringMsg ? 'space-between' : 'center', }} >
                                <Text style={{ fontSize: 16, color: '#333' }}>{title}</Text>
                                {lastStringMsg ? <Text style={{ fontSize: 14, color: '#666' }} >{lastMsg}</Text> : <View />}
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, color: AppColors.dark9 }} >{lastTime}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: AppColors.dark9, height: 1, width: screen.width - 15, marginLeft: 15 }} />
                </View>
            </Swipeout>
        );
    }
}
