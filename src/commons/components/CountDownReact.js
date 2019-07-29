import React, {
    Component,

} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    cardItemTimeRemainTxt: {
        fontSize: 20,
        color: '#ee394b'
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
    },
    container: {
        flexDirection: 'row',
    },
    //时间文字
    defaultTime: {
        paddingHorizontal: 3,
        backgroundColor: 'rgba(85, 85, 85, 1)',
        fontSize: 12,
        color: 'white',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    //冒号
    defaultColon: {
        fontSize: 12, color: 'rgba(85, 85, 85, 1)'
    }
});

class CountDown extends Component {
    static displayName = 'Simple countDown';
    static propTypes = {
        date: PropTypes.string,
        days: PropTypes.objectOf(PropTypes.string),
        hours: PropTypes.string,
        mins: PropTypes.string,
        segs: PropTypes.string,
        onEnd: PropTypes.func,

        containerStyle: PropTypes.style,
        daysStyle: PropTypes.style,
        hoursStyle: PropTypes.style,
        minsStyle: PropTypes.style,
        secsStyle: PropTypes.style,
        firstColonStyle: PropTypes.style,
        secondColonStyle: PropTypes.style,

    };
    static defaultProps = {
        date: new Date(),
        days: {
            plural: '天',
            singular: '天',
        },
        hours: ':',
        mins: ':',
        segs: ':',
        onEnd: () => { },

        containerStyle: styles.container,//container 的style
        daysStyle: styles.defaultTime,//天数 字体的style
        hoursStyle: styles.defaultTime,//小时 字体的style
        minsStyle: styles.defaultTime,//分钟 字体的style
        secsStyle: styles.defaultTime,//秒数 字体的style
        firstColonStyle: styles.defaultColon,//从左向右 第一个冒号 字体的style
        secondColonStyle: styles.defaultColon,//从左向右 第2个冒号 字体的style

    };
    state = {
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
    };
    componentDidMount() {
        //console.log(this.props.date);//"2017-03-29T00:00:00+00:00"
        this.interval = setInterval(() => {
            const date = this.getDateData(this.props.date);
            if (date) {
                this.setState(date);
            } else {
                this.stop();
                this.props.onEnd();
            }
        }, 1000);
    }
    componentWillMount() {
        const date = this.getDateData(this.props.date);
        if (date) {
            this.setState(date);
        }

    }
    componentWillUnmount() {
        this.stop();
    }
    getDateData(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date)) / 1000;

        if (diff <= 0) {
            return false;
        }

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        };

        if (diff >= (365.25 * 86400)) {
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) {
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) {
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
        return timeLeft;
    }
    render() {
        const countDown = this.state;
        let days;
        if (countDown.days === 1) {
            days = this.props.days.singular;
        } else {
            days = this.props.days.plural;
        }
        return (
            //    <View style={styles.container}>
            //      <Text style={styles.text}>{
            //        ((countDown.days > 0) ? this.leadingZeros(countDown.days)+days:'')
            //        +this.leadingZeros(countDown.hours)
            //        +':'+this.leadingZeros(countDown.min)
            //        +':'+this.leadingZeros(countDown.sec)}</Text>
            //    </View>
            //
            <View style={this.props.containerStyle}>
                {(countDown.days > 0) ? <Text style={this.props.daysStyle}>{this.leadingZeros(countDown.days) + days}</Text> : null}
                <Text style={this.props.hoursStyle}>{this.leadingZeros(countDown.hours)}</Text>
                <Text style={this.props.firstColonStyle}>{this.props.hours}</Text>
                <Text style={this.props.minsStyle}>{this.leadingZeros(countDown.min)}</Text>
                <Text style={this.props.secondColonStyle}>{this.props.mins}</Text>
                <Text style={this.props.secsStyle}>{this.leadingZeros(countDown.sec)}</Text>
                <Text style={this.props.secondColonStyle}>{this.props.segs}</Text>
            </View>


        );
    }
    stop() {
        clearInterval(this.interval);
    }
    leadingZeros(num, length = null) {

        let length_ = length;
        let num_ = num;
        if (length_ === null) {
            length_ = 2;
        }
        num_ = String(num_);
        while (num_.length < length_) {
            num_ = '0' + num_;
        }
        return num_;
    }
};

export default CountDown;