import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage'
import app_config from './config'
import NetworkRequest from './NetworkRequest'
import {
    addTeacher, getTeacher, 
    addEvents, getEventById, getAllEvents, 
    updateEventAttatchmentUri, updateEventInteraction} 
from '../db'

export function formatDateTime(dateTime = '2020-02-22 15:10:00'){
    /* Input Date Format: = '2020-02-22 15:10:00' */
    /* Return Date Format: '22 Feb 2020, 3:10 PM' */

    let [fullDate, time] = dateTime.split(' ')
    let [year, month, date ] = fullDate.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = monthNames[parseInt(month) - 1]

    let [hr, min, sec] = time.split(':')
    let AM_PM = 'AM'

    if(hr > 12) {
        AM_PM = 'PM'
        hr = hr - 12
    }

    return `${date} ${month} ${year}, ${hr}:${min} ${AM_PM}`
}

export function formatDate(date = '2020-02-22'){
    /* Input Date Format: = 2020-02-22 */
    /* Return Date Format: February 22, 2020 */

    let [year, month, day] = date.split('-')
    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 
        'November', 'December'
    ]
    month = months[ month >= 10 ? month - 1: month%10 - 1 ]
    return month + ' ' + day + ', ' + year
}

export function getCurrentDate(){
    /* Return Date Format: 2020-02-24 */

    const date = new Date()

    let day = date.getDate()
    day = day >= 10 ? day : '0' + day 

    let month = date.getMonth() + 1
    month = month >= 10 ? month : '0' + month

    return date.getFullYear() + '-' + month + '-' + day
}

