/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, BackHandler } from 'react-native';
import Navigator from './src/navigation';
import { Toast } from 'teaset';
import { Provider } from 'mobx-react';
import rootStore from './src/mobx/index';
import NavigationService from './src/commons/components/navigationService';


export default class App extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
  }

  componentUnWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
  }


  _onBackAndroid = () => {

    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      BackHandler.exitApp();
    }

    this.lastBackPressed = Date.now();

    Toast.message('再按一次退出应用');
    return true;

  }


  _getRef(ref) {
    NavigationService.setNavigator(ref);
  }


  render() {
    return (
      <Provider rootStore={rootStore}>
        <Navigator
          ref={(ref) => this._getRef(ref)}
          onNavigationStateChange={(prevState, newState, action) => {
            console.log(newState);
            if (newState.routes[1].routes.length > 1) {
              BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
            } else {
              BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
            }
          }}
        />
      </Provider>

    );
  }
}

