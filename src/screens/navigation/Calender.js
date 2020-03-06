import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import { Container, Content, Button, Body, Text, Card, CardItem} from 'native-base'
import {Calendar} from 'react-native-calendars'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CustomHeader from '../../components/common/CustomHeader'
import {formatDate, getCurrentDate, getData} from '../../utils/functions'
import config from '../../utils/config'

export default function CalenderScreen() {

    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [selectedDate, setSelectedDate] = useState(getCurrentDate())
    const [markedDates, setMarkedDates] = useState({})
    const [activeSlide, setActiveSlide] = useState(0)
    const screenWidth = Dimensions.get('window').width
    const optimumLayoutWidth = screenWidth - screenWidth/10
    
    useEffect(() => {
        async function fetchStudentsAndEvents(){
            const JSONDATA = await getData()
            setEvents(JSONDATA.events)
        }
        fetchStudentsAndEvents() 
    }, [])

    useEffect(() => {
        handleMarkedDate()
        filterEvents()
    }, [events])

    useEffect(() => {
        handleMarkedDate()
        filterEvents()
    }, [selectedDate])

    function filterEvents(){
        const filteredEvents = 
        events
            .filter(e => e.dateTime && e.dateTime.split(' ')[0] === selectedDate)
        setFilteredEvents(filteredEvents)
    }

    function handleDateChange(selectedDate){
        setSelectedDate(selectedDate)
    }

    function handleMarkedDate(){
        let tempMarkedDates = {}
        tempMarkedDates[selectedDate] = { selected: true }
        events.forEach(event => {
            if( event.dateTime ){
                tempMarkedDates[event.dateTime.split(' ')[0]] = {
                    marked: true,
                    selected: event.dateTime.split(' ')[0] === selectedDate
                }
            }
        })
        // console.log("Marked Dates, ", tempMarkedDates)
        setMarkedDates(tempMarkedDates)
    }
    
    function renderEvents({item:event, index}){
        // console.log("Passed Events: ", event)
        return <Card style={{
                        width: optimumLayoutWidth-6,
                        shadowOffset:{
                            width: 0,
                            height: 0
                        },
                        shadowOpacity: 0
                    }}
                    key={index}> 
                    <CardItem 
                        header 
                        bordered 
                        button 
                        style={{width: optimumLayoutWidth-6.8}}>
                        <Text
                        style={{color: config.primaryColor}}>
                            Event on {formatDate(selectedDate)} 
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Body  
                            style={{width: optimumLayoutWidth-10, flexWrap: 'wrap' }}>
                            <Text>
                                {event.title}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
    }

    return (
        <Container> 
            <CustomHeader title = "Calender" />
            <Content contentContainerStyle = { styles.container }>
                
                <View style={[styles.calendarSection, {width: optimumLayoutWidth}] }>
                    <Calendar
                        monthFormat={'MMM yyyy'}
                        hideExtraDays={true}
                        firstDay={1}
                        minDate={getCurrentDate()}
                        onDayPress={day => handleDateChange(day.dateString)}
                        markedDates = {markedDates}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        style={styles.calendarStyle}
                        theme={{
                            todayTextColor: config.secondaryColor,
                            selectedDayBackgroundColor: config.secondaryColor,
                            selectedDayTextColor: '#ffffff',
                        }}
                    /> 
                </View>       
             
                {   
                    filteredEvents.length === 0 && 
                    <Text style={{marginTop: 20}}>
                        There is no Event on {formatDate(selectedDate)}
                    </Text> 
                }
                <View style={{ height:110}}>
                    <Carousel 
                        data={filteredEvents}
                        renderItem={(event, index) => renderEvents(event, index)}
                        onSnapToItem={index => setActiveSlide(index)}
                        sliderWidth={optimumLayoutWidth}
                        itemWidth={optimumLayoutWidth}
                    />
                </View>
                <View>
                    <Pagination
                        dotsLength={filteredEvents.length}
                        activeDotIndex={activeSlide}
                        dotColor={config.secondaryColor}
                        inactiveDotColor={config.secondaryColor}
                        inactiveDotOpacity={0.4}
                        dotStyle={{
                            width: 15,
                            height: 15,
                            borderRadius: 10,
                        }}
                        inactiveDotStyle={{
                            width: 15,
                            height: 15,
                            borderRadius: 10,
                        }}
                        inactiveDotScale={0.8}
                    />
                </View>
               
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
    },
    calendarSection:{
        borderColor: '#f2f2f2',
        borderWidth: 4,
        borderStyle:'solid',
        borderWidth: 2,
        overflow:'hidden',
        borderTopColor: config.primaryColor,
        height: 'auto',
        marginTop: 15
    },
    calendarStyle:{
        borderWidth: 1,
        borderColor: '#f2f2f2',
        shadowOffset:{
            width: 5,
            height:2
        },
        shadowOpacity: 0.4
    },
    selectedStudent:{
        backgroundColor: config.primaryColor,
        color: 'white',
        margin: 5,
        maxWidth: 160,
        minWidth: 150,
        justifyContent: 'center'
    },
    unSelectedStudent:{
        backgroundColor: '#f2f2f2',
        margin: 5,
        maxWidth: 160,
        minWidth: 150,
        justifyContent: 'center'
    },
    selectedStudentText:{
        color: 'white',
    },
    unSelectedStudentText:{
        color: '#808080'
    },
})
  