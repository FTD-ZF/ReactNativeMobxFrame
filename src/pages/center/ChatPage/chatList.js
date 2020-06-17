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
    FlatList,
    BackHandler,
} from 'react-native';

import { Toast } from 'teaset';
import { observer } from 'mobx-react';
import BtnItemView from '../components/BtnItemView';
import { Input, } from 'react-native-elements';
import BaseComponent from '../../home/BaseComponent';
import { screen } from '../../../commons/utils/screenUtils';
import linkStore from '../../../mobx/chat/linkStore';
import MD5 from '../../../commons/chatUtils/md5';
import ChatListItem from './components/ChatListItem';
import nimStore from '../../../mobx/chat/nimStore';
import util from '../../../commons/chatUtils';
import NavigationService from '../../../commons/components/navigationService';
import { NavPages } from '../../../root';
import NavBackButton from '../../../commons/components/NavBackButton';
import sessionAction from '../../../mobx/chat/sessionAction';


/**
 * 聊天列表
 */
@observer
export default class ChatListView extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '近期会话列表',
        headerLeft: <NavBackButton onPress={() => navigation.state.params.goBack()} />
    });


    constructor(props) {
        super(props)

        this.state = {


        }
    }

    componentWillMount() {

        this.getNavProps().setParams({
            goBack: () => this._toBack(),

        });
    }

    componentDidMount() {

    }


    componentWillUnmount() {
        linkStore.logout()
    }


    _toBack() {
        linkStore.logout()
        this.goBack()
    }


    toChatDetail(content) {
        console.log('content==========')
        console.log(content)
        let sessionId = content.id;
        let titleName = content.name;
        console.log(sessionId)
        // this.props.navigation.navigate('chat', { sessionId });
        NavigationService.navigate(NavPages.ChatDetailsView, { sessionId, titleName })
    }

    //删除会话
    _toDeleteItem(item, index) {
        console.log('======delete')
        console.log(item)

        sessionAction.deleteLocalSession(item.id)
    }


    //获取当前会话的列表
    genSession() {
        const {
            sessionlist, userInfos, userID, teamlist
        } = nimStore;
        const list = [];
        console.log(teamlist)
        for (let i = 0; i < sessionlist.length; i += 1) {
            const item = { ...sessionlist[i] };
            item.name = '';
            item.avatar = '';
            // 没有最新会话的不展示
            if (!item.lastMsg) {
                continue;
            }
            if (item.scene === 'p2p') {
                console.log('======p2p=========item')
                console.log(item)
                if (item.to === userID) {
                    //自己和自己发 排除掉
                    continue;
                }
                if (userInfos[item.to]) {
                    item.name = util.getFriendAlias(userInfos[item.to]);
                    item.avatar = util.genAvatar(userInfos[item.to].avatar || 'https://yx-web.nos-hz.163yun.com/webdoc/h5/im/default-icon.png');
                } else {
                    this.props.userInfo.getUserInfo(item.to, () => {
                        this.forceUpdate();
                    });
                }
            } else {
                console.log('======team=========item')
                console.log(item)
                // console.log('====teamlistid===' + teamlist[0].teamId.replace(/^team-/, ''))
                teamlist.map((teamItem, index) => {
                    if (teamItem.teamId == teamlist[index].teamId.replace(/^team-/, '')) {
                        item.name = teamItem.name;
                        item.avatar = teamItem.avatar == '' ? 'https://yx-web.nos-hz.163yun.com/webdoc/h5/im/default-advanced.png' : teamItem.avatar;
                    }
                })

            }
            const lastMsg = item.lastMsg || {};
            if (lastMsg.type === 'text') {
                item.lastMsgShow = lastMsg.text || '';
            } else if (lastMsg.type === 'custom') {
                item.lastMsgShow = util.parseCustomMsg(lastMsg);
                // } else if (lastMsg.scene === 'team' && lastMsg.type === 'notification') {
                //   item.lastMsgShow = util.generateTeamSysmMsg(lastMsg);
            } else if (util.mapMsgType(lastMsg)) {
                item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`;
            } else {
                item.lastMsgShow = '';
            }
            item.lastMsgShow = util.shortenWord(item.lastMsgShow, 20);
            if (item.lastMsg.time) {
                item.updateTimeShow = util.formatDate(item.lastMsg.time, true);
            }
            list.push(item);
        }
        return list;
    }

    renderItem = (item) => {
        return (
            <ChatListItem
                key={item.index}
                headerSource={{ uri: item.item.avatar }}
                title={item.item.name}
                lastMsg={item.item.lastMsgShow}
                lastTime={item.item.updateTimeShow}
                onPress={() => this.toChatDetail(item.item)}
                deleteItem={() => this._toDeleteItem(item.item, item.index)} />
        )
    }


    render() {

        // const { sessionlist, userInfos, teamlist } = nimStore;
        // console.log('========userInfos===============')
        // console.log(userInfos)
        // console.log('========teamlist===============')
        // console.log(teamlist)
        const sessionlists = this.genSession();
        // console.log(sessionlists)
        return (
            <ScrollView>


                <View style={{ justifyContent: 'center', }} >
                    {/* {
                        sessionlists.map((item, index) => {
                            // console.log(item)

                            return (
                                <ChatListItem
                                    key={index}
                                    headerSource={{ uri: item.avatar }}
                                    title={item.name}
                                    lastMsg={item.lastMsgShow}
                                    onPress={() => this.toChatDetail(item)}
                                    deleteItem={() => this._toDeleteItem(item, index)} />
                            )
                        })
                    } */}
                    <FlatList
                        data={sessionlists}
                        extraData={this.state}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>
        )
    }
}


