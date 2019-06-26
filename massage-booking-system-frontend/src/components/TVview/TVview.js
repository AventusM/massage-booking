import React, { useEffect } from 'react'
import Display from '../Display/Display'
import Clock from '../Clock/Clock'
import unity4 from '../../pics/unity4.png'
import moment from 'moment'
import formatStartDate from '../../utils/formatStartDate'
import DaysAppointmentsSimple from '../DaysAppointmentsSimple/DaysAppointmentsSimple'
import useResource from '../../hooks/useResource'


const TVview = () => {
  const [tv, tvService] = useResource('/api/tv')
  const now = moment()

  useEffect(() => {
    tvService.getAll()
  }, [])

  /* every 24 minutes force page refresh to keep next appointment up to date. */
  setInterval(() => {
    window.location.reload()
  }, 1440000)

  const announcement = tv.pop()

  if (announcement === undefined) {
    return null
  }

  /* Find next appointment */
  const comingAppointments = tv.filter((app) => {
    let appStartTime = moment(app.start_date)
    return appStartTime.isAfter(now)
  })

  comingAppointments.sort(function (a, b) {
    let dateA = new Date(a.start_date),
      dateB = new Date(b.start_date)
    return dateA - dateB
  })

  let next = comingAppointments[0]

  return (
    <div className="tv_view">
      <div>
        <Clock />

        <h2>NEXT APPOINTMENT</h2>
        {next ? <ul className="tvViewAppointmentList"><div className="cont_tv"><Display dateobject={formatStartDate(next.start_date)} key={next._id} user={next.user} ownPage={true} date={true} cancel={false} /></div>
        </ul> : ''}
        {announcement && announcement.message ?
          <div className="tv_notice">
            <h2>Notice</h2>
            <p>{announcement.message}</p>
          </div> : null
        }
        <img className="logoTV"
          id="unity4" src={unity4} alt=""></img>
      </div>
      <div className="day-view"><DaysAppointmentsSimple dayNumber={1} lastdayWithAppointments={0} appointments={tv} /></div>
      <div className="day-view"><DaysAppointmentsSimple dayNumber={2} lastdayWithAppointments={0} appointments={tv} /></div>

      <div>

      </div>
    </div>

  )
}

export default TVview