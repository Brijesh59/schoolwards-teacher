import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Alert, TouchableOpacity} from 'react-native'
import { Container, Content, Text, Item, Icon, Right} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-simple-toast'

import CustomHeader from '../../components/common/CustomHeader'
import CustomInput from '../../components/common/CustomInput'
import ActivityLoader from '../../components/common/ActivityLoader'
import UploadAttatchment from '../../components/common/CustomUpload'
import Button from '../../components/common/CustomButton'
import Picker from '../../components/common/Picker'
import Modal from '../../components/common/Modal'

import config from '../../utils/config'
import {getStudentsByClass, getTeacherDetails, pushSeriesEvents} from '../../utils/functions'

export default function Announcement() {
    const [subject, setSubject] = useState('')
    const [details, setDetails] = useState('')
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [classSection, setClassSection] = useState([])
    const [selectedClassSection, setSelectedClassSection] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fn(){
            const [username, password] = await AsyncStorage.multiGet(["username", "password"])
            const teacher = await getTeacherDetails()
            const classDetails = JSON.parse(teacher.classDetails)
            const classSection = classDetails
                                    .map(c => c.standard + ' ' + c.division)
            setClassSection(classSection)
            setUsername(username[1])
            setPassword(password[1])
        }
        fn()
    }, [])

    useEffect(() => {
        async function fn(className, section){
            const studentsData = await getStudentsByClass(className, section)
            const students = studentsData.map(s => (
                {
                    name: s.first_name + ' ' + s.last_name,
                    id: s.student_year_id
                }
            ))
            setStudents(students)
        }
        if(classSection.length > 0){
            const [className, section] = classSection[selectedClassSection].split(' ')
            fn(className, section)
        }
    }, [selectedClassSection])

    const handleChange = (name, text) => {
        switch (name) {
            case 'subject':
                setSubject(text)
                break;
            case 'details':
                setDetails(text)
                break;
        }
    }

    const handleAttatchmentUpload = () => {
        console.log('Handle Attatchment Upload')
    }

    const handleClassSection = (value) => {
        setSelectedClassSection(value)
    }

    const handleModalVisibility = () => {
        setIsModalVisible(!isModalVisible)
    }

    const handleSelectedStudents = (selectedStudents) => {
        setSelectedStudents(selectedStudents)
    }

    const handleSubmit = async() => {
        if(!subject || !details || selectedStudents.length === 0){
            Alert.alert(
                'Alert',
                'Please fill all the fields.'
            )
            return
        }
        setIsLoading(true)
        const [standard, division] = classSection[selectedClassSection].split(' ')
        const requestData = {
            username,
            password,
            title: subject,
            message: details,
            attatchment: '',
            mimetype: '',
            series: 'Announcement',
            standard,
            division,
            selectoption: 'selected',
            students: selectedStudents.map(s => s.id),
        }
        const data = await pushSeriesEvents(requestData)
        setIsLoading(false)
        if(data.response === 'success'){
            setSubject('')
            setDetails('')
            return Toast.show('Message Sent', Toast.SHORT, Toast.BOTTOM)
        }
        else{
            return Toast.show('Failed to send Message', Toast.SHORT, Toast.BOTTOM)
        } 
    }

    return (
        <Container> 
            <CustomHeader title="Announcement" />
            <Content contentContainerStyle={styles.container}>
                {/* Section 1 */}
                <Text style={styles.title}>Announcement Details</Text>
                <View style={styles.formContent}>
                    <CustomInput 
                        name="subject"
                        value={subject}
                        placeholder="Subject"
                        onChangeTextFunction={(name, text)=>handleChange(name, text)}
                        style={{width: '90%', marginTop: 10}}
                    />
                    <CustomInput 
                        name="details"
                        value={details}
                        placeholder="Details"
                        onChangeTextFunction={(name, text)=>handleChange(name, text)}
                        style={{width: '90%'}}
                        noOfRows={5}
                    />
                    <UploadAttatchment 
                        onPressFunction={handleAttatchmentUpload}
                        style={{width: '90%'}}
                    />
                </View>
                
                 {/* Section 2 */}
                <Text style={styles.title}>Add Recipients</Text> 
                <View style={styles.formContent}>
                    <Picker 
                        name="Select Class"
                        items={classSection}
                        onChange={handleClassSection}
                        style={{width: '90%'}}/>
                    <Item 
                        regular
                        style={{width: '90%', marginTop: 10, height:55}}
                        onPress={handleModalVisibility}
                        >
                            <Text style={{paddingLeft: 10, color: '#707070', fontSize: 16}}>
                                Select Students
                            </Text>
                            <Right>
                                <Icon name="ios-arrow-down" 
                                style={{fontSize: 15, marginRight: 15, color: '#707070'}} />
                            </Right>
                            
                    </Item>
                    <Modal 
                        isModalVisible={isModalVisible}
                        setIsModalVisible={handleModalVisibility}
                        students={students}
                        onSave={handleSelectedStudents}
                    />
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        style={isLoading ? styles.btnStyleLoading : styles.btnStyle}>  
                        <Text 
                            style={{color:'black', fontSize: 16, letterSpacing: 1}}uppercase={false}>
                                Submit
                        </Text>
                        {
                            isLoading && 
                            <ActivityLoader style={{position:'absolute'}} />
                        }
                    </TouchableOpacity>
                </View>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '98%',
        marginLeft: '1%',
    },
    formContent:{
        width: '98%',
        marginLeft: '1%',
        alignItems: 'center'
    },
    title:{
        color: config.primaryColor,
        marginLeft: '6%',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600'
    },
    btnStyle:{
        width: '60%', 
        padding: 10,
        textAlign: 'center',
        alignItems: 'center', 
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: config.secondaryColor,
        justifyContent: 'center',
    },
    btnStyleLoading:{
        width: '60%', 
        padding: 10,
        textAlign: 'center',
        alignItems: 'center', 
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: config.lightGrey,
        justifyContent: 'center',
    },
})
  