import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import { Container, Content, Text, Toast} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

import CustomHeader from '../../components/common/CustomHeader'
import ActivityLoader from '../../components/common/ActivityLoader'
import CustomInput from '../../components/common/CustomInput'
import Button from '../../components/common/CustomButton'
import Picker from '../../components/common/Picker'
import Modal from '../../components/common/Modal'

import config from '../../utils/config'
import {getStudentsByClass, getTeacherDetails, pushSeriesEvents} from '../../utils/functions'

export default function Message() {

    const [subject, setSubject] = useState('')
    const [details, setDetails] = useState('')
    const [students, setStudents] = useState([])
    const [selectedStudent, setSelectedStudent] = useState([])
    const [classSection, setClassSection] = useState([])
    const [selectedClassSection, setSelectedClassSection] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sentStatus, setSentStatus] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        async function fn(){
            const [username, password] = await AsyncStorage.multiGet(["username", "password"])
            const teacher = await getTeacherDetails()
            const classDetails = JSON.parse(teacher.classDetails)
            const classSection = classDetails.map(c => c.standard + ' ' + c.division)
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
                    id: s.roll_no
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

    const handleClassSection = (value) => {
        setSelectedClassSection(value)
    }

    const handleStudentSelect = (value) => {
        setSelectedStudent(value)
    }

    const getStudentsName = (students) => {
        return students.map(s => s.name)
    }

    const handleSubmit = async() => {
        if(!subject || !details || selectedStudent === ''){
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
            series: 'Announcment',
            mimetype: '',
            standard,
            division,
            selectoption: 'selected',
            students: [students[selectedStudent].id],
        }
        const data = await pushSeriesEvents(requestData)
        setIsLoading(false)
        if(data.response === 'success'){
            setMessage('Message Sent')
            console.log('Message Sent')
            return Toast.show({text: message, buttonText: 'Okay'})
        }
        else{
            setMessage('Message Sending Failed')
            console.log('Message Sending Failed')
            return Toast.show({text: message, buttonText: 'Okay'})
        }
        console.log(data)
    }

    return (
        <Container> 
            <CustomHeader 
                title="Message"
            />
            <Content 
                contentContainerStyle={styles.container}>
                <Text style={styles.title}>Message Details</Text>
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
                </View>
                
                <Text style={styles.title}>Recipient</Text> 
                <View style={styles.formContent}>
                    <Picker 
                        name="Select Class"
                        items={classSection}
                        onChange={handleClassSection}
                        style={{width: '90%'}} />
                    <Picker 
                        name="Select Student"
                        items={getStudentsName(students)}
                        onChange={handleStudentSelect}
                        style={{width: '90%'}} />
                    <Button 
                        title="Submit"
                        disabled={isLoading}
                        onPressFunction={handleSubmit}
                        style={{width: '60%', marginTop: 20}}
                    />
                    {/* {!isLoading && sentStatus } */}
                    {isLoading && <ActivityLoader />}
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
    }
})
  