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

  const remove = async (id) => {
    const deletedResource = await axios.delete(`${baseUrl}/${id}`)
    const updatedResources = resources.filter(resource => resource._id !== id)
    setResources(updatedResources)
  }

  const service = {
    getAll, create, remove
  }

  return [resources, service]
}

export default useResource