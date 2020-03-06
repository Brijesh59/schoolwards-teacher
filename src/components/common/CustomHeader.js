import React from 'react'
import {StyleSheet} from 'react-native'
import { Left, Icon, Title, Header, Button, Body } from 'native-base'
import { Actions } from 'react-native-router-flux'
import config from '../../utils/config'

const CustomHeader = (props) => {
    const headerTitle = props.title
    const onPressBack = props.onPressBack ? 
                        props.onPressBack : 
                        ()=>Actions.pop({refresh:{}})
    return (
        <Header 
            style={styles.header}   
            androidStatusBarColor={config.primaryColor}
            iosBarStyle="light-content">
            <Left style={{maxWidth:60, marginLeft: 8}}>
                <Button 
                    transparent 
                    onPress={onPressBack}>
                    <Icon name='arrow-back' style={styles.iconStyle}/>
                </Button>
            </Left>
            <Body style={{alignItems: 'flex-start'}}>
                <Title style={styles.headerTitle}>
                    {headerTitle}
                </Title>
            </Body> 
        </Header>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: config.primaryColor
    },
    headerTitle:{
        color: 'white', 
    },
    iconStyle:{
        color: 'white',
    }
})

export default CustomHeader