export function getTime(){
    /* Return DateTime Format: '2020-02-24 15:34:20'*/
    
    const date = new Date()

    let day = date.getDate()
    day = day >= 10 ? day : '0' + day 

    let month = date.getMonth() + 1
    month = month >= 10 ? month : '0' + month

    return date.getFullYear() + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

export function convertObjToArray(obj){
    const arr = []
    for(let key in obj ){
        arr.push(obj[key])
    }
    return arr
}   

export async function getData(){
    /* Returns an Object like: { teacher: [], events: [] } */
    try{
        const teacher = await getTeacher()
        const events = await getAllEvents()
        const data = {
            teacher: [...convertObjToArray(teacher)],
            events: [...convertObjToArray(events)]
        }
        return data
    }
    catch(error){
        console.log('Error in getData(): ', error)
        return { teacher: [], events: [] }
    }
}

export async function getTeacherDetails(){
    try{
        const teacher = await getTeacher()
        return [...convertObjToArray(teacher)][0]
    }
    catch(error){
        console.log('Error in getData(): ', error)
        return { }
    }
}

export async function getEvent(eventId){
    const event = await getEventById(eventId)
    return event["0"]
}

export async function addTeacherAndEventsUponLogin(teacher, classDetails, events, eventsResponse, commonEvents, commonEventsResponse){

    let teacherData = {}
    const eventsData = []
    try{
        // Saving teacher details
        let profileUrl = ''
        if(teacher.photo){
            profileUrl = await cacheFile(teacher.photo)
        }
       
        teacherData = {
            teacherId: teacher.id,
            employeeId: teacher.prn_no,
            firstName: teacher.first_name,
            name: `${teacher.first_name} ${teacher.middle_name} ${teacher.last_name}`,
            dateOfBirth: teacher.dob,
            gender: teacher.gender,
            profileImage: profileUrl,
            address: `${teacher.address}`,
            city: teacher.city,
            pincode: teacher.pincode,
            mobileNo: teacher.mobile_no,
            email: teacher.email,
            bloodGroup: teacher.blood_group,
            aadharNo: teacher.aadhar_no,
            role: teacher.role,
            designation: teacher.designation,
            joiningDate: teacher.joining_date,
            leavingDate: teacher.leaving_date,
            ref_id: teacher.ref_id,
            staffId: teacher.staffid,
            syfid: teacher.syfid,
            classDetails: JSON.stringify(classDetails),
            username: teacher.username,
            password: teacher.password
        } 

        // Saving teacher events
        events.forEach(event => {
            const NIA_NDA = event.non_interaction_attributes.non_display_attributes
            const NIA_DA  = event.non_interaction_attributes.display_attributes
            const IA_NDA = event.interaction_attributes.non_display_attributes
            const IA_INTERACTIONS   = event.interaction_attributes.interactions
            eventsData.push({
                id: NIA_NDA.id,
                title: NIA_DA.name,
                description: NIA_DA.description,
                type: NIA_DA.series ? NIA_DA.series : 'Event',
                createdOn: NIA_DA.created_on,
                dateTime: NIA_DA.date_time,
                attatchment: NIA_DA.url != "" ? NIA_DA.url : '',
                attatchmentExtention: NIA_NDA.type,
                venue: NIA_DA.venue,
                staffId: teacherData.staffId,
                interactionSubmitUrl: IA_NDA.submit_url,
                interactionTypeYes: JSON.stringify(IA_INTERACTIONS.yes),
                interactionTypeNo: JSON.stringify(IA_INTERACTIONS.no),
                interactionTypeMaybe: JSON.stringify(IA_INTERACTIONS.maybe),
                interactionResponse: ''
            })
        })

        eventsResponse.forEach(eventResponse => {
            const data = eventsData.find(e => e.id === eventResponse.event_id)
            data.interactionResponse = eventResponse.response
        })

        // Saving Common events
        commonEvents.forEach(event => {
            const NIA_NDA = event.non_interaction_attributes.non_display_attributes
            const NIA_DA  = event.non_interaction_attributes.display_attributes
            const IA_NDA = event.interaction_attributes.non_display_attributes
            const IA_INTERACTIONS  = event.interaction_attributes.interactions
            eventsData.push({
                id: NIA_NDA.id,
                title: NIA_DA.name,
                description: NIA_DA.description,
                type: NIA_DA.series ? NIA_DA.series : 'Event',
                createdOn: NIA_DA.created_on,
                dateTime: NIA_DA.date_time,
                attatchment: NIA_DA.url != "" ? NIA_DA.url : '',
                attatchmentExtention: NIA_NDA.type,
                venue: NIA_DA.venue,
                staffId: '',
                interactionSubmitUrl: IA_NDA.submit_url,
                interactionTypeYes: JSON.stringify(IA_INTERACTIONS.yes),
                interactionTypeNo: JSON.stringify(IA_INTERACTIONS.no),
                interactionTypeMaybe: JSON.stringify(IA_INTERACTIONS.maybe),
                interactionResponse: ''
            })
        })

        commonEventsResponse.forEach(eventResponse => {
            const data = eventsData.find(e => e.id === eventResponse.event_id)
            data.interactionResponse = eventResponse.response
        })

        await addTeacher(teacherData)
        await addEvents(eventsData)

        return true
    }
    catch(error){
        console.log('Error in saving teacher & events: ', error)
        return false
    }
}

export async function updateEventAttatchment(eventId, attatchmentUri){
    await updateEventAttatchmentUri(eventId, attatchmentUri)
}

export async function updateEventInteractionResponse(eventId, response){
    const data = await updateEventInteraction(eventId, response)
    return data
}

export async function cachePayloadData(){

    const [staffId, fcmToken] = await AsyncStorage.multiGet(["staffId", "fcmToken"])
    const networkRequest = new NetworkRequest()
    const formData = new FormData()
    formData.append('staff_id', staffId[1])
    formData.append('device_id', fcmToken[1])
    formData.append('appname', app_config.schoolName)
    const data = await networkRequest.getPendingContents(formData) 
    console.log('GET PENDINGCONTENT: ', data)
    if(data.device_valid === 'yes'){
      if(data.pending_objects.length === 0){
        return
      }  
      const [events, objects] = await fetchEachEvent(data.pending_objects)
     
      // save fetched Events
      await addEvents(events)

      // Notify the server that Notification has been recieved ...
      const formData2 = new FormData()
      formData2.append('mobile_no',  staffId[1])
      formData2.append('device_id', fcmToken[1])
      formData2.append('objects', JSON.stringify(objects))
      formData2.append('appname', app_config.schoolName)
      await networkRequest.updateRecievePushStatus(formData2) 
    }
    else if(data.device_valid === 'no'){
        console.log("Invalid Device ID. Loggin you out ...")
        return 'failure'
    }
      
}

export async function cacheFile(uri, type = 'png'){
    if(uri === '' || uri === null){
        return ''
    }
    let extention = 'png'
    switch(type){
        case 'image': 
            extention = 'png'
            break;
        case 'pdf': 
            extention = 'pdf'
            break;
        default: 
            extention = 'png'  
    }
    try {
        const options = {
            fileCache: true, 
            appendExt: extention
        }
        const res = await RNFetchBlob.config(options).fetch('GET', uri)
        if(res.info().status == 200) {
            console.log('The file saved to: ', res.path())
            return {
                isFileSaved: true,
                filePath: res.path()
            }
        } 
        return {
            isFileSaved: false
        }
    }
    catch(error){
        console.log('The file is not saved: ', error)
        return {
            isFileSaved: false
        }   
    }
}

async function fetchEachEvent(pendingObjects){
    
    const networkRequest = new NetworkRequest()
    const events = []
    const objects = []
    for(const obj of pendingObjects){
        
        const data = await networkRequest.getEvent(obj.type, obj.id)
        
        if(data && data.non_interaction_attributes){ 
            const NIA_NDA = data.non_interaction_attributes.non_display_attributes
            const NIA_DA  = data.non_interaction_attributes.display_attributes  
            const IA_NDA  = data.interaction_attributes
            const IA_INTERACTIONS = data.interaction_attributes
            events.push({
                id: NIA_NDA.id,
                title: NIA_DA.title || NIA_DA.name || '',
                description: NIA_DA.body || NIA_DA.desc || NIA_DA.description || '',
                type: NIA_DA.series ? NIA_DA.series : 'Event',
                createdOn: NIA_DA.created_on,
                dateTime: NIA_DA.date_time || '',
                attatchment: NIA_NDA.attachment_url ? NIA_NDA.attachment_url : '',
                attatchmentExtention: NIA_NDA.type || '',
                venue: NIA_DA.venue || '',
                staffId: obj.staff_id,
                interactionSubmitUrl: IA_NDA ? IA_NDA.non_display_attributes.submit_url : '',
                interactionTypeYes: IA_INTERACTIONS ? JSON.stringify(IA_INTERACTIONS.interactions.yes) : '',
                interactionTypeNo: IA_INTERACTIONS ? JSON.stringify(IA_INTERACTIONS.interactions.no) : '',
                interactionTypeMaybe: IA_INTERACTIONS ? JSON.stringify(IA_INTERACTIONS.interactions.maybe) : '',
                interactionResponse: ''
            })
            objects.push({
                id: obj.id,
                type: obj.type,
                datetime: getTime(),
                timezone: 'GMT 5:30'
            })
        }
    }
    return [events, objects]
}

export async function getStudentsByClass(standard, division) {
    const formData = new FormData()
    formData.append('request_data', JSON.stringify({standard, division}))
    formData.append('appname', app_config.schoolName)
    const networkRequest = new NetworkRequest()
    const data = await networkRequest.getStudentsList(formData)
    return data.students
}

export async function postInteractionDetails(details, url) {
    const [mobile, fcmToken] = await AsyncStorage.multiGet(["mobile", "fcmToken"])
    const formData = new FormData()
    formData.append('type', details.type)
    formData.append('id', details.eventId)
    formData.append('student_id', details.staff_id)
    formData.append('tag_name', details.tag_name)
    formData.append('device_id', fcmToken[1])
    formData.append('mobile_no', mobile[1])
    formData.append('appname', app_config.schoolName)
    const networkRequest = new NetworkRequest()
    const data = await networkRequest.updateInteractionStatus(formData, url)
    return data
}


/* PUSH NOTIFICATIONS */
export async function pushSeriesEvents(requestData) {
    const formData = new FormData()
    formData.append('request_data', JSON.stringify(requestData))
    formData.append('appname', app_config.schoolName)
    const networkRequest = new NetworkRequest()
    const data = await networkRequest.pushSeriesEvent(formData)
    return data
}