export const TEACHER_SCHEMA = 'Teacher'
export const EVENT_SCHEMA = 'Event'

export const TeacherSchema = {
    name: TEACHER_SCHEMA,
    primaryKey: 'name',
    properties: {
        teacherId: 'string?',
        employeeId: 'string?',
        firstName: 'string?',
        name: 'string?',
        dateOfBirth: 'string?',
        gender: 'string?',
        profileImage: 'string?', 
        address: 'string?',
        city: 'string?',
        pincode: 'string?',
        mobileNo: 'string?',
        email: 'string?',
        bloodGroup: 'string?',
        aadharNo: 'string?',
        role: 'string?',
        designation: 'string?',
        joiningDate: 'string?',
        leavingDate: 'string?',
        ref_id: 'string?',
        staffId: 'string?',
        syfid: 'string?',
        isDeleted: {
            type: 'bool',
            default: false
        },
        classDetails: 'string?',
        username: 'string',
        password: 'string'
    }
}

export const EventSchema = {
    name: EVENT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        description: 'string',
        type: 'string',
        createdOn: 'string',
        dateTime: 'string',
        attatchment: 'string',
        attatchmentExtention: 'string',
        venue: 'string',
        staffId: 'string?',
        isDeleted: {
            type: 'bool',
            default: false
        },
        interactionSubmitUrl: 'string?',
        interactionTypeYes: 'string?',
        interactionTypeNo: 'string?',
        interactionTypeMaybe: 'string?',
        interactionResponse: 'string?'
    }
}
