import React, { Fragment } from 'react'

const Stats = ({ stats }) => {
  let numberOfUnusedPastAppointments = stats.numberOfUnusedPastAppointments
  let numberOfPastAppointments = stats.numberOfPastAppointments
  let numberOfUsers = stats.numberOfUsers
  let totalAppointmentsUsed = stats.totalAppointmentsUsed
  let mostAppointmentsBySingleUser = stats.mostAppointmentsBySingleUser
  let usersWhoHaveUsedMassage = stats.usersWhoHaveUsedMassage

  return (
    <Fragment>
      <div className= "statsWrapper">
      <h1>Statistics</h1>      
      <ol>     
      <hr/>          
      <li><a>
        {` ${(
          (numberOfUnusedPastAppointments / numberOfPastAppointments) *
          100
        ).toFixed(1)} % of possible appointments went unused`}{' '}
      </a></li>    
   
      <li><a>{`Number of users ${numberOfUsers}`}</a></li>
      <li><a>{`Number of users who have used massages ${usersWhoHaveUsedMassage}`}</a></li>
      <li><a>{`Number of appointments needed per week if all active users fully utilize their massages ${usersWhoHaveUsedMassage / 2} (users who have made appointments are considered active)`}</a></li>
      <li><a>{`Average appointments per user ${(
        totalAppointmentsUsed / numberOfUsers
      ).toFixed(2)}`}</a></li>
      <li><a>{`Most appointments by single user  ${mostAppointmentsBySingleUser}`}</a></li>
      </ol>
    </div>
    </Fragment>
  )
}

export default Stats
