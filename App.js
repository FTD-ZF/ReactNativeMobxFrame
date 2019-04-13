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
import store from './src/mobx/index';

export default class App extends Component {

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
  }

  componentUnWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
  }


  _onBackAndroid = () => {

    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      BackHandler.exitApp();
      return false;
    }

    this.lastBackPressed = Date.now();

    Toast.message('再按一次退出应用');
    return true;

  }




  render() {
    return (
      <Provider rootStore={store}>
        <Navigator />
      </Provider>

    );
  }
}

