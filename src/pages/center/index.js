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
    BackHandler,
} from 'react-native';
import { Toast } from 'teaset';

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: "中心",
        // header:null

    })



    // 构造
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    componentWillMount() {
       
    }

    componentDidMount() {

    }

    

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    中间
                </Text>

            </View>
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
