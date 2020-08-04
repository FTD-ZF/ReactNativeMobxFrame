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
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Toast } from 'teaset';

export default class Tab extends Component {




    renderItem = (route, index) => {
        // console.log(index);
        const {
            navigation,
            jumpTo,
            labelStyle,
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
                onPress={() => this.onTabPress(route.key)}>
                <View
                    style={styles.tabItem}>
                    <View>
                        {this.props.showIcon ? this.props.renderIcon(TabScene) : null}
                        {index == 2 ? <View style={{
                            backgroundColor: 'red',
                            width: 8, height: 8, borderRadius: 8, position: 'absolute', right: 0, top: 0
                        }} /> : <View />}
                    </View>

                    <Text style={[{ ...styles.tabText, color }, labelStyle]}>{this.props.getLabelText(TabScene)}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    //底部tab切换
    onTabPress(tabKey) {
        const { navigation, jumpTo } = this.props;
        Toast.message('tab的key===' + tabKey)
        jumpTo(tabKey);
    }

    render() {
        // console.log(this.props);
        const { navigation, jumpTo, labelStyle } = this.props;
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
                onPress={() => this.onTabPress(routes[1].key)}>
                <View
                    style={{
                        width: 80, height: 85, borderRadius: 50, backgroundColor: 'white',
                        justifyContent: 'center', alignItems: 'center',
                        bottom: Platform.OS == 'ios' ? (isIphoneX() ? 10 : 0) : 0,
                    }}>
                    {this.props.showIcon ? this.props.renderIcon(TabScene) : null}
                    <Text style={[{ ...styles.tabText, color }, labelStyle]}>{this.props.getLabelText(TabScene)}</Text>
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
