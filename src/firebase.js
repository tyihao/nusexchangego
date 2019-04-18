import { initializeApp } from 'firebase'

const app = initializeApp({
    apiKey: 'AIzaSyCoVsvYpHImj8ZYgoQQkUeP_CfqI0riAtU',
    authDomain: 'nusexchangego.firebaseapp.com',
    databaseURL: 'https://nusexchangego.firebaseio.com',
    projectId: 'nusexchangego',
    storageBucket: 'nusexchangego.appspot.com',
    messagingSenderId: '539387633128'
})

export const db = app.database()
export const coreModulesRef = db.ref('Core Modules')
export const moduleMappingsRef = db.ref('Module Mappings')
export const reviewsRef = db.ref('Universities Reviews')
export const universitiesRef = db.ref('Partner Universities')
export const programEnrolmentRef = db.ref('Program Enrolment')
export const moduleEnrolmentRef = db.ref('Module Enrolment')
export const compareUniversitiesDataRef = db.ref('Compare Universities Data')
export const universityDetailsDataRef = db.ref('University Details Data')
export const moduleReviewsDataRef = db.ref('Module Reviews Data')
