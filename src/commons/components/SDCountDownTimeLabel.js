/**
 * Created by sandershan on 2019/4/22
 * @Description:
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
// import {dFont} from "./screen";
import moment from "moment";

export default class SDCountDownTimeLabel extends PureComponent {

  static defaultProps = {
    textStyle: {},
    isShowDay: false,
    isChinaModal: false,
    deviation: 0,
  }

  constructor(props) {
    super(props);

    this.state = {
      timeText: "",
    }
  }
  componentDidMount(){
    this.startCountDownTime(this.props.finalTime);
  }
  startCountDownTime=(finalTime)=>{
    if (this.interval) {
      clearInterval(this.interval);
    }
    let create_time = moment(finalTime,"YYYY-MM-DD HH:mm:ss").valueOf();
    let maxTime = create_time / 1000;
    this.finalTime = maxTime;
    this.configTimeValue(finalTime);
    this.interval = setInterval(() => {
      this.configTimeValue(finalTime);
    }, 1000);
    this.configTimeValue(finalTime);
  };

  configTimeValue(finalTime){
    let nowTime = new Date();
    let nowTimeCC = nowTime / 1000;
    let diff = this.finalTime - nowTimeCC;
    if (diff > 0) {
      let hours = Math.floor(diff / 3600);
      let minutes = Math.floor((diff - hours * 3600) / 60);
      let seconds = Math.floor(diff - hours * 3600 - minutes * 60);
      let days = 0;
      let days_str = "00";
      if (this.props.isShowDay){
        days = Math.floor(hours / 24);
        hours = hours - days * 24;
        days_str = days + "";

      }
      let hour_str = hours + "";
      let minutes_str = minutes + "";
      let second_str = seconds + "";
      if (hour_str.length < 2){
        hour_str = "0"+ hour_str;
      }
      if (minutes_str.length < 2){
        minutes_str = "0" + minutes_str;
      }
      if (second_str.length < 2){
        second_str = "0" + second_str;
      }
      let str = hour_str + ":" + minutes_str + ":" + second_str;

      if (this.props.isChinaModal){
        str = hour_str + "时" + minutes_str + "分" + second_str + "秒";
      }

      if (days > 0 ){
        str = days_str + "天" + str;
      }
      this.setState({
        timeText: str,
      });

      if (hours === 0 && minutes === 0 && seconds === this.props.deviation){
        if (this.props.timeOutFunction){
          this.props.timeOutFunction();
        }
        if (this.interval) {
          clearInterval(this.interval);
        }
      }

    } else {
      this.setState({
        timeText: "00:00:00",
      })
    }
  }

  componentWillReceiveProps (nextProps){
    if (nextProps && nextProps.finalTime){
      let finalTime = nextProps.finalTime;
      this.startCountDownTime(finalTime);
    }
  }


  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  render() {
    const {textStyle} = this.props;
    return (
      <View>
        <Text style={[styles.timeText, textStyle]}>{this.state.timeText}</Text>
      </View>
    );
  }
}

/**
 * 显示倒计时
 * @type {{finalTime: 这个是最终的时间,YYYY-MM-DD HH:mm:ss}}
 */
SDCountDownTimeLabel.propTypes = {
  finalTime: PropTypes.string,
  textStyle: PropTypes.any,
  timeOutFunction: PropTypes.func,
  isMillisecond: PropTypes.bool,
  isShowDay: PropTypes.bool,
  isChinaModal: PropTypes.bool,
  deviation: PropTypes.number,
}

const styles = StyleSheet.create({
  timeText: {
    fontSize:20,
  }
});
