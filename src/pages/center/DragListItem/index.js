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
} from 'react-native';

import AppStyles from '../../../commons/styles/styles';

import AppColors from '../../../commons/styles/colors';
import DragSortableView from 'react-native-drag-sort';
import { screen, dFont, aWidth, aHeight, } from '../../../commons/utils/screenUtils';


export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Item拖动',
    });


    constructor(props) {
        super(props)

        this.state = {
            firstData: [{ name: '第1' }, { name: '第2' }, { name: '第3' }, { name: '第4' }, { name: '第5' }, { name: '第6' }, { name: '第7' }, { name: '第8' }, { name: '第9' },]

        }
    }

    componentDidMount() {


    }


    renderDeleteItem(item, index) {
        return (
            <View style={{ backgroundColor: 'blue', }}>
                <View style={{ flexDirection: 'row', paddingRight: 19, width: screen.width, height: 50, alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 13 }}>{item.name}</Text>
                </View>
                <View style={{ height: 0.5, backgroundColor: AppColors.dark9 }} />
            </View>
        )
    }
    _keyExtractor = (item, index) => {
        return item.name;

    };

    _changeMoveData(data) {
        // if (data.length != this.state.firstData.length) {
        this.setState({
            firstData: data,
        })
        // }
    }


    render() {

        return (
            <ScrollView
                onScrollEndDrag={({ nativeEvent }) => { this.setState({ scrollOffset: nativeEvent.contentOffset['y'] }); }}
                onMomentumScrollEnd={({ nativeEvent }) => { this.setState({ scrollOffset: nativeEvent.contentOffset['y'] }); }}

                ref={(scrollView) => this.scrollView = scrollView}
                scrollEnabled={this.state.scrollEnabled}
                style={styles.container}>
                <DragSortableView
                    dataSource={this.state.firstData}
                    parentWidth={screen.width}
                    childrenWidth={screen.width}
                    childrenHeight={51}
                    scaleStatus={'scaleY'}
                    onDragStart={(startIndex, endIndex) => {
                        this.setState({
                            scrollEnabled: false
                        })
                    }}
                    onDragEnd={(startIndex) => {
                        this.setState({
                            scrollEnabled: true
                        })
                    }}
                    onDataChange={(data) => {
                        if (data.length != this.state.firstData.length) {
                            this.setState({
                                firstData: data
                            });
                        }
                    }}
                    keyExtractor={(item, index) => item.name} // FlatList作用一样，优化
                    // keyExtractor={this._keyExtractor}
                    onClickItem={(data, item, index) => {

                    }}
                    renderItem={(item, index) => {
                        return this.renderDeleteItem(item, index)
                    }}
                />
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },


});
