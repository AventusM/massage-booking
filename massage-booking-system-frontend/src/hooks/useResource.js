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
    } else {
      return updatedResource
    }

  }

  const updateExpectMany = async (id, type = '') => {
    const updatedResources = await axios.put(`${baseUrl}/${id}/${type}`)
    const data = updatedResources.data

    const updatedAppointments = resources.map(app => {
      let appUpdated = data.find(app2 => app2._id === app._id)
      return appUpdated ? { ...app, ...appUpdated } : app
    })

    setResources(updatedAppointments)
  }

  const remove = async id => {
    await axios.delete(`${baseUrl}/${id}`)
    const updatedResources = resources.filter(resource => resource._id !== id)
    setResources(updatedResources)
  }

  const getOne = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  }

  // POSSIBLY ABSOLUTELY REDUNDANT
  // POSSIBLY ABSOLUTELY REDUNDANT
  // POSSIBLY ABSOLUTELY REDUNDANT
  const setOne = async (path, data) => {
    const response = await axios.post(`${baseUrl}/${path}`, data)
    return response.data
  }

  const getInterval = async (start, end) => {
    const response = await axios.get(`${baseUrl}/${start}/${end}`)
    setResources(response.data)

  }
  const createWithoutConcat = async data => {
    const newResource = await axios.post(baseUrl, data)
    setResources(newResource.data)
  }

  const service = {
    getAll,
    create,
    remove,
    update,
    getOne,
    updateExpectMany,
    setOne,
    getInterval,
    createWithoutConcat
  }

  return [resources, service]
}

export default useResource
