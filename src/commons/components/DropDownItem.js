
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import { AppColors, AppStyles } from '../styles';


export default class DropDownItem extends Component {
    constructor(props) {
        super(props);


    }

    /**
     * 选中item布局自定义
     * @param {*} option 
     * @param {*} index 
     * @param {*} isSelected 
     */
    _renderCusItem(option, index, isSelected) {
        return (
            <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, }}>
                <Text style={{ fontSize: 14, color: isSelected ? 'red' : AppColors.text_B8BFC3 }}>{option}</Text>
                {/* {isSelected ? <Image source={ImageKeys.college.icon_select} /> : null} */}
            </View>
        )
    }


    render() {
        const { adjustFrame, options, onSelect, onDropdownWillShow, onDropdownWillHide, txtValue, directionValue, dropdownTextStyle, dropdownTextHighlightStyle } = this.props;


        return (
            <ModalDropdown

                textStyle={{ fontSize: 14, color:'#7298932', }}
                style={{
                    flex: 1, alignItems: 'center', height: 50,
                    backgroundColor: 'white', justifyContent: 'center', paddingVertical: 9
                }}
                adjustFrame={adjustFrame}

                options={options}
                dropdownTextStyle={[{ color: AppColors.dark3 }, dropdownTextStyle]}
                dropdownTextHighlightStyle={[{ color: AppColors.themecolor }, dropdownTextHighlightStyle]}
                dropdownStyle={{ flex: 1, width: AppStyles.width, height: options.length * 50, }}
                onSelect={onSelect}
                onDropdownWillShow={onDropdownWillShow}
                onDropdownWillHide={onDropdownWillHide}
                renderSeparator={() => <View style={{ backgroundColor: AppColors.transparent }} />}
                renderRow={(option, index, isSelected) => this._renderCusItem(option, index, isSelected)}
            >
                {/* <Text>{txtValue}  {directionValue}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{txtValue}</Text>
                    {/* <Image style={{ marginLeft: 6 }} source={directionValue == 1 ? ImageKeys.college.xiala : ImageKeys.college.shangla} /> */}
                </View>

            </ModalDropdown>

        );
    }
}
