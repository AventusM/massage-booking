import { useState } from 'react'
import axios from 'axios'
import { timeout } from 'q'

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    //console.log('GET ALL')
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async data => {
    console.log(data)
    const newResource = await axios.post(baseUrl, data)
    const updatedResources = resources.concat(newResource.data)
    setResources(updatedResources)
  }

  const update = async (id, data, type = '') => {
    //console.log('UPDATE')
    const updatedResource = await axios.put(`${baseUrl}/${id}/${type}`, data)
    console.log('updatedResource: ', updatedResource)
    if (updatedResource.data.hasOwnProperty('_id')) {
      setResources(
        resources.map(resource =>
          resource._id !== id ? resource : updatedResource.data
        )
      )
    }
  }

  const updateExpectMany = async (id, type = '') => {
    //console.log('UPDATE')
    const updatedResources = await axios.put(`${baseUrl}/${id}/${type}`)
    console.log('updatedResource: ', updatedResources)
    // setResources(
    //   resources.map(resource =>
    //     resource._id !== id ? resource : updatedResources.data
    //   )
    // )

    let res = updatedResources.reduce((a, b) => {
      console.log('b: ', b);
      console.log('a: ', a);

      let tmp = resources.find(e => e._id === b._id) || {};
      return a.concat(Object.assign(tmp, b));
    }, []);

    console.log('res: ', res);

  }

  const remove = async id => {
    //console.log('REMOVE')
    await axios.delete(`${baseUrl}/${id}`)
    const updatedResources = resources.filter(resource => resource._id !== id)
    setResources(updatedResources)
  }

  const getOne = async id => {
    //console.log('GET ONE')
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
    //console.log('GET INTERVAL')
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
