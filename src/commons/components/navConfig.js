import React from 'react';
import { View, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { AppColors, AppStyles } from '../styles/index';

const activeTabColor = '#38ADFF';// 底部文字和图片选中颜色
const defaultTabColor = '#949494';//文字和图片未选中颜色

const headerOptions = props => {
    const { navigation, navigationOptions, visible = true, back = true, right = false, onRightPress } = props
    const { goBack } = navigation
    const headerLeft = back ? (
        <TouchableOpacity onPress={() => goBack(null)}>
            <Image source={require('../../assets/imgs/arrow.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

    ) : (<View />)
    const headerRight = right ? (

        <Text style={{ color: AppColors.dark3, marginRight: 10 }}>分享</Text>

    ) : (<View />)

    const header = visible === false ? null : undefined
    const headerTitle = '标题名称'

    return {
        headerTitle,
        headerLeft,
        headerRight,
        header,
        headerTitleStyle: AppStyles.NavTopTitleStyle,
        headerStyle: AppStyles.NavTopStyle,
        ...navigationOptions,
    }
}

const RouteConfigs = options => {
    const { label = null, imgSource, props } = options
    return {
        // ...headerOptions(props),
        tabBarLabel: label,
        tabBarIcon: ({ tintColor, focused }) => (<Image source={imgSource} style={{ width: 25, height: 25, tintColor: tintColor }} />),
    }
}

//TabBar
// const TabNavigatorConfig = options => {
//     const {
//         initialRouteName: InitialRouteName = "",
//         tabBarPosition: TabBarPosition = "bottom",
//         swipeEnabled: SwipeEnabled = false,
//         scrollEnabled: ScrollEnabled = false,
//         animationEnabled: AnimationEnabled = false,
//         showIcon: ShowIcon = true,
//     } = options

//     return {
//         initialRouteName: InitialRouteName,
//         tabBarPosition: TabBarPosition,
//         swipeEnabled: SwipeEnabled,
//         scrollEnabled: ScrollEnabled,
//         animationEnabled: AnimationEnabled,
//         backBehavior: "none",
//         lazy: true,
//         tabBarOptions: {
//             labelStyle: {
//                 margin: 0,
//                 padding: 0,
//                 fontSize: 12,
//             },
//             style: AppStyles.NavBottomStyle,
//             pressColor: "#e5e5e5",
//             pressOpacity: 0.3,
//             indicatorStyle: {
//                 height: 0,
//             },
//             inactiveTintColor: defaultTabColor,
//             activeTintColor: activeTabColor,
//             showLabel: true,
//             showIcon: ShowIcon,//控制是否显示icon
//             upperCaseLabel: false,
//         },
//     }
// }

// const StackNavigatorConfig = options => {
//     const { initialRouteName: InitialRouteName = "" } = options
//     return {
//         initialRouteName: InitialRouteName,
//         mode: "card", // 页面跳转方式 card - 原生系统默认的的跳转;modal - 只针对iOS平台，模态跳转
//         headerMode: "screen", // float - 渐变，类似iOS的原生效果;screen - 标题与屏幕一起淡入淡出;none - 没有动画
//         cardStyle: { backgroundColor: "#F5FCFF" }, // 为各个页面设置统一的样式，比如背景色，字体大小等
//         transitionConfig: () => ({
//             // 配置页面跳转的动画，覆盖默认的动画效果
//             screenInterpolator: StackViewStyleInterpolator.forHorizontal,
//         }),
//     }
// }

module.exports = {
    headerOptions,
    RouteConfigs,
    // TabNavigatorConfig,
    // StackNavigatorConfig,
}
