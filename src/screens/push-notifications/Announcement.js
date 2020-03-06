import React, {useState} from 'react'
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native'
import { Container, Content, Text, Item, Input, Icon, Right, Left} from 'native-base'
import RNPickerSelect from 'react-native-picker-select'

import CustomHeader from '../../components/common/CustomHeader'
import CustomInput from '../../components/common/CustomInput'
import UploadAttatchment from '../../components/common/CustomUpload'
import Button from '../../components/common/CustomButton'
import Picker from '../../components/common/Picker'
import Modal from '../../components/common/Modal'

import config from '../../utils/config'

export default function Announcement() {
    const [subject, setSubject] = useState('')
    const [details, setDetails] = useState('')
    const [students, setStudents] = useState(['Abc', 'Xyz', 'mno'])
    const [selectedStudents, setSelectedStudents] = useState([])
    const [classSection, setClassSection] = useState(['1 A-C-N', '1B', '2B'])
    const [selectedClassSection, setSelectedClassSection] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)

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

    const handleModalVisibility = () => {
        console.log('press')
        setIsModalVisible(!isModalVisible)
    }

    const handleSelectedStudents = (selectedStudents) => {
        setSelectedStudents(selectedStudents)
    }

    const handleSubmit = () => {
        if(!subject || !details || selectedStudents.length === 0){
            Alert.alert(
                'Alert',
                'Please fill all the fields.'
            )
            return
        }
        console.log('Subject: ', subject)
        console.log('Details: ', details)
        console.log('File Details: ')
        console.log('Selected Class: ', selectedClassSection)
        console.log('SelectedStudents: ', selectedStudents)
    }

    return (
        <Container> 
            <CustomHeader 
                title="Announcement"
            />
            <Content 
                contentContainerStyle={styles.container}>
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
                        students={[{name: 'Abc', id: 1}, {name: 'bcd', id: 12}]}
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
  