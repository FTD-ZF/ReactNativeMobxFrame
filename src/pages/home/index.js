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
    Dimensions
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
// import ProgressBar from 'react-native-progress-bar';


const data = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue' },
    { backgroundColor: 'yellow' },
    { backgroundColor: 'black' },
    { backgroundColor: 'blue' }
];

@inject('rootStore')
@observer
export default class Index extends Component {
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
        this.timeid = '1',
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
    }

    componentWillMount() {

        this.props.navigation.setParams({
            showToast: () => this._showToast(),
            torefresh: (str) => this._toRefresh(str),
        });



    }

    componentUnWillMount() {

    }

    componentDidMount() {
        // this.testStore.getListData();
    }

    _showToast() {
        Toast.message('看下效果');
    }

    _todetails() {

        // NavigationService.navigate('DetailsView', {
        //     headername: '详情',
        //     callback: (str) => this.props.navigation.state.params.torefresh(str),
        // });
        this.setState({ f_endTime: '2019-07-19 16:49:00' })
    }



    _toRefresh(str) {
        this.setState({
            content: str,
        });
    }

    renderRow(obj, index) {
        return (
            <View style={[styles.cell, { backgroundColor: index % 2 === 0 ? 'red' : 'yellow' }]}>
                <Text>{obj}</Text>
            </View>
        )
    }
    onPressRow(obj, index) {
        console.log('onPressRow=>obj:' + obj + ' ,index:' + index);
        alert('onPressRow=>obj:' + obj + ' ,index:' + index);
    }


    renderItem = ({ item, index }) => {
        const { backgroundColor } = item;
        return (
            <TouchableOpacity
                style={[styles.item, { backgroundColor }]}
                onPress={() => {
                    this._carousel.scrollToIndex(index);
                }}
            >
                <Text style={styles.text}>{index.toString()}</Text>
            </TouchableOpacity>
        );
    };

    onCountPress() {
        // Toast.message('ss')
        this.setState({
            endtime: 4,

        })
    }

    onChangeTime(data) {
        console.log(data)
        // if (data == 1) {
        //     this.setState({
        //         endtime: 4,
        //         timeid:'2'
        //     })
        // }
    }

    onFinish() {

        this.timeid = '2'
        this.setState({
            endtime: 30,
        });

    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        // this.setState({
        //   until: nextProps.until,
        // });
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


                <Text style={{ marginTop: 15 }}>
                    {this.testStore.listdata}
                </Text>

                {/* 总数100，当前75 */}
                {/* <View style={{ width: 150, height: 40, backgroundColor: 'white', borderWidth: 1, 
                borderColor: 'red', borderRadius: 75 ,flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: (this.state.pronum/ 100) * 150, height: 40, backgroundColor: 'red', borderRadius: ((this.state.pronum / 100) * 150) / 2, position: 'absolute' }}  >

                      

                    </View>
                   
                            <Text>ss</Text>
                            <Text>99</Text>
                        
                </View> */}
                {/* <Progress.Bar progress={0.3} width={200} height={40} style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text>ss</Text>
                    <Text>99</Text>
                </Progress.Bar> */}
                {/* 每次打包时，修改node_modules包中，react-native-progrese下Bar.js文件中，第145行的progressStyle中加borderRadius即可 */}
                <View style={{ backgroundColor: '#f6a7ab', width: 130, borderRadius: 20 }}>
                    <Progress.Bar progress={0.6} width={130} height={20} borderRadius={20}
                        borderColor={'red'} borderWidth={0} color={'red'}

                    >
                        <View style={{
                            alignItems: 'center', width: 130, flexDirection: 'row',
                            paddingHorizontal: 5, height: 20, justifyContent: 'space-between', position: 'absolute'
                        }}>
                            <Text>ss</Text>
                            <Text>000</Text>
                        </View>
                    </Progress.Bar>

                </View>

                <View style={{ marginVertical: 30 }}>
                    <CusProgress progress={0.6227} />
                    <View style={{
                        alignItems: 'center', width: 130, flexDirection: 'row', paddingHorizontal: 8,
                        height: 20, justifyContent: 'space-between', position: 'absolute'
                    }}>
                        <Text style={{ color: 'white', fontSize: 10 }}>已抢22件</Text>
                        <Text style={{ color: 'white', fontSize: 10}}>23%</Text>
                    </View>
                </View>


                {/* <View style={{ width: 150, backgroundColor: 'blue', borderRadius: 75, }}>



                    <ProgressBarAnimated
                        // underlyingColor={'red'}
                        borderRadius={75}
                        borderColor={'red'}
                        width={150}
                        height={35}
                        value={4}

                        backgroundColor="red"
                    // underlyingColor='blue'
                    // backgroundColorOnComplete='blue'
                    />


                    <View style={{
                        alignItems: 'center', width: 150, flexDirection: 'row', paddingHorizontal: 5,
                        height: 40, justifyContent: 'space-between', position: 'absolute'
                    }}>
                        <Text style={{ color: 'black' }}>ss</Text>
                        <Text>99</Text>
                    </View>

                </View> */}
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
                <SDCountDownTimeLabel
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
                    }} />
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
                {/* <EZSwiper style={[styles.swiper, { width: width - 100, height: 150, marginHorizontal: 50 }]}
                    dataSource={['0', '1', '2', '3', '4']}
                    width={width - 100}
                    height={150}
                    renderRow={this.renderRow}
                    onPress={this.onPressRow}
                    ratio={0.867}
                    loop={false}
                    index={2}
                /> */}
                {/* <Carousel style={styles.carousel}
                    data={data}
                    renderItem={this.renderItem}
                    itemWidth={(width-20-20)/4}
                    containerWidth={width - 40}
                    separatorWidth={10}
                    ref={(c) => {
                        this._carousel = c;
                    }}
                //pagingEnable={false}
                /> */}
                {/* <ActionButton
                    buttonColor="transparent"
                    onPress={() => { console.log("hi") }}
                    renderIcon={() => (<Image style={{ width: 40, height: 40 }} source={require('../../assets/imgs/icon_home_choujiang.png')} />)}
                /> */}

                {/* <View style={{ marginTop: 10 }}>
                    <Text>{moment().format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text>{(moment('2019-06-12').format('X') - moment('2019-06-11').format('X'))}</Text>
                    <Text>{moment('2019-06-12 00:01:00', "YYYY-MM-DD HH:mm:ss").valueOf()}</Text>
                    <Text>{moment('2019-06-12 00:00:00', "YYYY-MM-DD HH:mm:ss").valueOf()}</Text>
                    <Text>{(moment('2019-06-12 00:01:00', "YYYY-MM-DD HH:mm:ss").valueOf() - moment('2019-06-12 00:00:00', "YYYY-MM-DD HH:mm:ss").valueOf()) / 1000}</Text>
                </View> */}

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
