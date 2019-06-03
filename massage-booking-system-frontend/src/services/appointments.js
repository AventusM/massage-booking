import axios from 'axios'
const baseUrl = '/api/appointments'

const getAppointments = () => {
  return axios.get(baseUrl)
}
const updateAppointment = (id, appointment) => {
  return axios.put(`${baseUrl}/${id}`, appointment)
}

export default { getAppointments, updateAppointment }
