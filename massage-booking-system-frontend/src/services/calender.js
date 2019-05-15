import axios from "axios"
const baseUrl = "http://localhost:3001/calender"

const getTimes = () => {
  return axios.get(baseUrl)
}

export default { getTimes }
