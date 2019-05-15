import axios from "axios"
const baseUrl = "/api/users"

const getUsers = () => {
  return axios.get(baseUrl)
}

export default { getUsers }
