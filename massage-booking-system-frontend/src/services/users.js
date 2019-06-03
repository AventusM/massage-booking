import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const updateUser = async (id, user) => {
  console.log('updateUser called with id', id, ' user ', user)
  return await axios.put(`${baseUrl}/${id}`, user)
}

const changePassword = async (id, password) => {
  console.log('changePasswordcalled with id', id)
  return await axios.put(`${baseUrl}/${id}/passwordChange`, { password })
}

const addUser = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export default { getUsers, updateUser, addUser, changePassword }
