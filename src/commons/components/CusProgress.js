/**
 * Created by sandershan on 2019-07-19
 * @Description:
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";

const max_width =130;

export default class CusProgress extends PureComponent {
  constructor(props) {
    super(props);
  }

  changeProgress = (pro) => {
    let progress_width = pro * max_width;
    this.progressView.setNativeProps({
      width: progress_width,
    })
  };
  _renderProgressLineView() {
    let progress_width = this.props.progress * max_width;
    return (
      <View ref={o => this.progressView = o} style={[styles.progressLineView, { width: progress_width }]}>
        <LinearGradient colors={["red", "red"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{
          flex: 1, height: 20,
          borderRadius: 65
        }}>
        </LinearGradient>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this._renderProgressLineView()}
      </View>
    );
  }
}

CusProgress.propTypes = {
  progress: PropTypes.number,
};
const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 20,
    backgroundColor: '#f6a7ab',
    borderRadius: 65,
  },
  progressLineView: {
    width: 0,
    height: 20,
    borderRadius: 65,
    backgroundColor: '#ff0000',
  }
});
