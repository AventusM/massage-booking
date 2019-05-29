const Appointment = require('../models/appointment')
const  moment = require('moment');


const userAllowedToMakeAppointment = async (usersAppointmentList, requestedAppointmentID) => {
    try {
        const appointment = await Appointment.findById(requestedAppointmentID)
        let usersPreviousMassageTimes = usersAppointmentList.map(appointment => appointment.start_date)
        console.log('users appointment history ', usersPreviousMassageTimes)
        let appointmentTimeMoment = moment(appointment.start_date)
        console.log('appointmentTimeMoment', appointmentTimeMoment)
        usersPreviousMassageTimes = usersPreviousMassageTimes.filter((prevTime) => {
            let prevTimeMoment = moment(prevTime)
            let dayDifference = appointmentTimeMoment.diff(prevTimeMoment, 'days')
            console.log('day difference', dayDifference)
            return Math.abs(dayDifference) < 14
            })

        console.log('users appointmentList', usersPreviousMassageTimes)
        //console.log('requested appointment', appointment)
        console.log('appointments less than 2 weeks ago', usersPreviousMassageTimes.length)
        return usersPreviousMassageTimes.length === 0
    } catch (error) {
        console.log('error in rule checker', error)
    }
   

    
} 

module.exports = userAllowedToMakeAppointment