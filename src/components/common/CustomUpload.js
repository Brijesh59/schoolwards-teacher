import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Left, Right, Body, Button,Text,Icon} from 'native-base'
import config from '../../utils/config'

export default function Upload({onPressFunction, style}) {
    
    return (
        <Button
            iconLeft
            transparent
            style={[styles.btnStyle, style]}
            onPress={() => onPressFunction()}>
            <Icon name="attach" style={{color: '#707070', transform: [{rotateZ: '30deg'}]}}/>    
            <Left style={{marginLeft: 15}}>
                <Text style={{color: '#707070'}}>Upload File</Text>
            </Left>
            <Right> 
                <Text style={{marginRight: 15, color: config.primaryColor}}>
                    Browse
                </Text>
            </Right>
        </Button>
    )
}

const styles = StyleSheet.create({
    btnStyle:{
        borderWidth: 1,
        borderColor: `rgba(0, 0, 0, 0.2)`,
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
        marginTop: 10
    },
});

