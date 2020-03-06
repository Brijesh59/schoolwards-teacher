import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import ActivityLoader from '../components/common/ActivityLoader'
import { Actions } from 'react-native-router-flux'
import CustomButton from '../components/common/CustomButton'
import app_config from '../utils/config'
import NetworkRequest from '../utils/NetworkRequest'
import {addTeacherAndEventsUponLogin} from '../utils/functions'
import config from '../utils/config'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      value: '',
      username: '',
      password: '',
      isLoading: false,
      data: '',
      deviceid: '',
      devicetype: DeviceInfo.getSystemName()
    }
  }
  componentDidMount = async() => {                        
    const fcmToken = await AsyncStorage.getItem('fcmToken')
    this.setState({deviceid: fcmToken})
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
      data: ''
    })  
  }

  handleLogin = async() => {
    Keyboard.dismiss()
    
    if(!this.state.username || !this.state.password){
      this.setState({ data: {response: "invalid credentials"}, value: ''})
      return
    }

    this.setState({isLoading: true, data: ''})

    let formData = new FormData()
    formData.append('appname', app_config.schoolName)
    const requestData = {
      username: this.state.username,
      password: this.state.password,
      deviceid: this.state.deviceid,
      devicetype: this.state.devicetype,
      app_version: app_config.version
    }
    formData.append('request_data', JSON.stringify(requestData))
    const networkRequest = new NetworkRequest()
    const data = await networkRequest.login(formData)
    
    if(data.response === 'success'){
      console.log("Teacher Data", JSON.stringify(data))
      await AsyncStorage.setItem('mobile', data.profile.mobile_no)
      await AsyncStorage.setItem('staffId', data.profile.staffid)
      const isSaved = await addTeacherAndEventsUponLogin(data.profile, data.class, data.events, data.events_response, data.common_events, data.common_events_response)
      this.setState({isLoading: false, data})
      if(!isSaved){
        console.log('Data could not be saved upon login.') 
        this.setState({ data: {response: "Something went wrong.\nPlease try Again ..."}})
        return 
      }
      
      // if data is saved, update fcmToken(deviceId) on server
      let formData = new FormData();
      formData.append('staff_id', data.profile.staffid)
      formData.append('device_id', this.state.deviceid)
      formData.append('appname', app_config.schoolName)
      console.log('FormData: ', data.profile.staffid, this.state.deviceid, app_config.schoolName)
      const response = await networkRequest.updateFCMToken(formData)
      if(response.status === 'success'){
        console.log('FCM Token Updated on the server: ', response.toString()) 
        await AsyncStorage.setItem('isUserLoggedIn', 'true')
        await AsyncStorage.setItem('username', this.state.username)
        await AsyncStorage.setItem('password', this.state.password)
        Actions.dashboard()
      } 
      else{
        console.log('FCM Token failed to Update on the server ...') 
        this.setState({ data: {response: "Something went wrong.\nPlease try Again ..."}})
        return
      } 
    }
    else if(data.response === 'failure'){
      this.setState({ isLoading: false, data: {response: "invalid credentials"}})
    }
    else{
      this.setState({ isLoading: false, data: {response: "Network Error"}})
    }

  }

  render() {
    console.log('Login Screen Re-rendered ...')
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Log In
        </Text>
        <TextInput
          type="username"
          style={styles.input}
          onChangeText={text => this.handleChange('username', text)}
          value={this.state.username}
          placeholder="Username"
          autoCompleteType="off"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.handleChange('password', text)}
          value={this.state.password}
          placeholder="Password"
          autoCompleteType="off"
        />
        <CustomButton 
          title='Log In'
          onPressFunction={this.handleLogin}
          style={{marginTop: 20, width:'60%'}}
          disabled={this.state.isLoading}
        />
        { this.state.isLoading && <ActivityLoader /> }
        { this.state.data.response && this.state.data.response!='success' && 
          <Text style={styles.errorStyle}>
            {this.state.data.response}
          </Text> 
        }   
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 150
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: config.primaryColor
  },
  subTitle:{
    fontSize: 17,
    width: 250,
    textAlign: 'center',
    margin: 10,
    color: '#808080'
  },
  input:{
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width:'70%', 
    marginTop: 20, 
    padding:10
  },
  errorStyle: {
    width: '70%',
    marginTop: 20,
    backgroundColor: '#ffcdd2',
    padding: 10,
    textAlign: 'center',
    borderColor: '#f44336',
    borderWidth: 1
  }

})

export default Login