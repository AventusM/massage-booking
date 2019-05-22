import axios from "axios"
const baseUrl = "/api/users"

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const updateUser = (id, user) =>{
  return axios.put(`${baseUrl}/${id}`, user)
}

const addUser = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getUsers, updateUser, addUser }

