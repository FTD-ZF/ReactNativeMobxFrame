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
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    PixelRatio,
    StatusBar,
} from 'react-native';

import { AppStyles, AppColors } from '../../commons/styles';
import { Toast } from 'teaset';
// import testStore from '../../mobx/testStore';
import { observer, inject } from "mobx-react";
import NavigationService from '../../commons/components/navigationService';
import ActionButton from 'react-native-action-button';
import EZSwiper from 'react-native-ezswiper';
const { height, width } = Dimensions.get('window');
import Carousel from 'react-native-anchor-carousel';
// import CountDownTimer from 'react_native_countdowntimer'
import CountDownReact from '../../commons/components/CountDownReact';
// import SDCountDownTimeLabel from '../../commons/components/SDCountDownTimeLabel';

// const {width} = Dimensions.get('window');
import * as Progress from 'react-native-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import SDCountDownTimeLabel from './SDCountDownTimeLabel';
import CusProgress from '../../commons/components/CusProgress';
import { NavPages } from '../../root';
import BaseComponent from './BaseComponent';
// import ProgressBar from 'react-native-progress-bar';


@inject('rootStore')
@observer
export default class Index extends BaseComponent {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '首页',
        headerLeft: (
            <TouchableOpacity onPress={() => { navigation.state.params.showToast() }}>
                <Text>左边点击</Text>
            </TouchableOpacity>

        ),
        headerRight: (<View />)

    });


    // 构造
    constructor(props) {
        super(props);

        this.timeid = '1';
        this.testStore = this.props.rootStore.testStore;
        // 初始状态
        this.state = {

            running: true,
            endtime: 3,
            content: '',
            progressWidth: 80,
            pronum: 1,
            f_endTime: '2019-07-19 18:27:30'
        };
        // StatusBar.setTranslucent(true);
        // StatusBar.setBackgroundColor(AppColors.backgroundColor)
        // StatusBar.setBarStyle('light-content');

    }

    componentWillMount() {

        this.getNavProps().setParams({
            showToast: () => this._showToast(),
            torefresh: (str) => this._toRefresh(str),
        });



    }


    componentUnWillMount() {

    }

    componentDidMount() {
        // this.testStore.getListData();
        Toast.message('' + StatusBar.currentHeight)
    }

    _showToast() {
        Toast.message('看下效果');
    }

    _todetails() {

        NavigationService.navigate(NavPages.DetailsView, {
            headername: '详情',
            callback: (str) => this.getNavParams().torefresh(str),
        });
        // this.setState({ f_endTime: '2019-07-19 16:49:00' })
    }



    _toRefresh(str) {
        this.setState({
            content: str,
        });
    }





    onFinish() {

        this.timeid = '2'
        this.setState({
            endtime: 30,
        });

    }



    formatTimeInterval(timestamp) {
        let time_interval = parseInt(timestamp);
        let timeinterval = Math.floor(time_interval);
        let formatTimeStr = moment(timeinterval).format("YYYY-MM-DD HH:mm:ss");
        return formatTimeStr;
    }
    render() {

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'dark-content'} backgroundColor='transparent' translucent={true} />

                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,
                    }} onPress={() => this._todetails()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击进入详情
                    </Text>
                </TouchableOpacity>


                <Text style={{ marginTop: 5 }}>
                    详情通知来了：{this.state.content}
                </Text>

                <Text>{this.testStore.textname}</Text>



                {/* <CountDownTimer
                    //date={new Date(parseInt(endTime))}
                    date="2017-11-28T00:00:00+00:00"
                    days={{ plural: 'Days ', singular: 'day ' }}
                    hours=':'
                    mins=':'
                    segs=''

                    daysStyle={styles.time}
                    hoursStyle={styles.time}
                    minsStyle={styles.time}
                    secsStyle={styles.time}
                    firstColonStyle={styles.colon}
                    secondColonStyle={styles.colon}
                /> */}

                {/* <CountDownReact
                    // date={this.state.f_endTime}
                    date="2019-10-28T00:00:00+00:00"
                    days={{ plural: 'Days ', singular: 'day ' }}
                    hours=':'
                    mins=':'
                    segs=''

                    daysStyle={styles.time}
                    hoursStyle={styles.time}
                    minsStyle={styles.time}
                    secsStyle={styles.time}
                    firstColonStyle={styles.colon}
                    secondColonStyle={styles.colon}
                /> */}
                {/* <SDCountDownTimeLabel
                    finalTime={this.state.f_endTime}
                    separatorStyle={{ color: 'red' }}
                    deviation={1}
                    timeOutFunction={() => {
                        // let f_endTime = this.formatTimeInterval('2019-07-19 16:45:00' + "");
                        // this.setState({f_endTime:'2019-07-19 16:46:00'})
                        // let isHas = UserInfo().checkoutWebSocketList(this.shop_tag + "");
                        // if (isHas) {
                        //     let newTime = new Date() / 1;
                        //     let randTime = (Math.round(Math.random() * 5) + 4) * 1000;
                        //     newTime = newTime + randTime;
                        //     let f_endTime = formatTimeInterval(newTime + "");
                        //     this.setState({
                        //         f_endTime: f_endTime,
                        //     })
                        // }
                    }} /> */}
                {/* <CountDown
                    id={this.timeid}
                    size={12}
                    until={this.state.endtime}
                    onFinish={() => this.onFinish()}
                  
                    digitStyle={{ backgroundColor: 'black', borderWidth: 4, }}
                    digitTxtStyle={{ color: 'white', fontSize: 14 }}
                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                    separatorStyle={{ color: 'black' }}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                /> */}



            </View>
        );
    }


    formatTimeInterval(timestamp) {
        let time_interval = parseInt(timestamp);
        let timeinterval = Math.floor(time_interval);
        let formatTimeStr = moment(timeinterval).format("YYYY-MM-DD HH:mm:ss");
        return formatTimeStr;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 5,
        backgroundColor: AppColors.dark9,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    swiper: {
        backgroundColor: 'white',
    },
    cell: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselContainer: {
        height: 200,
        width: width,
        borderWidth: 5,
        borderColor: 'white',
    },
    carousel: {
        flex: 1,
        backgroundColor: 'orange'
    },
    item: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 100,
        fontWeight: 'bold'
    },
    time: {
        paddingHorizontal: 3,
        backgroundColor: 'rgba(85, 85, 85, 1)',
        fontSize: 12,
        color: 'white',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    //冒号
    colon: {
        fontSize: 12, color: 'rgba(85, 85, 85, 1)'
    },
});
