import { useState } from 'react'
import axios from 'axios'

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async data => {
    const newResource = await axios.post(baseUrl, data)
    const updatedResources = resources.concat(newResource.data)
    setResources(updatedResources)
  }

  const update = async (id, data, type = '') => {
    const updatedResource = await axios.put(`${baseUrl}/${id}/${type}`, data)
    if (updatedResource.data.hasOwnProperty('_id')) {
      setResources(
        resources.map(resource =>
          resource._id !== id ? resource : updatedResource.data
        )
      )
    }
  }

  const remove = async id => {
    const deletedResource = await axios.delete(`${baseUrl}/${id}`)
    const updatedResources = resources.filter(resource => resource._id !== id)
    setResources(updatedResources)
  }

  const getOne = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  }

  const service = {
    getAll,
    create,
    remove,
    update,
    getOne,
  }

  return [resources, service]
}

export default useResource
