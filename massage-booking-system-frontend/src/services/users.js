import axios from "axios"
const baseUrl = "/api/users"

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const addUser = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const updateUser = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getUsers, addUser }
