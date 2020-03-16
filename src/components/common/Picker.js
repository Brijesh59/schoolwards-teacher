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
    render(){
        const {name, items} = this.props
        return (
            <Item regular picker style={[styles.pickerStyle, this.props.style]}>
                <Text style={{paddingLeft: 10, color: '#707070', fontSize: 16}}>{name}</Text>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.state.value}
                    onValueChange={this.onValueChange}>
                    {
                        items && 
                        items.map((item, i) => <Picker.Item label={item} value={i} key={i} />)
                    }
                </Picker>
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
