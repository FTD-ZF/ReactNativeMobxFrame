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
    View
} from 'react-native';

export default class Index extends Component {
    static navigationOptions = ({ navigation }) => ({
        // headerTitle: "Mine",
        header: null

    })

    // 构造
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>
                    个人
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
