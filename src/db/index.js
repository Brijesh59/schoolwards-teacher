import Realm from 'realm'
import {TeacherSchema, EventSchema, TEACHER_SCHEMA, EVENT_SCHEMA} from './schema'

const databaseOptions = {
    path: 'storage.realm',
    schema: [TeacherSchema, EventSchema]
}

/* Teacher Related actions */
export const addTeacher = teacher => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            try{
                realm.write(()=>{
                    realm.create(TEACHER_SCHEMA, teacher, 'modified')
                })
                resolve(teacher)
            }
            catch(err){
                throw new Error(err)
            }
        })
        .catch(error => reject(error))
})

export const getTeacher = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            const teacher = realm.objects(TEACHER_SCHEMA)
            resolve(teacher)
        })
        .catch(error => reject(error))
})

/* Event Related actions */
export const addEvent = event => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        try{
            realm.write(()=>{
                realm.create(EVENT_SCHEMA, event, 'modified')
            })
            resolve(event)
        }
        catch(err){
            throw new Error(err)
        }
    })
    .catch(error => reject(error))
})

export const addEvents = events => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        try{
            realm.write(()=>{
                events.forEach(event => {
                    realm.create(EVENT_SCHEMA, event, 'modified')
                });
            })
            resolve(events)
        }
        catch(err){
            throw new Error(err)
        }
    })
    .catch(error => reject(error))
})

export const getEventById = eventId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            const events = realm.objects(EVENT_SCHEMA)
            const filteredEvent = events.filtered(`id = "${eventId}" AND isDeleted = false`)
            resolve({...filteredEvent})
        })
        .catch(error => reject(error))
})

export const getAllEvents = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            const data = realm.objects(EVENT_SCHEMA)
            const events = data.filtered(`isDeleted = false`)
            resolve({...events})
        })
        .catch(error => reject(error))
})

export const updateEventAttatchmentUri = (eventId, attatchmentUri) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(()=>{
            let eventToUpdate = realm.objectForPrimaryKey(EVENT_SCHEMA, eventId)
            eventToUpdate.attatchment = attatchmentUri
            resolve({...eventToUpdate})
        }) 
    })
    .catch(error => reject(error))
})

export const updateEventInteraction = (eventId, interactionResponse) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(()=>{
            let eventToUpdate = realm.objectForPrimaryKey(EVENT_SCHEMA, eventId)
            eventToUpdate.interactionResponse = interactionResponse
            resolve({...eventToUpdate})
        }) 
    })
    .catch(error => reject(error))
})

export const deleteAllData = ()=> new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(()=>{
            const allEvents = realm.objects(EVENT_SCHEMA)
            const allTeachers = realm.objects(TEACHER_SCHEMA)
            for(const key in allEvents){
                allEvents[key].isDeleted = true
            }
            for(const key in allTeachers){
                allTeachers[key].isDeleted = true
            }
        })
        resolve('All data deleted(isDeleted set to true)')
    })
    .catch(error => reject(error))
})

export const deleteUnusedData = ()=> new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(()=>{
            const allEvents = realm.objects(EVENT_SCHEMA)
            const allTeachers = realm.objects(TEACHER_SCHEMA)
            const filteredEvents = allEvents.filtered(`isDeleted = true`)
            const filteredTeachers = allTeachers.filtered(`isDeleted = true`)
            realm.delete(filteredEvents)
            realm.delete(filteredTeachers)
        })
        resolve('Unused Data wiped successfully')
    })
    .catch(error => reject(error))
})

