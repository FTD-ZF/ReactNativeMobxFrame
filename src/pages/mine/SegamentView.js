/**
 * Created by sandershan on 2019/5/31
 * @Description:
 */
import React, { PureComponent } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, DeviceEventEmitter } from 'react-native';



export default class SegmentPageView extends PureComponent {

    constructor(props) {
        super(props);
        this.tag = props.tag;
        this.datatime = props.contentData;
        // this.showProgress = props.contentData.status;
        this.state = {
            // datatime:datatime,
            acutionList: [],
            hotList: [],
            fetching: true,
            snapUpDataList: [{ name: '测试1' }, { name: '测试2' }, { name: '测试3' }, { name: '测试1' }, { name: '测试2' }, { name: '测试3' }],
            discountListData: [{ name: '测试1' }, { name: '测试2' }, { name: '测试3' }, { name: '测试4' }, { name: '测试5' }],
        };
        this.currentPage = 1;
        this.hotcurrentPage = 1;
    }

    componentDidMount() {
        DeviceEventEmitter.addListener("change", (tabContent) => {

            // this.setState({
            //     datatime:tabContent
            // })
            // Toast.message(tabIndex)
            // this.datatime = tabContent.times;
            // this.showProgress = tabContent.status;
            // console.log('******************' + tabContent)
            // this.getHotList(1);
            // this.getAuctionList(1);
        });
        console.log('******************' + this.props.tag)


    }



   






    // onLoadMorehot = () => {
    //     // 加载更多
    //     this.getHotList(this.currentPage + 1);
    // };
    // onReFreshLoadinghot = () => {
    //     // 刷新数据
    //     this.getHotList(1);
    // };

    _keyExtractor = (item, index) => index + "";





    //竖直item
    _renderColumnItem(item, index) {


        return (
            <Text style={{ height: 60 }}>wwwwww</Text>
        )
    }



  


    //竖直列表
    _renderColumnListView() {
        return (
            // <View style={{ padding: dSize(20) }}>
            <FlatList
                keyExtractor={this._keyExtractor}
                data={this.state.snapUpDataList}
                renderItem={(item, index) => this._renderColumnItem(item, index)}
               
                onEndReachedThreshold={0.1}//执行上啦的时候10%执行
                showsVerticalScrollIndicator={false}
                // ListEmptyComponent={this._renderEmptyComponent()}
                // ListHeaderComponent={this._renderListHeaderView()}
                // refreshControl={<RefreshControl refreshing={this.state.fetching}
                //     onRefresh={this.onReFreshLoading}
                //     title="" />}
            />
            // {/* </View> */}
        )
    }



    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>

                {this._renderColumnListView()}
            </View>
        );
    }
}
