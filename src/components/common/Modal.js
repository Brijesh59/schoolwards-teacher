
import React, { useState, useEffect } from 'react'
import {StyleSheet, TouchableOpacity, FlatList, View, Alert, AppState, ScrollView} from 'react-native'
import Modal from 'react-native-modal'
import {Left, Button, Title, Body, Right, Header, Drawer, Text, Radio, ListItem, CheckBox } from 'native-base'
import config from '../../utils/config'
import CustomButton from './CustomButton'

// students = [{name: '', id: ''}]
export default function CustomModal({isModalVisible, setIsModalVisible, students, onSave}) {

    const [selectedStudents, setSelectedStudents] = useState([])
    const [all, setAll] = useState(true)
    
    useEffect(() => {
        setSelectedStudents(students)
    }, [])

    useEffect(() => {
       if(all){
            setSelectedStudents(students)
       }
       else{
            setSelectedStudents([])
       }
    }, [all])

    const handleCancel = () => {
        setIsModalVisible()
    }

    const handleAll = () => {
        setAll(!all)
    }

    const handleApply = () => {
        onSave(selectedStudents)
        setIsModalVisible()
    }
    
    const handleStudentCheckBox = (student) => {
        const isPush = selectedStudents.find(s => s.id === student.id)
        if(!isPush){
            const updatedList = [...selectedStudents, student]
            setSelectedStudents(updatedList)
        }
        else{
           const updatedList = selectedStudents.filter(s => s.id != student.id)
           setSelectedStudents(updatedList)
        }
        
    }  

    return (
        <View style={{flex: 1}}>
            <Modal 
                isVisible={isModalVisible}
                animationIn='zoomIn'
                animationOut="zoomOut"
                animationInTiming={200}
                animationOutTiming={200}
                backdropTransitionOutTiming={0} 
                onBackdropPress={handleCancel}>
                <View style={styles.modalContent}>     
                   
                    <View style={{
                        width: '80%',
                        marginLeft: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 10,
                        paddingBottom: 10,
                        padding: 5}}
                        >
                        <Text style={{fontSize: 18, color: config.primaryColor }}>Select Students</Text> 
                        <CheckBox 
                            style={{marginTop: 5}}
                            checked={all}
                            onPress={handleAll} />
                    </View>
                    
                    <ScrollView style={{maxHeight: 400}}>
                        {
                            students && students.map(student => (
                                <TouchableOpacity style={{
                                    width: '80%',
                                    marginLeft: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 5}}
                                    activeOpacity={0.6}
                                    key={student.id}
                                    onPress={()=> handleStudentCheckBox(student)}>
                                    <Text style={{color: '#707070', fontSize:16}}>
                                        {student.name}
                                    </Text>
                                    <CheckBox 
                                        checked={selectedStudents.find(s => s.id === student.id) ? true : false}
                                        onPress={()=> handleStudentCheckBox(student)}/>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: 20 }}> 
                        <CustomButton 
                            title="Cancel"
                            onPressFunction={handleCancel}
                            style={{
                                width: '40%',
                                borderColor: config.primaryColor,
                                borderWidth: 2,
                                borderRadius: 5,
                                backgroundColor: 'white'
                            }}
                        />  
                        <CustomButton 
                            title="Add"
                            onPressFunction={handleApply}
                            style={{width: '40%'}}
                        />      
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContent:{
        backgroundColor: 'white',
        width: '90%',
        height: 'auto',
        marginLeft: '5%',
        borderRadius: 5
    },
})











