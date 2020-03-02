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
    TouchableOpacity,
    Slider,
    Dimensions,
    ScrollView,
    PixelRatio,
    UIManager,
    findNodeHandle,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';

import AppStyles from '../../../commons/styles/styles';

import AppColors from '../../../commons/styles/colors';
import DragSortableView from 'react-native-drag-sort';
import { screen, dFont, aWidth, aHeight, } from '../../../commons/utils/screenUtils';
import Swipeout from 'react-native-swipeout';
import { Toast, PullView, Overlay, Drawer } from 'teaset';
import DropDownItem from '../../../commons/components/DropDownItem';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { FormatTime } from '../../../commons/utils/FormatTime';

export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '筛选',
    });


    constructor(props) {
        super(props)

        this.state = {
            firstDropData: [{ "name": '全部分类', "selected": true },
            { "name": '测试一', "selected": false },
            { "name": '测试二', "selected": false }],
            firstValue: '全部分类',
            showFirstPop: false,

            showSecondPop: false,

            showFirstCalendar: true,

            pressStartDate: {},
            strStartDate: '选择时间',
            boolStartDate: false,

            pressEndDate: {},
            strEndDate: '选择时间',
            boolEndDate: false,
            maxEndDate: '',

        }
    }

    componentDidMount() {

        LocaleConfig.locales['fr'] = {
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            today: 'Aujourd\'hui'
        };
        LocaleConfig.defaultLocale = 'fr';
    }



    _toShowFirstFlag() {

        this.setState({
            showFirstPop:!this.state.showFirstPop,
            showSecondPop: false,
            showFirstCalendar: true,
        })
    }

    _toShowSecondFlag() {
       
        this.setState({
            showSecondPop:!this.state.showSecondPop,
            showFirstPop: false,
            showFirstCalendar: true,
        })

    }



    //关闭弹窗-第一组
    _toCloseFirstPop() {
        this.setState({
            showFirstPop: false,
            showFirstCalendar: true,
        })
    }
    //关闭弹窗-第二组
    _toCloseSecondPop() {
        this.setState({
            showSecondPop: false,
            showFirstCalendar: true,
        })
    }

    _toClickFirstItem(content) {

        this.state.firstDropData.map((item, index) => {

            if (content.index == index) {
                this.state.firstDropData[index].selected = true;
            } else {
                this.state.firstDropData[index].selected = false;
            }
        })

        this.setState({
            showFirstPop: false,
            firstValue: content.item.name,
            firstDropData: this.state.firstDropData,
        })
    }

    _renderFirstDragItem(item) {
        return (
            <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this._toClickFirstItem(item)} >
                <Text style={{ color: item.item.selected ? 'red' : '#333' }} >{item.item.name}</Text>
            </TouchableOpacity>
        )
    }

    //选择开始时间
    _toChooseStartDate() {
        this.setState({
            showFirstCalendar: true,

        })
    }

    //选择结束时间
    _toChooseEndDate() {
        if (this.state.strStartDate == '选择时间') {
            Toast.message('请先选择开始时间')
            return
        }
        this.setState({
            showFirstCalendar: false,

        })
    }

    //修改开始时间
    _toChangeStartDay(date) {

        let pressStartDate = {};
        let curStyle = {
            customStyles: {
                container: {
                    backgroundColor: 'pink',
                    borderRadius: 0
                },
                text: {
                    color: 'white',
                },
            },
        }

        let key = date.dateString;

        pressStartDate[key] = curStyle;

        let nextMonthDate = FormatTime.getNextMonth(date.dateString);

        this.setState({
            boolStartDate: true,
            strStartDate: date.dateString,
            maxEndDate: nextMonthDate,
            boolEndDate: false,
            strEndDate: '选择时间',
            pressEndDate: {},
            pressStartDate
        })

        Toast.message(nextMonthDate)
    }

    //修改结束时间
    _toChangeEndDay(date) {
        let pressEndDate = {};
        let curStyle = {
            customStyles: {
                container: {
                    backgroundColor: 'pink',
                    borderRadius: 0
                },
                text: {
                    color: 'white',
                },
            },
        }

        let key = date.dateString;

        pressEndDate[key] = curStyle;


        this.setState({
            boolEndDate: true,
            strEndDate: date.dateString,
            pressEndDate
        })

    }

    render() {

        return (
            <View style={styles.container} >

                <View
                    style={{
                        flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', height: 50, width: AppStyles.screen_width
                    }} ref={(c) => this.topViewRefs = c}>

                    <TouchableOpacity
                        style={{ flex: 1, height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                        onPress={() => this._toShowFirstFlag()} >
                        <Text>{this.state.firstValue}  </Text>
                        {this.state.showFirstPop ? <Text>▲</Text> :
                            <Text>▼</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                        onPress={() => this._toShowSecondFlag()} >
                        <Text>个别分类  </Text>
                        {this.state.showSecondPop ? <Text>▲</Text> :
                            <Text>▼</Text>}
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: 'green', height: 600, width: 300 }} >

                </View>

                {/* 悬浮筛选布局-左侧*/}
                {this.state.showFirstPop ? <View
                    style={{
                        position: 'absolute', top: 50, width: AppStyles.screen_width, height: AppStyles.screen_height - 50,
                    }}>

                    <TouchableOpacity
                        style={{ backgroundColor: '#666666', height: AppStyles.screen_height, opacity: 0.5 }}
                        onPress={() => this._toCloseFirstPop()} />
                    <View style={{ position: 'absolute', backgroundColor: '#f7f8f8', width: AppStyles.screen_width, height: 200 }} >

                        <FlatList
                            keyExtractor={(item, index) => item.name}
                            data={this.state.firstDropData}
                            renderItem={(item) => this._renderFirstDragItem(item)}
                        />
                    </View>


                </View> : <View />}

                {/* 悬浮筛选布局-右侧*/}
                {this.state.showSecondPop ? <View
                    style={{
                        position: 'absolute', top: 50, width: AppStyles.screen_width, height: AppStyles.screen_height - 50,
                    }}>

                    <TouchableOpacity
                        style={{ backgroundColor: '#666666', height: AppStyles.screen_height, opacity: 0.5 }}
                        onPress={() => this._toCloseSecondPop()} />
                    <View style={{ position: 'absolute', backgroundColor: '#f7f8f8', width: AppStyles.screen_width, height: 400 }} >
                        <View style={{
                            flexDirection: 'row', alignItems: 'center',
                            paddingVertical: 14, alignItems: 'center',
                        }} >
                            <TouchableOpacity
                                style={{ flex: 1, alignItems: 'center' }}
                                onPress={() => this._toChooseStartDate()} >
                                <Text style={{ fontSize: 13, color: '#333' }} >开始时间</Text>
                                <Text style={{ fontSize: 13, color: this.state.boolStartDate ? 'pink' : '#B8BFC3', marginTop: 5 }} >{this.state.strStartDate}</Text>
                            </TouchableOpacity>
                            <View style={{ width: 1, height: 33, backgroundColor: '#EDEDED' }} />
                            <TouchableOpacity
                                style={{ flex: 1, alignItems: 'center' }}
                                onPress={() => this._toChooseEndDate()} >
                                <Text style={{ fontSize: 13, color: '#333' }} >结束时间</Text>
                                <Text style={{ fontSize: 13, color: this.state.boolEndDate ? 'pink' : '#B8BFC3', marginTop: 5 }} >{this.state.strEndDate}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* 线 */}
                        <View style={{ width: AppStyles.screen_width, height: 1, backgroundColor: '#EDEDED' }} />
                        {/* 日历 */}
                        {this.state.showFirstCalendar ? <Calendar
                            style={{ backgroundColor: '#f7f8f8' }}
                            theme={{
                                calendarBackground: '#f7f8f8',
                                textSectionTitleColor: '#333',
                                selectedDayBackgroundColor: 'red',
                                selectedDayTextColor: 'green',
                                todayTextColor: '#2d4150',
                            }}
                            markingType={'custom'}
                            markedDates={this.state.pressStartDate}
                            // Initially visible month. Default = Date()
                            // current={''}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            // minDate={'2020-01-01'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            // maxDate={'2020-01-30'}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => this._toChangeStartDay(day)}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={(day) => { console.log('selected day', day) }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={'M月 yyyy'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => { console.log('month changed', month) }}
                            // Hide month navigation arrows. Default = false
                            hideArrows={false}
                            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                            renderArrow={(direction) => (direction == 'left' ? <Text>左边</Text> : <Text>右边</Text>)}
                            // Do not show days of other months in month page. Default = false
                            hideExtraDays={true}
                            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={true}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                            firstDay={1}
                            // Hide day names. Default = false
                            hideDayNames={false}
                            // Show week numbers to the left. Default = false
                            showWeekNumbers={false}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={substractMonth => substractMonth()}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}
                        /> :
                            <Calendar
                                style={{ backgroundColor: '#f7f8f8' }}
                                theme={{
                                    calendarBackground: '#f7f8f8',
                                    textSectionTitleColor: '#333',
                                    selectedDayBackgroundColor: 'red',
                                    selectedDayTextColor: 'green',
                                }}
                                markingType={'custom'}
                                markedDates={this.state.pressEndDate}
                                // Initially visible month. Default = Date()
                                // current={this.state.pressStartDate}
                                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                minDate={this.state.strStartDate}
                                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                maxDate={this.state.maxEndDate}
                                // Handler which gets executed on day press. Default = undefined
                                onDayPress={(day) => this._toChangeEndDay(day)}
                                // Handler which gets executed on day long press. Default = undefined
                                onDayLongPress={(day) => { console.log('selected day', day) }}
                                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                monthFormat={'M月 yyyy'}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={(month) => { console.log('month changed', month) }}
                                // Hide month navigation arrows. Default = false
                                hideArrows={false}
                                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                renderArrow={(direction) => (direction == 'left' ? <Text>左边</Text> : <Text>右边</Text>)}
                                // Do not show days of other months in month page. Default = false
                                hideExtraDays={true}
                                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                                // day from another month that is visible in calendar page. Default = false
                                disableMonthChange={false}
                                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                firstDay={1}
                                // Hide day names. Default = false
                                hideDayNames={false}
                                // Show week numbers to the left. Default = false
                                showWeekNumbers={false}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                onPressArrowLeft={substractMonth => substractMonth()}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                                onPressArrowRight={addMonth => addMonth()}
                            />}
                    </View>


                </View> : <View />}






            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'green',
    },


});
