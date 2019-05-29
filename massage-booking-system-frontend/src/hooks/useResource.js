import React, { useState } from 'react'
import axios from 'axios'

// TOKEN ABOVE useResource -- OTHERWISE IT WILL GO NULL ON EVERY ACTION
let token = null
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const setToken = newToken => { token = `bearer ${newToken}` }

  const getAll = async () => {
    const config = { headers: { Authorization: token } }
    // console.log('config', config)
    const response = await axios.get(baseUrl, config)
    setResources(response.data)
  }

  const create = async (data) => {
    const config = { headers: { Authorization: token } }
    // console.log('config', config)
    const newResource = await axios.post(baseUrl, data, config)
    const updatedResources = resources.concat(newResource.data)
    setResources(updatedResources)
  }

  const update = async (id, data) => {
    const config = { headers: { Authorization: token } }
    console.log('Update data given: ', data)
    // console.log('config', config)
    const updatedResource = await axios.put(`${baseUrl}/${id}`, data, config)
    setResources(resources.map(resource => resource._id !== id ? resource : updatedResource.data))
  }

  const remove = async (id) => {
    const config = { headers: { Authorization: token } }
    // console.log('config', config)
    const deletedResource = await axios.delete(`${baseUrl}/${id}`, config)
    const updatedResources = resources.filter(resource => resource._id !== id)
    setResources(updatedResources)
  }

  const service = {
    getAll, create, remove, update, setToken
  }

  return [resources, service]
}

export default useResource