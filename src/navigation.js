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

// import { HomeTab, MineTab, DetailsView, CenterView, LoginView, OnePageView, TwoPageView, VideoPage, PlaceHolderPage, FontAdapterPage, DragListItemPage } from './root';
import { AppColors, AppStyles } from './commons/styles/index';
import CustomTabComponent from './commons/components/Tab';
import { PageName, NavPages } from './root';
const TabBarText = {
    home: '首页',
    centertext: '新增',
    persnalName: "我的",
}

const TabNavigator = createBottomTabNavigator(
    {
        HomeTab: {

            screen: PageName.HomeTab,
            navigationOptions: props => {
                return RouteConfigs({
                    imgSource: require('../src/assets/imgs/homeSelect.png'),
                    label: TabBarText.home,
                    props,
                })
            },


        },
        CenterView: {
            screen: PageName.CenterView,
            navigationOptions: props => {
                return RouteConfigs({
                    imgSource: require('../src/assets/imgs/homeSelect.png'),
                    label: TabBarText.centertext,
                    props,
                })
            },


        },
        MineTab: {
            screen: PageName.MineTab,
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



const stackPageNavigationOptions = (props, boolBack) => {
    return headerOptions({
        ...props,
        ...{
            back: boolBack,
        },
    })
}

const Pages = {
    Root: {
        screen: TabNavigator,
    },
    DetailsView: {
        screen: PageName.DetailsView,
        navigationOptions: stackPageNavigationOptions
    },
    OnePageView: {
        screen: PageName.OnePageView,
        navigationOptions: stackPageNavigationOptions
    },
    TwoPageView: {
        screen: PageName.TwoPageView,
        navigationOptions: stackPageNavigationOptions
    },
    VideoPage: {
        screen: PageName.VideoPage,
        navigationOptions: stackPageNavigationOptions
    },
    PlaceHolderPage: {
        screen: PageName.PlaceHolderPage,
        navigationOptions: stackPageNavigationOptions
    },
    FontAdapterPage: {
        screen: PageName.FontAdapterPage,
        navigationOptions: stackPageNavigationOptions
    },
    DragListItemPage: {
        screen: PageName.DragListItemPage,
        navigationOptions: stackPageNavigationOptions
    },
    TableView: {
        screen: PageName.TableView,
        navigationOptions: stackPageNavigationOptions

    },
    DropDownView: {
        screen: PageName.DropDownView,
        navigationOptions: stackPageNavigationOptions

    },
    CusListView: {
        screen: PageName.CusListView,
        navigationOptions: stackPageNavigationOptions

    },
    DetailListView: {
        screen: PageName.DetailListView,
        navigationOptions: stackPageNavigationOptions

    }

}

const stackNavigators = createStackNavigator(Pages,

    {

        // navigationOptions: ({ navigation } = 0) => {
        //     return {
        //       headerStyle: {
        //         backgroundColor: AppColors.themecolor,
        //         borderBottomWidth: 0,
        //       },
        //       headerTitleStyle: {
        //         color: '#ffffff',
        //         alignSelf: 'center',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       },
        //       headerTintColor: '#ffffff',
        //       headerBackTitle: null,
        //       gesturesEnabled: false,
        //     };
        //   },


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

// stackNavigators.navigationOptions = (props) => {
//     return headerOptions({
//         ...props,
//         ...{
//             back: false,

//         },
//     })
// };

const SwitchNavigator = createSwitchNavigator(
    {
        Login: PageName.LoginView,
        App: stackNavigators,
    },
    {
        initialRouteName: 'Login',
    }
);


const AppContainer = createAppContainer(SwitchNavigator);


export default AppContainer;