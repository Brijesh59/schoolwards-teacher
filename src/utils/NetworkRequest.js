import axios from 'axios'
import APIs from './api'
import config from './config'
 
export default class NetworkRequest{
    
    constructor(){
        this.options = {
            headers: {
                'content-type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        }
    } 

    async login(formData){
        try{
            const response = await axios.post(APIs.LOGIN, formData, this.options)
            return response.data
        }
        catch(error){
            console.log(error.toString())
            return error.message
        }
    }

    async getPendingContents(formData){
        try{
            const response = await axios.post(APIs.GET_PENDING_CONTENTS, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }

    async getEvent(eventType, id){
        const formData = new FormData()
        formData.append('appname', config.schoolName)
        try{
            const response = await axios.post(
                `${APIs.GET_EVENT}/${eventType}/${id}`, 
                 formData, 
                 this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }

    async getFeeDetails(formData){
        try{
            const response = await axios.post(
                `${APIs.GET_FEE}`, 
                 formData, 
                 this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }
    
    async updateRecievePushStatus(formData){
        try{
            const response = await axios.post(APIs.UPDATE_RECIEVE_PUSH_STATUS, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }

    async updateFCMToken(formData){
        try{
            const response = await axios.post(APIs.UPDATE_DEVICE_ID, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }

    async verifyOTP(formData){
        try{
            const response = await axios.post(APIs.VERIFY_OTP, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }

    async updateInteractionStatus(formData, url){
        try{
            const response = await axios.post(url, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }

    async getStudentsList(formData){
        try{
            const response = await axios.post(APIs.GET_STUDENTS_LIST, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }

    async pushSeriesEvent(formData){
        try{
            const response = await axios.post(APIs.PUSH_SERIES, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }
    
}