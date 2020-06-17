import { observable, action, set, configure } from 'mobx';
import { AsyncStorage, Alert, NetInfo } from 'react-native';
// import configs from '../../configs';
import constObj from './chatConstant';

// import globalStatus from '../stores/status';
import util from '../../commons/chatUtils';
import { showNotification } from '../../../nim/NIM_Android_Push';
import nimStore from './nimStore';
import msgAction from './msgAction';
import SDK from '../../../nim/NIM_Web_SDK_rn_v7.2.0';
import Realm from 'realm';
import { IMAppkey } from '../../configs';
// const Realm = require('realm');
// const RNFS = require('react-native-fs')

const iosPushConfig = {
    tokenName: 'push_online',
};
const androidPushConfig = {
    xmAppId: '',
    xmAppKey: '',
    xmCertificateName: 'RN_MI_PUSH',
    hwAppId: '',
    hwCertificateName: 'RN_HW_PUSH',
    mzAppId: '',
    mzAppKey: '',
    mzCertificateName: 'RN_MZ_PUSH',
    fcmCertificateName: 'RN_FCM_PUSH',
    vivoCertificateName: "RN_VIVO_PUSH",
    oppoAppId: "",
    oppoAppKey: "",
    oppoAppSercet: "",
    oppoCertificateName: "RN_OPPO_PUSH"
};

SDK.usePlugin({
    db: Realm,
});
// SDK.usePlugin({
//   rnfs: RNFS,
// });
function onTeam(teams) {
    if (!Array.isArray(teams)) {
        teams = [teams];
    }
    teams.forEach((team) => {
        if (team.validToCurrentUser === undefined) {
            team.validToCurrentUser = true;
        }
    });
    nimStore.teamlist = constObj.nim.mergeTeams(nimStore.teamlist, teams);
    nimStore.teamlist = constObj.nim.cutTeams(nimStore.teamlist, teams.invalid);
}

function saveMsgs() {
    // msgs.forEach((msg) => {
    //   msgAction.appendMsg(msg);
    // });
}

function onSysMsgs(sysmsgs) {
    if (!Array.isArray(sysmsgs)) {
        sysmsgs = [sysmsgs];
    }
    sysmsgs.forEach((sysmsg) => {
        switch (sysmsg.type) {
            // 在其他端添加或删除好友
            case 'addFriend':
                // set(nimStore.friendFlags, sysmsg.from, true);
                if (sysmsg.friend) {
                    nimStore.friendslist = constObj.nim.mergeFriends(nimStore.friendslist, [sysmsg.friend]);
                    nimStore.friendFlags.set(sysmsg.from, true);
                }
                nimStore.sysMsgs.push(sysmsg);
                break;
            case 'applyFriend':
                nimStore.sysMsgs = constObj.nim.mergeSysMsgs(nimStore.sysMsgs, [sysmsg]);
                nimStore.sysMsgs = nimStore.sysMsgs.sort((a, b) => a.time - b.time);
                break;
            case 'deleteFriend':
                // set(nimStore.friendFlags, sysmsg.from, false);
                nimStore.friendFlags.delete(sysmsg.from);
                nimStore.sysMsgs.push(sysmsg);
                break;
            // 对方消息撤回
            case 'deleteMsg':
                msgAction.onBackoutMsg(null, sysmsg.msg);
                break;
            case 'teamInvite': // 被邀请入群
            case 'applyTeam': // 申请入群
            case 'rejectTeamApply': // 申请入群被拒绝
            case 'rejectTeamInvite': // 拒绝入群邀请
                break;
            default:
                break;
        }
    });
    // nimStore.sysMsgs = nimStore.sysMsgs.concat(sysmsgs);
}

class LinkStore {
    @observable nimStore

    @action
    onSession = (session) => {
        nimStore.sessionlist = constObj.nim.mergeSessions(nimStore.sessionlist, session)
            .sort((a, b) => {
                const time1 = a.lastMsg ? a.lastMsg.time : a.updateTime;
                const time2 = b.lastMsg ? b.lastMsg.time : b.updateTime;
                return time2 - time1;
            });
    }

