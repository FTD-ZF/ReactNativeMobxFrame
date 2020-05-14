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
    FlatList,
} from 'react-native';

import { Toast } from 'teaset';
import LoadFooter from './LoadFooter';
import ListNoDataView from './ListNoDataView';
import PropTypes from 'prop-types';


export default class CusFlatListView extends Component {




    constructor(props) {
        super(props)

        this.state = {

        }

        this.currentPage = 1;

    }

    componentDidMount() {
        this.props.requestRefreshData();
    }

    refreshing() {
        this.currentPage = 1;
        this.props.requestRefreshData();
    }

    _onload() {
        const { totalPages = 1, requestLoadData } = this.props;
        console.log('========_onload==========' + this.currentPage + '====' + totalPages)
        if (this.currentPage >= totalPages) return
        this.currentPage++;

        requestLoadData(this.currentPage);
    }

    _footerComponent() {
        const { listData, listEndPageStatus } = this.props;
        if (listData.length == 0) {
            return <ListNoDataView />
        } else {
            return <LoadFooter isLoading={listEndPageStatus} noDataName={'我是有底线的'} />
        }

    }



    render() {
        const { listData, renderItem, refreshStatus = false } = this.props;
        return (
            <FlatList
                data={listData}
                extraData={this.state}
                renderItem={renderItem}
                refreshing={refreshStatus}
                onRefresh={() => this.refreshing()}
                onEndReached={() => this._onload()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => this._footerComponent()}
                keyExtractor={(item, index) => index.toString()}

            />

        )
    }
}


