import React from 'react'
import { StyleSheet } from 'react-native'
import FeatherIcon    from 'react-native-vector-icons/Feather'
import OcticonsIcon    from 'react-native-vector-icons/Octicons'
import IoniconsIcon    from 'react-native-vector-icons/Ionicons'
import SimpleLineIcon   from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcon   from 'react-native-vector-icons/MaterialCommunityIcons'
import FontistoIcon   from 'react-native-vector-icons/Fontisto'
import AntDesign   from 'react-native-vector-icons/AntDesign'
import { Icon }       from 'native-base'
import config from '../../utils/config'

const CalendarIcon     = ({style}) => <Icon name='calendar' style={[styles.iconStyle, style]} />
const PushNotificationIcon  = ({style}) => <MaterialIcon name='telegram' style={[styles.iconStyle, style]} />
const ProfileIcon     = ({style}) => <Icon name='contact' style={[styles.iconStyle, style]} />
const CallIcon         = ({style}) => <Icon name='call' style={[styles.iconStyle, style]} />
const SettingsIcon     = ({style}) => <Icon name='settings' style={[styles.iconStyle, style]} />
const MenuIcon         = ({style}) => <Icon name='menu' style={[styles.iconStyle, style]} />
const BackIcon         = ({style}) => <Icon name='arrow-back' style={[styles.iconStyle, style]} />
const AnnouncementIcon = ({style}) => <OcticonsIcon name='megaphone' style={[styles.iconStyle, style]} />
const HomeworkIcon     = ({style}) => <SimpleLineIcon name='book-open' style={[styles.iconStyle, style]} />
const MessageIcon      = ({style}) => <FontistoIcon name='email' style={[styles.iconStyle, style]} />
const NewsIcon         = ({style}) => <MaterialIcon name='newspaper' style={[styles.iconStyle, style]} />
const TimetableIcon    = ({style}) => <Icon name='listbox' style={[styles.iconStyle, style]} />
const ContactIcon      = ({style}) => <Icon name='contact' style={[styles.iconStyle, style]} />
const ContactsIcon     = ({style}) => <Icon name='contacts' style={[styles.iconStyle, style]} />
const TagIcon          = ({style}) => <Icon name='pricetag' style={[styles.iconStyle, style]} />
const FilterIcon       = ({style}) => <FeatherIcon  name='filter' style={[styles.iconStyle, style]} />
const SortIcon         = ({style}) => <MaterialIcon name='sort-descending' style={[styles.iconStyle, style]} />
const LogoutIcon       = ({style}) => <AntDesign    name='logout' style={[styles.iconStyle, style]} />

const AttendanceIcon   = ({style}) => <IoniconsIcon name='ios-people' style={[styles.iconStyle, style]} />
const EventIcon        = ({style}) => <SimpleLineIcon name='event' style={[styles.iconStyle, style]} />
const ActivityLogIcon  = ({style}) => <IoniconsIcon name='logo-buffer' style={[styles.iconStyle, style]} />


const styles = StyleSheet.create({
    iconStyle:{
        color: config.primaryColor,
        fontSize: 22
    }
});

export {
    CalendarIcon,
    PushNotificationIcon,
    ProfileIcon,
    CallIcon,
    ContactsIcon,
    SettingsIcon,
    MenuIcon,
    BackIcon,
    AnnouncementIcon,
    HomeworkIcon,
    MessageIcon,
    NewsIcon,
    TimetableIcon,
    ContactIcon,
    TagIcon,
    FilterIcon,
    SortIcon,
    LogoutIcon,
    AttendanceIcon,
    EventIcon,
    ActivityLogIcon
}