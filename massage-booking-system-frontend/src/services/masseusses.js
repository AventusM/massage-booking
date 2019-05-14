import axios from "axios"
const baseUrl = "http://localhost:3001/masseusses"

const getMasseusses = () => {
  return axios.get(baseUrl)
}

export default { getMasseusses }
