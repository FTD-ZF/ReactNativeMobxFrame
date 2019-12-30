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
    Button,
} from 'react-native';

import AppStyles from '../../../commons/styles/styles';
import {
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Fade,
    Loader,
    Shine,
    ShineOverlay,
} from 'rn-placeholder';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import AppColors from '../../../commons/styles/colors';
import { Row, Rows, Table, TableWrapper, Col, Cols } from 'react-native-table-component';
import { screen } from '../../../commons/utils/screenUtils';
import { Toast } from 'teaset';

export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '表格布局',
    });


    constructor(props) {
        super(props)

        this.state = {
            tableHead: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            tableTitle: ['上午', '下午'],
            tableData: [],

            tableHeadTwo: ['', '上午', '下午'],
            tableTitleTwo: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            firstData: [],
            secondData: [],

            dataA: [],
            dataB: [],
        }
    }

    componentWillMount() {
        const dataA = [{ 'name': 1, status: false }, { 'name': 2, status: true },
        { 'name': 3, status: false }, { 'name': 4, status: true },
        { 'name': 5, status: true }, { 'name': 6, status: false },
        { 'name': 7, status: false },];

        const dataB = [{ 'name': 1, status: true }, { 'name': 2, status: true },
        { 'name': 3, status: false }, { 'name': 4, status: true },
        { 'name': 5, status: false }, { 'name': 6, status: false },
        { 'name': 7, status: true },];

        let itemWeek = [];
        let secondDataRow = [];
        let firstDataRow = [];
        let secondData = [];
        let firstData = [];

        dataA.map((item, index) => {
            firstDataRow.push(this.renderItem(item, index));
            firstData.push(this.renderItemFirstCol(item, index));

        })

        dataB.map((item, index) => {

            secondDataRow.push(this.renderItem(item, index));
            secondData.push(this.renderItemSecondCol(item, index));

        })

        itemWeek.push(firstDataRow);
        itemWeek.push(secondDataRow);

        this.setState({
            tableData: itemWeek,
            firstData, secondData,
            dataA, dataB,
        })
        console.log(this.state.firstData)
    }

    componentDidMount() {


    }

    //修改item内容
    _toChangeItemFirst(item, index) {
        this.state.dataA[index].status = !this.state.dataA[index].status;
        console.log(JSON.stringify(this.state.dataA))
        let curData = [];
        this.state.dataA.map((item, index) => {
            curData.push(this.renderItemFirstCol(item, index))
        })
        this.setState({
            firstData: curData
        })
        // Toast.message('firstData*******' + index)
    }
    _toChangeItemSecond(item, index) {
        this.state.dataB[index].status = !this.state.dataB[index].status;
        let curData = [];
        this.state.dataB.map((item, index) => {
            curData.push(this.renderItemSecondCol(item, index))
        })
        this.setState({
            secondData: curData
        })
        Toast.message('secondData*******' + index)
    }

    renderItem(item, index) {
        let changeColor = item.status ? AppColors.themecolor : '#00000000'

        return (<View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ backgroundColor: changeColor, width: 20, height: 20, borderRadius: 10 }} />
        </View>);
    }


    renderItemFirstCol(item, index) {

        let changeColor = item.status ? AppColors.themecolor : '#00000000'
        return (<TouchableOpacity activeOpacity={0.8}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this._toChangeItemFirst(item, index)} >
            <View style={{ backgroundColor: changeColor, width: 20, height: 20, borderRadius: 10 }} />
        </TouchableOpacity>);
    }

    renderItemSecondCol(item, index) {

        let changeColor = item.status ? AppColors.themecolor : '#00000000'
        return (<TouchableOpacity activeOpacity={0.8}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this._toChangeItemSecond(item, index)} >
            <View style={{ backgroundColor: changeColor, width: 20, height: 20, borderRadius: 10 }} />
        </TouchableOpacity>);
    }


    render() {

        const state = this.state;
        return (

            <ScrollView>
                <View style={styles.container} >

                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={state.tableHead} flexArr={[1, 1, 1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={state.tableTitle} style={styles.title} textStyle={styles.text} />
                            <Rows data={state.tableData} flexArr={[1, 1, 1, 1, 1, 1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>

                    <View style={{ height: 30, width: AppStyles.width }} />

                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={state.tableHeadTwo} flexArr={[1, 1,]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={state.tableTitleTwo} style={styles.columnView} textStyle={styles.text} />
                            <Col data={state.firstData} style={[styles.columnView, { backgroundColor: 'white' }]} textStyle={styles.text} />
                            <Col data={state.secondData} style={[styles.columnView, { backgroundColor: 'white' }]} textStyle={styles.text} />
                            {/* <Cols data={state.tableData} flexArr={[1, 1]} textStyle={styles.text} /> */}

                        </TableWrapper>
                    </Table>

                </View >
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#F5FCFF',
    },
    head: { height: 40, backgroundColor: 'red' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: 'green' },
    row: { height: 40, backgroundColor: 'gray' },
    text: { textAlign: 'center' },
    columnView: { flex: 1, height: 40 * 7, backgroundColor: 'green' },
});
