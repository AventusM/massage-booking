const User = require('../models/user')
const  moment = require('moment');


const userAllowedToMakeAppointment = async (userID, appointmentDate) => {
    let user = null
    try {
        user = await User.findOne({ _id: userID }).populate('appointments')
        //console.log('user in useralloewdTomakeappointment', user, 'type of user', typeof(user))
        let existingAppointments = user.appointments
        existingAppointments.map(appointment => appointment.start_date)
        existingAppointments.filter((date) => {

        })
        
    } catch (exception) {
        console.log('exception in UserAllowedToMakeAppointment', exception)
    }

    
} 

module.exports = userAllowedToMakeAppointment