    @action
    initNIM = (account, token, callback) => {
        const self = this;
        constObj.nim = SDK.NIM.getInstance({
            // debug: true,
            appKey: IMAppkey,
            account,
            token,
            db: true,
            syncSessionUnread: true,
            iosPushConfig,
            androidPushConfig,
            onwillreconnect() {
            },
            ondisconnect(event) {
                console.log('ondisconnect==============')
                console.log(event)
                AsyncStorage.removeItem('isLogin');
                let tipMsg = util.parseDisconnectMsg(event);
                NetInfo.isConnected.fetch().then((isConnected) => {
                    if (!isConnected) {
                        tipMsg = '断网情况退出';
                    }
                    // Alert.alert('提示', tipMsg, [
                    //     { text: '确认' },
                    // ]);
                });
                self.destroyNIM().then(() => {
                    // callback(event);
                });
            },
            onconnect() {
                nimStore.userID = account;
                callback(null);
            },
            onerror(event, obj) {
                console.log('IM error:', event, obj);
                // self.destroyNIM();
                // callback(event);
            },
            onsyncdone() {
                // Alert.alert('提示', '账号及离线消息同步完成');
                console.log('账号及离线消息同步完成')
            },
            onmyinfo(info) {
                console.log('===== onmyinfo(info)======')
                console.log(info)
                set(nimStore, 'myInfo', Object.assign(nimStore.myInfo, info));
            },
            onupdatemyinfo(info) {
                console.log('===== onupdatemyinfo(info)======')
                console.log(info)
                set(nimStore, 'myInfo', Object.assign(nimStore.myInfo, info));
                // nimStore.myInfo = Object.assign(nimStore.myInfo, info);
            },
            onusers(users) {
                if (!Array.isArray(users)) {
                    users = [users];
                }
                users.forEach((user) => {
                    const tempAccount = user.account;
                    if (tempAccount) {
                        const userInfo = nimStore.userInfos[tempAccount];
                        if (userInfo) {
                            nimStore.userInfos[tempAccount] = Object.assign(userInfo, user);
                        } else {
                            nimStore.userInfos[tempAccount] = user;
                        }
                    }
                });
            },
            onupdateuser(user) {
                console.log('======onupdateuser(user)=======')
                console.log(user)
                if (nimStore.userInfos[user.account]) {
                    nimStore.userInfos[user.account] = Object.assign(nimStore.userInfos[user.account], user);
                } else {
                    nimStore.userInfos[user.account] = user;
                }
            },
            onfriends(friends) {
                friends.forEach((item) => {
                    // set(nimStore.friendFlags, item.account, true);
                    nimStore.friendFlags.set(item.account, true);
                    const tempAccount = item.account;
                    if (tempAccount) {
                        const userInfo = nimStore.userInfos[tempAccount];
                        if (userInfo) {
                            nimStore.userInfos[tempAccount] = Object.assign(userInfo, item);
                        } else {
                            nimStore.userInfos[tempAccount] = item;
                        }
                    }
                });
                friends = friends.map((item) => {
                    if (typeof item.isFriend !== 'boolean') {
                        item.isFriend = true;
                    }
                    return item;
                });
                nimStore.friendslist = constObj.nim.mergeFriends(nimStore.friendslist, friends);
                nimStore.friendslist = constObj.nim.cutFriends(nimStore.friendslist, friends.invalid);
            },
            onmsg(msg) {
                console.log('=============  onmsg(msg)========')
                console.log(msg)
                if (nimStore.currentSessionId === msg.sessionId) {
                    // nimStore.currentSessionMsgs.push(msg);
                    nimStore.currentSessionMsgs = nimStore.currentSessionMsgs.concat([msg]);
                    // set(nimStore, 'currentSessionMsgs', nimStore.currentSessionMsgs.concat([msg]));
                    constObj.nim.sendMsgReceipt({
                        msg,
                        done: function sendMsgReceiptDone(error) {
                            // do something
                            console.log(error);
                        },
                    });
                }
                if (global.ISANDROID) {
                    let showText = '';
                    if (msg.type === 'text') {
                        showText = msg.text;
                    } else {
                        showText = util.mapMsgType(msg);
                    }
                    showNotification({
                        icon: '', title: msg.from, content: showText, time: `${msg.time}`,
                    });
                }
            },
            onroamingmsgs: saveMsgs.bind(this),
            onofflinemsgs: saveMsgs.bind(this),
            onsessions: this.onSession,
            onupdatesession: this.onSession,
            onteams: onTeam,
            onupdateteam: onTeam,
            // 系统通知
            onsysmsg: onSysMsgs,
            onofflinesysmsgs: onSysMsgs,
            onupdatesysmsg: onSysMsgs, // 通过、拒绝好友申请会收到此回调
        });
    }

    @action
    destroyNIM = () => new Promise((resolve, reject) => {
        if (constObj.nim) {
            constObj.nim.destroy({
                done(error) {
                    constObj.nim = null;
                    nimStore.reset();
                    //   globalStatus.reset();
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                },
            });
        } else {
            resolve();
        }
    })

    @action
    login = (account, token, callback) => {
        this.initNIM(account, token, callback);
    }

    @action
    logout = () => {
        if (constObj.nim) {
            constObj.nim.logout({
                done(error) {
                    if (error) {
                        console.log('=====loginout===error======');
                        console.log(error);
                    }
                    // constObj.nim.disconnect()
                    // AsyncStorage.removeItem('account');
                    // AsyncStorage.removeItem('password');
                },
            });
        }
    }
}

const linkStore = new LinkStore();
export default linkStore;