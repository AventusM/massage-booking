import axios from "axios"
const baseUrl = "http://localhost:3001/api/users"

const getUsers = () => {
  return axios.get(baseUrl)
}

export default { getUsers }
