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
      <h1>Stats</h1>
      <p>
        {` ${(
          (numberOfUnusedPastAppointments / numberOfPastAppointments) *
          100
        ).toFixed(1)} % of possible appointments went unused`}{' '}
      </p>
      <p>{`Number of users ${numberOfUsers}`}</p>
      <p>{`Number of users who have used massages ${usersWhoHaveUsedMassage}`}</p>
      <p>{`Number of appointments needed per week if all active users fully utilize their massages ${usersWhoHaveUsedMassage / 2} (users who have made appointments are considered active)`}</p>
      <p>{`Average appointments per user ${(
        totalAppointmentsUsed / numberOfUsers
      ).toFixed(2)}`}</p>
      <p>{`Most appointments by single user  ${mostAppointmentsBySingleUser}`}</p>
    </Fragment>
  )
}

export default Stats
