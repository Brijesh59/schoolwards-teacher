import React, {useState} from 'react'
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native'
import { Container, Content, Text, Item, Input, Icon, Right, Left, DatePicker, Grid, Row, Col} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePicker from '@react-native-community/datetimepicker'

import CustomHeader from '../../components/common/CustomHeader'
import CustomInput from '../../components/common/CustomInput'
import UploadAttatchment from '../../components/common/CustomUpload'
import Button from '../../components/common/CustomButton'
import Picker from '../../components/common/Picker'
import Modal from '../../components/common/Modal'
import {CalendarIcon} from '../../components/common/Icons'
import config from '../../utils/config'

export default function Event() {
    const [event, setEvent] = useState('')
    const [notes, setNotes] = useState('')
    const [venue, setVenue] = useState('')
    const [students, setStudents] = useState(['Abc', 'Xyz', 'mno', 'Abc', 'Xyz', 'mno','Abc', 'Xyz', 'mno','Abc', 'Xyz', 'mno','Abc', 'Xyz', 'mno','Abc', 'Xyz', 'mno',])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [startDate, setStartDate] = useState( new Date())
    const [endDate, setEndDate] = useState( new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [value, setValue] = useState( new Date() )
    const [option, setOption] = useState('startDate')
    const [classSection, setClassSection] = useState(['1 A-C-N', '1B', '2B'])
    const [selectedClassSection, setSelectedClassSection] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDateTimeModalVisible, setIsDateTimeModalVisible] = useState(false)

    function getDate(date = new Date()){
        let day = date.getDate()
        let month = date.getMonth()
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

    const handleSubmit = () => {
        // if(!subject || !details || selectedStudents.length === 0){
        //     Alert.alert(
        //         'Alert',
        //         'Please fill all the fields.'
        //     )
        //     return
        // }
       
    }

    return (
        <Container> 
            <CustomHeader 
                title="Event"
            />
            <Content 
                contentContainerStyle={styles.container}>
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
                        students={[{name: 'Abc', id: 1}, {name: 'bcd', id: 2}, {name: 'bcd', id: 3},{name: 'bcd', id: 4},{name: 'bcd', id: 5},{name: 'bcd', id: 6},{name: 'bcd', id: 7},{name: 'bcd', id: 8}]}
                        onSave={handleSelectedStudents}
                    />
                    <Button 
                        title="Submit"
                        onPressFunction={handleSubmit}
                        style={{width: '60%', marginTop: 20}}
                    />
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
  