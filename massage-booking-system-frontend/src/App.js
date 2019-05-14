import React,{useState, useEffect} from 'react'
import appointmentService from './services/appointments'
import axios from 'axios'
const App = (props) => {
    const [appointments, setAppointments] = useState([])

useEffect(()=>{
    appointmentService
    .getAppointments()
}
)

    const listAppointments = () =>{
        appointments.map(u =>
            <p>{u.id}</p>)
    }


return (
    <div>
    <div>
        {listAppointments}
     </div>   
   <div>
       <button>Book a Massage</button> 
       <button>My Appointments</button>
   </div>
   </div> 
   
)
}

export default App