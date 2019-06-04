const Appointment = require('../models/appointment')
const  moment = require('moment')


const userAllowedToMakeAppointment = async (usersAppointmentList, requestedAppointmentID) => {
    try {
        const appointment = await Appointment.findById(requestedAppointmentID)
        let usersPreviousMassageTimes = usersAppointmentList.map(appointment => appointment.start_date)
        console.log('users appointment history ', usersPreviousMassageTimes)

        let now = moment()
        let appointmentTimeMoment = moment(appointment.start_date)
        console.log('appointmentTimeMoment', appointmentTimeMoment)

        if(appointmentTimeMoment.isBefore(now)) { // cant book past times
            console.log('Tried to book past date')
            return false
        }

        let appointmentWeekOfYear =  appointmentTimeMoment.week
        let appointmentsFirstDayOfTheWeek = appointmentTimeMoment.startOf('week')
        console.log('first day of the week appoint is being booked in', appointmentsFirstDayOfTheWeek)
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