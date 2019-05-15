import axios from "axios"
const baseUrl = "/api/appointments"

const getAppointments = () => {
  return axios.get(baseUrl)
}

export default { getAppointments }
