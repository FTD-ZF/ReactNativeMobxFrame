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
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { AppColors } from '../commons/styles';
import NavigationService from '../commons/components/navigationService';
import DragSortableView from 'react-native-drag-sort';
import { NavPages } from '../root';

const { width } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => {
        return {

            headerTitle: navigation.state.params.headername,
            // headerRight: (<Text>www</Text>),
            // headerLeft: <Text>返回</Text>
        }

    }


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: [{ name: '第1' }, { name: '第2' }, { name: '第3' }, { name: '第4' },
            { name: '第5' }, { name: '第6' }, { name: '第7' }, { name: '第8' }, { name: '第9' },
            { name: '第5' }, { name: '第6' }, { name: '第7' }, { name: '第8' }, { name: '第9' },
            { name: '第5' }, { name: '第6' }, { name: '第7' }, { name: '第8' }, { name: '第9' },],
            scrollEnabled: true,
        };
    }

    componentWillMount() {

    }

    _goBack() {
        this.props.navigation.state.params.callback('你好！！！');
        this.props.navigation.goBack();
    }

    _toNextPage() {
        NavigationService.navigate(NavPages.OnePageView);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,
                    }} onPress={() => this._goBack()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击返回通知刷新
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: AppColors.themecolor,
                        margin: 20,
                        padding: 10,

                    }} onPress={() => this._toNextPage()}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        点击进入下个页面
                </Text>
                </TouchableOpacity>

                
            </View>
        );
    }

    renderItem(item, index) {
        return (
            <View style={styles.item}>
                <View style={styles.item_children}>

                    <Text style={styles.item_text}>{item.name}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5FCFF',
    },
    item: {
        width: childrenWidth,
        height: childrenHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_children: {
        width: childrenWidth,
        height: childrenHeight - 4,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    item_icon: {
        width: childrenHeight * 0.6,
        height: childrenHeight * 0.6,
        marginLeft: 15,
        resizeMode: 'contain',
    },
    item_text: {
        marginRight: 15,
        color: '#2ecc71'
    }

});
