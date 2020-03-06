import React from 'react'
import {StyleSheet, View} from 'react-native'
import { Container, Content, Text, Grid, Row, Col} from 'native-base'
import { Actions } from 'react-native-router-flux'

import config from '../../utils/config'
import CustomHeader from '../../components/common/CustomHeader'
import {AnnouncementIcon, HomeworkIcon, AttendanceIcon, MessageIcon, EventIcon, ActivityLogIcon} from '../../components/common/Icons'

export default function PushNotifications() {
    return (
        <Container> 
            <CustomHeader 
                title="Push Notifications"
            />
            <Content 
                contentContainerStyle={styles.container}>
                <Grid>
                    <Row style={styles.rowStyle}>
                        <Col 
                            style={styles.colStyle} 
                            onPress={()=>Actions.announcementScreen()}>
                            <AnnouncementIcon style={[styles.icon, {transform: [{rotateZ: '-25deg'}]}]}/>
                            <Text style={styles.title}>Announcement</Text>
                        </Col>
                        <Col 
                            style={[styles.colStyle, {marginLeft: 15}]} 
                            onPress={()=>Actions.homeworkScreen()}>
                            <HomeworkIcon style={styles.icon}/>
                            <Text style={styles.title}>Homework</Text>
                        </Col>
                    </Row>
                    <Row style={styles.rowStyle}>
                        <Col 
                            style={styles.colStyle} 
                            onPress={()=>Actions.attendanceScreen()}>
                                <AttendanceIcon style={styles.icon}/>
                                <Text style={styles.title}>Attendance</Text>
                        </Col>
                        <Col 
                            style={[styles.colStyle, {marginLeft: 15}]} 
                            onPress={()=>Actions.messageScreen()}>
                            <MessageIcon style={styles.icon}/>
                            <Text style={styles.title}>Message</Text>
                        </Col>
                    </Row>
                    <Row style={styles.rowStyle}>
                        <Col 
                            style={styles.colStyle} 
                            onPress={()=>Actions.eventScreen()}>
                            <EventIcon style={styles.icon}/>
                            <Text style={styles.title}>Event</Text>
                        </Col>
                        <Col 
                            style={[styles.colStyle, {marginLeft: 15}]} 
                            onPress={()=>Actions.activityLogScreen()}>
                            <ActivityLogIcon style={styles.icon}/>
                            <Text style={styles.title}>ActivityLog</Text>
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '92%',
        marginLeft: '4%',
        marginTop: 20,
    },
    rowStyle:{
        height: 150, 
        marginBottom: 15,
        
    },
    colStyle:{
        padding: 0,
        // borderWidth: 1, 
        borderColor: `rgba(0, 0, 0, 0.1)`, 
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 1, 
        //     height: 2
        // },
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        // elevation: 3,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10
    },
    icon:{
        fontSize: 60,
    },
    title:{
        color: config.primaryColor,
        marginTop: 15,
        fontSize: 18,
        fontWeight: "600"
    }
})
  