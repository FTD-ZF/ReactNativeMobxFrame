import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    ImageBackground,
    DeviceEventEmitter
} from 'react-native';
import { AppStyles, AppColors } from '../styles';
import { isIphoneX } from 'react-native-iphone-x-helper'

export default class Tab extends Component {
    renderItem = (route, index) => {
        // console.log(index);
        const {
            navigation,
            jumpTo,
        } = this.props;

        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };

        if (index == 1) {
            return (<View
                key={route.key}
                style={[styles.tabItem, { backgroundColor: 'transparent' }]}>

            </View>
            );
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={route.key}
                style={styles.tabItem}
                onPress={() => jumpTo(route.key)}>
                <View
                    style={styles.tabItem}>
                    {this.props.renderIcon(TabScene)}
                    <Text style={{ ...styles.tabText, color }}>{this.props.getLabelText(TabScene)}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        // console.log(this.props);
        const { navigation, jumpTo } = this.props;
        const { routes, } = navigation.state;
        const focused = 1 === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: routes[1],
            tintColor: color
        };
        return (<View
            pointerEvents={"box-none"}//此组件不接收点击事件 子组件可以点击
            style={{ width: AppStyles.screen_width }}>
            <View style={styles.tab}>
                {routes && routes.map((route, index) => this.renderItem(route, index))}
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                // key={"centerView"}
                style={[styles.tabItem, {
                    position: 'absolute', bottom: 0,
                    left: (AppStyles.screen_width / 2) - 40, right: 0,
                    height: Platform.OS == 'ios' ? (isIphoneX() ? 100 : 80) : 80
                }]}
                onPress={() => jumpTo(routes[1].key)}>
                <View
                    style={{
                        width: 80, height: 85, borderRadius: 50, backgroundColor: 'white',
                        justifyContent: 'center', alignItems: 'center',
                        bottom: Platform.OS == 'ios' ? (isIphoneX() ? 10 : 0) : 0,
                    }}>
                    {this.props.renderIcon(TabScene)}
                    <Text style={{ ...styles.tabText, color }}>{this.props.getLabelText(TabScene)}</Text>
                </View>
            </TouchableOpacity>
        </View>);
    }
}
const styles = {
    tab: {
        width: AppStyles.screen_width,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    tabItem: {
        height: Platform.OS == 'ios' ? (isIphoneX() ? 80 : 60) : 60,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        marginTop: Platform.OS == 'ios' ? 6 : 2,
        fontSize: 12,
        color: AppColors.dark6
    },
    tabTextChoose: {
        color: AppColors.themecolor
    },
    tabImage: {
        width: 42,
        height: 42,
    },
}
