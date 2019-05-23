import React, { useState } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (credentials) => {
    const newResource = await axios.post(baseUrl, credentials)
    const updatedResources = resources.concat(newResource.data)
    setResources(updatedResources)
  }

  const update = async (id, data) => {
    const updatedResource = await axios.put(`${baseUrl}/${id}`, data)
    setResources(resources.map(resource => resource.id !== id ? resource : updatedResource.data))
  }

  const remove = async (id) => {
    const deletedResource = await axios.delete(`${baseUrl}/${id}`)
    const updatedResources = resources.filter(resource => resource._id !== id)
    setResources(updatedResources)
  }

  const service = {
    getAll, create, remove, update
  }

  return [resources, service]
}

export default useResource