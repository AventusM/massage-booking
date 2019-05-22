const createEmptyAppointment =(date)=>{
    const appointment = new Appointment({
        date: date,
        status = 0
      })
      try {
    // Create appointment
    const saveAppointment = await appointment.save()
      } catch (exception) {
        next(exception)
    }
}
    // create several 

    const generateAppoinmentsForDay =(date)=>{
        date.setHours(8)
        date.setMinutes(55)
        date.setSeconds(0)

        for (i = 0; i < 13;i++){
            date = increaseTime(25, date)
            createEmptyAppointment(date)          
        }
    }
    //logic for minute increase
    const increaseTime = (minutes, currentTime) => {
        let currentMinutes = currentTime.getMinutes()

        currentMinutes += minutes
        if(currentMinutes > 59){
            currentTime.setHours(currentTime + 1)
            currentMinutes = currentMinutes - 60
        }
        currentTime.setMinutes(currentMinutes)
        
        return currentTime
    } 
module.exports = generateAppoinmentsForDay


