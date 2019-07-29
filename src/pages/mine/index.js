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
    FlatList,
    Dimensions,
    ScrollView,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import MyTabBar from './MyTabBar';
import { Toast } from 'teaset';

const PhoneWidth = Dimensions.get('window').width;
import DragSortableView from 'react-native-drag-sort';
import { AppColors } from '../../commons/styles';
const { height, width } = Dimensions.get('window');


const parentWidth = width
const childrenWidth = width
const childrenHeight = 51

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        // headerTitle: "Mine",
        headerTitle: '我的'

    })

    // 构造
    constructor(props) {
        super(props);

        this.state = {
            scrollEnabled: true,
            scrollOffset: 0,
            label2: ['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6', 'Tab7', 'Tab8'],
            firstData: [{ name: '第1' }, { name: '第2' }, { name: '第3' }, { name: '第4' }, { name: '第5' }, { name: '第6' }, { name: '第7' }, { name: '第8' }, { name: '第9' },]
        };
    }



    renderDeleteItem(item, index) {
        return (
            <View style={{ backgroundColor: 'blue', }}>
                <View style={{ flexDirection: 'row', paddingRight: 19, width: width, height: 50, alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 13 }}>{item.name}</Text>
                </View>
                <View style={{ height: 0.5, backgroundColor: AppColors.dark9 }} />
            </View>
        )
    }
    _keyExtractor = (item, index) => {
        const { keyExtractor } = this.props;
        if (keyExtractor) {
            return keyExtractor(item, index);
        }
        return index.toString();
    };

    _changeMoveData(data) {
        // if (data.length != this.state.firstData.length) {
        this.setState({
            firstData: data,
        })
        // }
    }
    render() {
        let label2 = this.state.label2;
        return (
            <ScrollView
                ref={(scrollView) => this.scrollView = scrollView}
                scrollEnabled={this.state.scrollEnabled}
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}>
                <DragSortableView
                    dataSource={this.state.firstData}
                    parentWidth={width}
                    childrenWidth={width}
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
                    keyExtractor={this._keyExtractor}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});
