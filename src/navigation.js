import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Easing, Animated } from 'react-native';
import {
    // TabNavigator,
    StackNavigator,
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    getActiveChildNavigationOptions,
    createSwitchNavigator,
    // createMaterialTopTabNavigator,
} from 'react-navigation';
import { headerOptions, RouteConfigs, } from './commons/components/navConfig';

import { HomeTab, MineTab, DetailsView, CenterView, LoginView ,OnePageView,TwoPageView} from './root';
import { AppColors, AppStyles } from './commons/styles/index';
import CustomTabComponent from './commons/components/Tab';
const TabBarText = {
    home: '首页',
    centertext: '新增',
    persnalName: "我的",
}

const TabNavigator = createBottomTabNavigator(
    {
        Home: {

            screen: HomeTab,
            navigationOptions: props => {
                return RouteConfigs({
                    imgSource: require('../src/assets/imgs/homeSelect.png'),
                    label: TabBarText.home,
                    props,
                })
            },


        },
        Center: {
            screen: CenterView,
            navigationOptions: props => {
                return RouteConfigs({
                    imgSource: require('../src/assets/imgs/homeSelect.png'),
                    label: TabBarText.centertext,
                    props,
                })
            },


        },
        Mine: {
            screen: MineTab,
            navigationOptions: props => {
                return RouteConfigs({
                    imgSource: require('../src/assets/imgs/homeSelect.png'),
                    label: TabBarText.persnalName,
                    props,
                })
            },

        },
    },

    {
        tabBarComponent: props => <CustomTabComponent {...props} />,
        tabBarOptions: {
            showIcon: true,
            activeTintColor: AppColors.themecolor,
            inactiveTintColor: '#979797',
            labelStyle: {
                fontSize: 12 // 文字大小
            }
        }
    }

);


//此处为每个tab页面可进行设置标题栏相关内容
TabNavigator.navigationOptions = ({ navigation, screenProps }) => {
    const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
    return {
        headerTitle: childOptions.headerTitle,
        headerLeft: childOptions.headerLeft,
        headerRight: childOptions.headerRight,
        headerStyle: AppStyles.NavTopStyle,
        headerTitleStyle: AppStyles.NavTopTitleStyle,
        header: childOptions.header,
    }
}

const stackNavigators = createStackNavigator(
    {
        Root: {
            screen: TabNavigator,

        },
        DetailsView: {
            screen: DetailsView,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    ...{
                        back: true,
                    },
                })
            },
        },
        OnePageView: {
            screen: OnePageView,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    ...{
                        back: true,
                    },
                })
            },
        },
        TwoPageView: {
            screen: TwoPageView,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    ...{
                        back: true,
                    },
                })
            },
        },
    },
    {
        //         // defaultNavigationOptions: ({ navigation }) => {

        //         //     return {
        //         //         ...defaultHeaderOpts,
        //         //         gesturesEnabled: true,
        //         //         headerBackTitle: '',
        //         //         // headerTitle: '',
        //         //         headerBackImage: HeaderBackImage
        //         //     };
        //         // },
        initialRouteName: 'Root',
        mode: 'card',
        headerMode: "screen",
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;
                const Width = layout.initWidth;
                //沿X轴平移
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [Width, 0, -(Width - 10)],
                });
                //透明度
                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });
                return { opacity, transform: [{ translateX }] };
            }
        })



    }
);


const SwitchNavigator = createSwitchNavigator(
    {
        Login: LoginView,
        App: stackNavigators,
    },
    {
        initialRouteName: 'Login',
    }
);


const AppContainer = createAppContainer(SwitchNavigator);


export default AppContainer;