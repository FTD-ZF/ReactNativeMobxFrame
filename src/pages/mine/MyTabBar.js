import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

const PhoneWidth = Dimensions.get('window').width;
const Button = (props) => {
    return (
        <TouchableOpacity {...props} activeOpacity={0.95}>
            {props.children}
        </TouchableOpacity>
    )
};


export default class MyTabBar extends Component {
    static propTypes = {

        goToPage: PropTypes.func, // 跳转到对应tab的方法
        activeTab: PropTypes.number, // 当前被选中的tab下标
        tabs: PropTypes.array, // 所有tabs集合

        tabNames: PropTypes.array, // 保存Tab名称
        tabIconNames: PropTypes.array, // 保存Tab图标

    };  // 注意这里有分号


    render() {
        // if(this.myScrollView){
        //     this.myScrollView.scrollTo({ x: (PhoneWidth/5)*3, y: 0, animated: true });
        // }

        return (
            // <View style={styles.tabs}>
            //     {/*遍历。系统会提供一个tab和下标 调用一个自定义的方法*/}
            //     {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            // </View>
            <View style={styles.tabBarBox} >
                <ScrollView style={{ flexDirection: 'row', }}
                    ref={this.props.myScrollView}
                    showsHorizontalScrollIndicator={false} horizontal={true}>
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        const renderTab = this.props.renderTab || this.renderTab;
                        return renderTab(name, page, isTabActive, this.props.goToPage);
                    })}
                </ScrollView>
            </View>

        );
    }

    componentDidMount() {
        // this.myScrollView.scrollTo({ x: (PhoneWidth/5)*7, y: 0, animated: true });
    }


    renderTab(name, page, isTabActive, onPressHandler) {
        const textColor = isTabActive ? 'white' : 'black';
        
        console.log(textColor)
        return <Button
            style={{ flex: 1, width: PhoneWidth / 5, height: 50,  }}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab]}>
                <Text style={[{ color: textColor, },]}>
                    {name}
                </Text>
                <Text style={[{ color: textColor, marginTop: 5 },]}>
                    {name}
                </Text>
            </View>
        </Button>;
    }




}

const styles = StyleSheet.create({
    // tabs: {
    //     flexDirection: 'row',
    //     height: 50,
    // },

    // tab: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabBarBox: {
       
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3671ff',
    },
    iconBox: {
        margin: 15
    },
    tab: {
        // flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        borderRadius: 2,
        borderColor: '#0086E5',
        borderWidth: 1,
        width: PhoneWidth / 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
    },


});