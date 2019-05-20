import axios from "axios"
const baseUrl = "/api/users"

const getUsers = () => {
  return axios.get(baseUrl)
}
const updateUser = (id, user) =>{
  return axios.put(`${baseUrl}/${id}`, user)
}
export default { getUsers, updateUser }
