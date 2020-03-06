import React from 'react'
import { BackHandler } from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'

import OnBoarding   from '../screens/OnBoarding'
import Login        from '../screens/Login'
import Details      from '../screens/Details'
import SplashScreen from '../screens/SplashScreen'
import Home         from '../screens/Home'
import Profile      from '../screens/navigation/Profile'
import ContactUs    from '../screens/navigation/ContactUs'
import AboutUs      from '../screens/navigation/AboutUs'
import Calender     from '../screens/navigation/Calender'
import Setting      from '../screens/navigation/Setting'
import FeeDetails   from '../screens/navigation/FeeDetails'

import PushNotificationDashboard   from '../screens/push-notifications'
import Announcement   from '../screens/push-notifications/Announcement'
import Homework   from '../screens/push-notifications/Homework'
import Attendance   from '../screens/push-notifications/Attendance'
import Message   from '../screens/push-notifications/Message'
import Event   from '../screens/push-notifications/Event'
import ActivityLog   from '../screens/push-notifications/ActivityLog'


class RouterComponent extends React.Component {
    componentDidMount(){
        console.log('Router Mounted')
        BackHandler.addEventListener('hardwareBackPressed', this.handleHardwareBackPress)
    }

    handleHardwareBackPress = () => {
        console.log("Back Button Pressed")
        switch(Actions.currentScene){
            case 'splashScreen':
                BackHandler.exitApp()
                break;
            case 'onBoarding':
                BackHandler.exitApp()
                break;
            case 'auth':
                BackHandler.exitApp()
                break;
            case 'login':
                BackHandler.exitApp()
                break;
            case 'dashboard':
                BackHandler.exitApp()
                break;
            default: 
                Actions.pop()
        }
        return true;
    }

    componentWillUnmount(){
        console.log('Router Un-Mounted')
        BackHandler.removeEventListener('hardwareBackPressed', this.handleHardwareBackPress)
    }

    render(){
        return (
            <>
                <Router>
                    <Scene key="root" hideNavBar >
                        
                        <Scene 
                            key="splashScreen" 
                            component={SplashScreen} 
                            initial/>
                    
                        <Scene 
                            key="onBoarding" 
                            hideNavBar>
                            <Scene 
                                key="onBoardingScreeen" 
                                component={OnBoarding} />
                        </Scene>

                        <Scene 
                            key="auth" 
                            hideNavBar
                            gesturesEnabled={false}>
                            <Scene 
                                key="login" 
                                component={Login} />
                        </Scene>
                        <Scene 
                            gesturesEnabled={false}
                            key="dashboard" 
                            component={Home} />
                        <Scene 
                            key="details" 
                            component={Details} />
                        <Scene
                            key="profileScreen"
                            component={Profile} />
                        <Scene
                            key="calenderScreen"
                            component={Calender} />
                        <Scene
                            key="contactUsScreen"
                            component={ContactUs} />
                        <Scene
                            key="aboutUsScreen"
                            component={AboutUs} />
                        <Scene
                            key="settingScreen"
                            component={Setting} />
                        <Scene
                            key="detailsScreen"
                            component={Details} />
                        <Scene
                            key="feeScreen"
                            component={FeeDetails} />

                        <Scene
                            key="pushNotificationDashboardScreen"
                            component={PushNotificationDashboard} /> 
                        <Scene
                            key="announcementScreen"
                            component={Announcement} /> 
                        
                        <Scene
                            key="homeworkScreen"
                            component={Homework} /> 
                        <Scene
                            key="attendanceScreen"
                            component={Attendance} /> 
                        <Scene
                            key="messageScreen"
                            component={Message} /> 
                        <Scene
                            key="eventScreen"
                            component={Event} /> 
                        <Scene
                            key="activityLogScreen"
                            component={ActivityLog} />   
                    </Scene> 
                </Router>   
            </>
        )
    }
}

export default RouterComponent;