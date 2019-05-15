import axios from "axios"
const baseUrl = "/api/masseusses"

const getMasseusses = () => {
  return axios.get(baseUrl)
}

export default { getMasseusses }
