import { observable, action } from 'mobx';
import nimStore from './nimStore';
import constObj from './constant';

class UserInfo {
  @observable nimStore

  @action
  getUserInfo = (account, callback) => {
    if (constObj.nim) {
      constObj.nim.getUser({
        account,
        sync: true,
        done: (error, user) => {
          if (!error) {
            const userInfo = nimStore.userInfos[account];
            if (userInfo) {
              nimStore.userInfos[account] = Object.assign(userInfo, user);
            } else {
              nimStore.userInfos[account] = user;
            }
            if (callback instanceof Function) {
              callback(nimStore.userInfos[account]);
            }
          }
        },
      });
    }
  }
}

const userInfo = new UserInfo();
export default userInfo;