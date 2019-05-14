import axios from "axios"
const baseUrl = "http://localhost:3001/appointments"

const getAppointments = () => {
  return axios.get(baseUrl)
}

export default { getAppointments }
