import React, { useEffect, useState } from 'react'
import {StyleSheet} from 'react-native'
import { Text, Container, Content, Thumbnail, Grid, Col, Row} from 'native-base'
import CustomButton from '../../components/common/CustomButton'
import CustomHeader from '../../components/common/CustomHeader';
import { Actions } from 'react-native-router-flux';
import config from '../../utils/config';
import {getTeacherDetails} from '../../utils/functions';

export default function Profile() {

    const [teacher, setTeacher] = useState({})
    useEffect(() => {
        const getTeacher = async() => {
            const teacher = await getTeacherDetails()
            console.log('teacher: ', teacher)
            setTeacher(teacher)
        }
        getTeacher()
    }, [])
    const defaultImage = teacher.gender === 'male' ?
        "https://pickaface.net/gallery/avatar/unr_workplacemale_180407_1548_cm3i.png" :
        'https://cdn4.vectorstock.com/i/1000x1000/50/68/avatar-icon-of-girl-in-a-baseball-cap-vector-16225068.jpg'

    console.log(teacher.gender)
    return (
        <Container> 
            <CustomHeader 
                title="Children" />
            <Content 
                contentContainerStyle={styles.container}>
                <Thumbnail 
                    large
                    style={styles.thumbnail} 
                    source={{uri: teacher.profileImage ? teacher.profileImage : defaultImage}} />
                <Text style={styles.name}>{teacher.name}</Text>    
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Employee ID
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                {teacher.employeeId}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Designation
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                {teacher.designation}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Role
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                {teacher.role}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Joining Date
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                {teacher.joiningDate}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Mobile No
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                {teacher.mobileNo}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Email Id
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                {teacher.email}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Address
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                {teacher.address}
                            </Text>
                        </Col>
                    </Row>
                </Grid>
                <CustomButton 
                    title="Ok" 
                    onPressFunction={()=>Actions.pop()}
                    style={{marginTop: 10,marginBottom:20, width:'50%'}}/>
            </Content>
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //marginTop: 150
      },
    name:{
        fontSize:20,
        padding: 10,
        color: config.primaryColor
    },
    grid:{
        marginTop: 5,
        width: '95%',
    },
    key:{
        fontSize: 16,
        marginLeft: 20,
    },
    value:{
        fontSize: 16,
        color: '#808080'
    },
    thumbnail:{
       marginTop: 15,
       width:100,
       height:100
    },
});
  