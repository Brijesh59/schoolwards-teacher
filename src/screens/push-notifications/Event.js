import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Alert, TouchableOpacity, Text} from 'react-native'
import { Container, Content, Item, Icon, Right,Button, DatePicker} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-simple-toast'
import Snackbar from 'react-native-snackbar'

import DateTimePicker from '@react-native-community/datetimepicker'
import {CalendarIcon} from '../../components/common/Icons'
import CustomHeader from '../../components/common/CustomHeader'
import CustomInput from '../../components/common/CustomInput'
import ActivityLoader from '../../components/common/ActivityLoader'
import UploadAttatchment from '../../components/common/CustomUpload'
// import Button from '../../components/common/CustomButton'
import Picker from '../../components/common/Picker'
import Modal from '../../components/common/Modal'

import config from '../../utils/config'
import {getStudentsByClass, getTeacherDetails, pushSeriesEvents} from '../../utils/functions'

export default function Event() {

    const [event, setEvent] = useState('')
    const [notes, setNotes] = useState('')
    const [venue, setVenue] = useState('')
    const [students, setStudents] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [startDate, setStartDate] = useState( new Date())
    const [endDate, setEndDate] = useState( new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [value, setValue] = useState( new Date() )
    const [option, setOption] = useState('startDate')
    const [classSection, setClassSection] = useState([])
    const [selectedClassSection, setSelectedClassSection] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDateTimeModalVisible, setIsDateTimeModalVisible] = useState(false)
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
        if(classSection.length > 0 && classSection[selectedClassSection]){
            const [className, section] = classSection[selectedClassSection].split(' ')
            fn(className, section)
        }
    }, [selectedClassSection])

    function getDate(date = new Date()){
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        day = day < 10 ? '0' + day : day
        month = month < 10 ? '0' + month : month

        return `${day}/${month}/${year}`
    }

    function getTime(date = new Date()){
        let hr = date.getHours()
        let min = date.getMinutes()

        hr = hr < 10 ? '0' + hr : hr
        min = min < 10 ? '0' + min : min

        return hr + ':' + min
    }

    const handleChange = (name, text) => {
        switch (name) {
            case 'event':
                setEvent(text)
                break;
            case 'notes':
                setNotes(text)
                break;
            case 'venue':
                setVenue(text)
                break;
        }
    }

    const handleDateTimeClick = (type, mode) => {
        console.log('value: ', value)
        setIsDateTimeModalVisible(true)
        setMode(mode)
        switch(type){
            case 'startDate': setOption('startDate'); setValue(startDate)
                break;
            case 'endDate'  : setOption('endDate'); setValue(endDate)
                break;
            case 'startTime': setOption('startTime'); setValue(startTime)
                break;
            case 'endTime'  : setOption('endTime'); setValue(endTime)
                break;
        }
    }

    const handleDateTimeChange = (event, value) => {
        setIsDateTimeModalVisible(false)
        switch(option){
            case 'startDate': setStartDate(value)
                break;
            case 'endDate'  : setEndDate(value)
                break;
            case 'startTime': setStartTime(value)
                break;
            case 'endTime'  : setEndTime(value)
                break;
        } 
        
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
        if(!event || !notes || selectedStudents.length === 0){
            // Alert.alert(
            //     'Alert',
            //     'Please fill all the fields.'
            // )
            return Snackbar.show({
                text: 'Please fill all the fields',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#EA514F',
                action: {
                    text: 'Okay',
                    onPress: ()=> Snackbar.dismiss()
                }
            })
        }
        setIsLoading(true)
        const [standard, division] = classSection[selectedClassSection].split(' ')
        const requestData = {
            username,
            password,
            eventName: event,
            eventDesc: notes,
            eventVenue: venue,
            eventStartDate: getDate(startDate),
            eventStartTime: getTime(startTime),
            eventEndDate: getDate(endDate),
            eventEndTime: getTime(endTime),
            standard,
            division,
            selectoption: 'selected',
            students: selectedStudents.map(s => s.id),
            attatchment: '',
            mimetype: ''
        }
        const data = await pushSeriesEvents(requestData)
        setIsLoading(false)
        if(data.response === 'success'){
            setEvent('')
            setNotes('')
            setVenue('')
            return Snackbar.show({
                text: 'Message Sent',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: '#77E778',
                action: {
                    text: 'Okay',
                    onPress: ()=> Snackbar.dismiss()
                }
            })
        }
        else{
            return Snackbar.show({
                text: 'Failed to send Message',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: '#EA514F',
                action: {
                    text: 'Okay',
                    onPress: ()=> Snackbar.dismiss()
                }
            })
        } 
    }

    return (
        <Container> 
            <CustomHeader title="Event" />
            <Content contentContainerStyle={styles.container}>
                <Text style={styles.title}>Add Event</Text>
                <View style={styles.formContent}>
                    <CustomInput 
                        name="event"
                        value={event}
                        placeholder="Event"
                        onChangeTextFunction={(name, text)=>handleChange(name, text)}
                        style={{width: '90%', marginTop: 10, height: 45}}
                    />
                    <CustomInput 
                        name="notes"
                        value={notes}
                        placeholder="Notes"
                        onChangeTextFunction={(name, text)=>handleChange(name, text)}
                        style={{width: '90%'}}
                        noOfRows={3}
                    />
                    <CustomInput 
                        name="venue"
                        value={venue}
                        placeholder="Venue"
                        onChangeTextFunction={(name, text)=>handleChange(name, text)}
                        style={{width: '90%', marginTop: 10, height: 45}}
                    />             
                    <Item 
                        regular
                        style={{width: '90%', marginTop: 10, height:45}}>
                        <Text style={{paddingLeft: 10, color: '#707070', fontSize: 16}}>
                            Start Date
                        </Text> 
                        <TouchableOpacity onPress={()=>handleDateTimeClick('startDate', 'date')}>
                            <Text style={{paddingLeft: 10, color: config.primaryColor, fontSize: 16}}>
                                {getDate(startDate)} 
                            </Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleDateTimeClick('startTime', 'time')}>
                            <Text style={{paddingLeft: 10, color: config.primaryColor, fontSize: 16}}>
                                {getTime(startTime)}
                            </Text>  
                        </TouchableOpacity>
                       {isDateTimeModalVisible && 
                       <DateTimePicker 
                            defaultDate={new Date()}
                            minimumDate={new Date()}
                            mode={mode}
                            value={new Date()}
                            onChange={handleDateTimeChange}
                            textStyle={{color: config.primaryColor}}
                        /> }
                        <Right>
                            <CalendarIcon style={{marginRight: 15}}/>
                        </Right>  
                    </Item> 
                    <Item 
                        regular
                        style={{width: '90%', marginTop: 10, height:45}}>
                        <Text style={{paddingLeft: 10, color: '#707070', fontSize: 16}}>
                            End Date  
                        </Text> 
                        <Text style={{paddingLeft: 5}} />
                        <TouchableOpacity onPress={()=>handleDateTimeClick('endDate', 'date')}>
                            <Text style={{paddingLeft: 10, color: config.primaryColor, fontSize: 16}}>
                                {getDate(endDate)} 
                            </Text> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleDateTimeClick('endTime', 'time')}>
                            <Text style={{paddingLeft: 10, color: config.primaryColor, fontSize: 16}}>
                                {getTime(endTime)}
                            </Text> 
                        </TouchableOpacity>
                        <Right>
                            <CalendarIcon style={{marginRight: 15}}/>
                        </Right>  
                    </Item> 
                
                    <UploadAttatchment 
                        onPressFunction={()=>console.log('Handle Attatchment Upload')}
                        style={{width: '90%'}}
                    />
                </View>
                
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
        // flex: 1,
        // justifyContent: 'flex-start',
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
  