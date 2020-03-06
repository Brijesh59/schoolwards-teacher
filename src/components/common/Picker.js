import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Item, Picker, Icon, Text } from 'native-base'
import config from '../../utils/config'

export default class PickerInputExample extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    onValueChange = (value) => {
        this.setState({value})
        this.props.onChange(value)
    }
    onPress = () => {
        console.log('Pressed')
    }
    render(){
        return (
            <Item regular picker style={[styles.pickerStyle, this.props.style]}>
                <Text style={{paddingLeft: 10, color: '#707070', fontSize: 16}}>{this.props.name}</Text>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.state.value}
                    onValueChange={this.onValueChange} >
                    {/* {<Picker.Item label={this.props.name} value={this.props.name} />} */}
                    {
                        this.props.items && 
                        this.props.items.map((item, i) => <Picker.Item label={item} value={i} key={i} />)
                    }
                </Picker>
                {/* <Icon name="ios-arrow-down" style={{fontSize: 15, marginRight: 10, color: '#707070'}}/> */}
            </Item>
        )
    }
}

const styles = StyleSheet.create({
    pickerStyle:{
        borderWidth: 1,
        borderColor: `rgba(0, 0, 0, 0.2)`,
        marginTop: 10
    }
})
