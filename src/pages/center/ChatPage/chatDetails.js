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
    InteractionManager,
    BackHandler,
} from 'react-native';

import { Toast } from 'teaset';
import { observer } from 'mobx-react';
import BtnItemView from '../components/BtnItemView';
import { Input, } from 'react-native-elements';
import BaseComponent from '../../home/BaseComponent';
import { screen, isIphoneX } from '../../../commons/utils/screenUtils';
import linkStore from '../../../mobx/chat/linkStore';
import MD5 from '../../../commons/chatUtils/md5';
import ChatListItem from './components/ChatListItem';
import nimStore from '../../../mobx/chat/nimStore';
import util from '../../../commons/chatUtils';
import uuid from '../../../commons/chatUtils/uuid';
import sessionAction from '../../../mobx/chat/sessionAction';
import msgAction from '../../../mobx/chat/msgAction';
import { ChatBox } from './components/chat/chatBox';
import { ChatLeft, ChatRight } from './components/chat/chatMsg';
import { headerStyle, globalStyle, chatStyle, contactStyle } from '../../../commons/chatThemes';

const constObj = {
    chatListRef: null,
};


/**
 * 聊天详情
 */

@observer
export default class ChatDetailsView extends BaseComponent {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.getParam('titleName'),
    });


    constructor(props) {
        super(props)

        this.state = {
            showMore: false,
            refreshing: false,
        };
        this.toAccount = '';
        this.scene = '';
        const sessionId = this.getNavProps().getParam('sessionId') || '';
        this.sessionId = sessionId;

        this.scrollTimer = null;
        sessionAction.setCurrentSession(this.sessionId);
        msgAction.getLocalMsgs(this.sessionId, { reset: true });
        this.notScroll = false;
        this.sessionName()
        console.log('sessionId========' + sessionId)
    }



    componentDidMount() {
        clearTimeout(this.scrollTimer);
        // this.scrollTimer = setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
            this.scrollToEnd();
        });
        // }, 200);
    }
    componentWillUnmount() {

        clearTimeout(this.scrollTimer);
    }

    scrollToEnd = (animated = false) => {
        if (this.notScroll) {
            return;
        }
        util.debounce(200, () => {
            if (constObj.chatListRef) {
                // console.log('do');
                constObj.chatListRef.scrollToEnd({ animated });
            }
        });
    }

    loadMore = () => {
        let end = Infinity;
        if (nimStore.currentSessionMsgs.length > 1) {
            end = nimStore.currentSessionMsgs[1].time;
        }
        this.setState({
            refreshing: true,
        });
        msgAction.getLocalMsgs(this.sessionId, {
            end,
            done: () => {
                this.notScroll = true;
                clearTimeout(this.scrollTimer);
                this.scrollTimer = setTimeout(() => {
                    // InteractionManager.runAfterInteractions(() => {
                    this.notScroll = false;
                    // });
                }, 1000);
                this.setState({
                    refreshing: false,
                });
            },

        });

    }

    sessionName = () => {
        const { sessionId } = this;
        const { userInfos, userID } = nimStore;
        if (/^p2p-/.test(sessionId)) {
            const user = sessionId.replace(/^p2p-/, '');
            this.toAccount = user;
            this.scene = 'p2p';
            if (user === userID) {
                return '我的电脑';
            }
            const userInfo = userInfos[user] || {};
            return util.getFriendAlias(userInfo);
        } else if (/^team-/.test(sessionId)) {
            const team = sessionId.replace(/^team-/, '');
            this.toAccount = team;
            this.scene = 'team';
            return '群会话';
        }
        return sessionId;
    }




    renderItem = ((item) => {
        const msg = item.item;
        if (msg.type === 'tip') {
            return <Text style={chatStyle.tip}>{msg.tip}</Text>;
        } else if (msg.flow === 'in') {
            return (<ChatLeft
                msg={msg}
                nimStore={nimStore}
                navigation={this.getNavProps()}
            />);
        } else if (msg.flow === 'out') {
            return (<ChatRight
                msg={msg}
                msgAction={msgAction}
                nimStore={nimStore}
                resendTextMag={this.resendTextMag}
            />);
        } else if (msg.type === 'timeTag') {
            return <Text style={chatStyle.timetag}>----  {msg.text}  ----</Text>;
        }
        return null;
    })
    resendTextMag = (msg) => {
        if (!msg) {
            return
        }
        msgAction.resendTextMsg(msg);
    }

    render() {


        return (

            <View style={{ justifyContent: 'center', flex: 1, paddingBottom: Platform.OS == 'ios' ? isIphoneX() ? 34 : 0 : 0 }} >
                <FlatList
                    // style={{ marginVertical: 20 }}
                    data={nimStore.currentSessionMsgs}
                    keyExtractor={item => (item.idClient || item.idClientFake || item.key || uuid())}
                    renderItem={this.renderItem}
                    ref={(ref) => { constObj.chatListRef = ref; }}
                    onContentSizeChange={() => this.scrollToEnd()}
                    onRefresh={this.loadMore}
                    refreshing={this.state.refreshing}
                />
                <ChatBox
                    action={msgAction}
                    options={{
                        scene: this.scene,
                        toAccount: this.toAccount,
                    }}
                    toast={this.toast}
                    chatListRef={constObj.chatListRef}
                />

            </View>

        )
    }
}


