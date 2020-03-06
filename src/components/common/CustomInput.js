import React from 'react'
import {View, TextInput, Text, StyleSheet} from 'react-native'
import {Textarea,Input} from 'native-base'
import config from '../../utils/config'

export default function CustomInput({name, value, placeholder, onChangeTextFunction, style, keyboardType, noOfRows}) {
    
    if(noOfRows){
        return (
            <Textarea
                style={[styles.inputStyle, style]}
                onChangeText={text => onChangeTextFunction(name, text)}
                value={value}
                placeholder={placeholder}
                autoCompleteType="off"
                rowSpan={noOfRows}
            />
        )
    }
    return (
        <TextInput
            style={[styles.inputStyle, style]}
            onChangeText={text => onChangeTextFunction(name, text)}
            value={value}
            keyboardType={!keyboardType && 'default'} 
            placeholder={placeholder}
            autoCompleteType="off"
        />
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        borderWidth: 1,
        borderColor: `rgba(0, 0, 0, 0.2)`,
        marginTop: 10,
        padding: 10
    }
});

