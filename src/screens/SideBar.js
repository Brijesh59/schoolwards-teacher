import React from 'react'
import {StyleSheet, View, Platform} from 'react-native'
import { Text, Container, Content, Left, List, ListItem, Thumbnail} from 'native-base'
import { Actions } from 'react-native-router-flux';

import {CalendarIcon, PushNotificationIcon, ProfileIcon, CallIcon, ContactsIcon, SettingsIcon} from '../components/common/Icons'
import config from '../utils/config';

const schoolLogo = '../assets/schoolLogo.png'

export default class SideBar extends React.PureComponent{
    render(){
        console.log('Sidebar Screen Re-rendered ...')
        return (
            <Container style={[styles.container]}>
                <View 
                    style={[{alignItems:'center'}, 
                            Platform.OS==='ios' && {marginTop:25}]}>
                    <Thumbnail 
                        large
                        style={styles.schoolLogo} 
                        source={require(schoolLogo)} />
                </View>
                <Content>
                    <List>
                        <ListItem header style={styles.listHeader}> 
                            <Text style={styles.listHeaderText}>General</Text>
                        </ListItem>
                        <ListItem
                            avatar 
                            onPress={()=>Actions.pushNotificationDashboardScreen()}> 
                            <Left style={styles.left}>
                                <PushNotificationIcon style={styles.iconStyle}/>
                            </Left>
                            <Text style={styles.listItemTitle}>Push Notifications</Text>
                        </ListItem>
                        <ListItem
                            avatar 
                            onPress={()=>Actions.calenderScreen()}> 
                            <Left style={styles.left}>
                                <CalendarIcon style={styles.iconStyle}/>
                            </Left>
                            <Text style={styles.listItemTitle}>Calender</Text>
                        </ListItem>
                        <ListItem
                            avatar 
                            onPress={()=>Actions.profileScreen()}> 
                            <Left style={styles.left}>
                                <ProfileIcon style={styles.iconStyle}/>
                            </Left>
                            <Text style={styles.listItemTitle}>Profile</Text>
                        </ListItem>
                        <ListItem 
                            avatar 
                            onPress={()=>Actions.contactUsScreen()}> 
                            <Left style={styles.left}>
                                <CallIcon style={styles.iconStyle}/>
                            </Left>
                            <Text style={styles.listItemTitle}>Contact Us</Text>
                        </ListItem >
                        <ListItem
                            avatar 
                            onPress={()=>Actions.aboutUsScreen()}> 
                            <Left style={styles.left}>
                                <ContactsIcon style={styles.iconStyle}/>
                            </Left>
                            <Text style={styles.listItemTitle}>About Us</Text>   
                        </ListItem>
                        <ListItem
                            avatar 
                            onPress={()=>Actions.settingScreen()}> 
                            <Left style={styles.left}>
                                <SettingsIcon style={styles.iconStyle}/>
                            </Left>
                            <Text style={styles.listItemTitle}>Setting</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    } 
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: config.primaryColor,
      fontFamily: `'Roboto', sans-serif`
    },
    title:{
        fontSize: 40,
        marginTop:30,
        color: '#FDC702',
    },
    schoolLogo:{
        marginTop: 15,
        width:110,
        height:110,
        borderRadius: 55,
        backgroundColor: 'white'
    },
    listHeader:{
        width: '85%',
    },
    listHeaderText:{
        color: 'white',
        fontSize: 20,
        marginTop: 8,
        fontWeight: "900"
    },
    listItemTitle:{
        color: 'white',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 12
    },
    thumbnail:{
        width: 50,
        height: 50
    },
    iconStyle:{
        width: '100%',
        marginLeft: 10,
        color: 'white',
        fontSize: 35
    },
    left:{
        width: 60
    }
});
  