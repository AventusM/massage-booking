import axios from "axios"
const baseUrl = "http://localhost:3001/users"

const getUsers = () => {
  return axios.get(baseUrl)
}

export default { getUsers }
