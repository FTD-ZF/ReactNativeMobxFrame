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

import { screen } from '../../../commons/utils/screenUtils';


export default class Index extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '骨架屏',
    });


    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {


    }



    _ChangeStatus() {
        this.setState({
            isLoading: !this.state.isLoading
        })
    }


    render() {

        return (

            <View style={styles.container} >



                <TouchableOpacity style={{
                    width: '100%', alignItems: 'center', paddingVertical: 20,
                    backgroundColor: 'red', marginTop: 10
                }} onPress={() => this._ChangeStatus()}>
                    <Text style={{ color: 'white', fontSize: 18 }}>模拟加载数据</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
               
                <View style={{ paddingHorizontal: 15, width: screen.width }} >


                    {this.state.isLoading ?
                       
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 100, }}>


                            <View style={{ flexDirection: 'row', justifyContent: 'center', }} >

                                <PlaceholderMedia style={{ width: 100, height: 100, }} color={AppColors.bgcolor} isRound={true} />
                                <View style={{ flexDirection: 'column', width: screen.width - 100 - 30 - 10, height: 100 - 10, paddingVertical: 10, justifyContent: 'space-between', marginLeft: 10 }}>
                                    <PlaceholderLine height={15} color={AppColors.bgcolor} />
                                    <PlaceholderLine height={15} color={AppColors.bgcolor} />
                                    <PlaceholderLine height={15} color={AppColors.bgcolor} />
                                </View>
                            </View>
                            <View style={{ position: 'absolute', }}>
                                <Loader />
                            </View>

                        </View>
                      
                        : <Text>sssssss</Text>}
                </View>
                




                
             
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    box: {
        width: '90%',
        margin: 10,
    },

});
