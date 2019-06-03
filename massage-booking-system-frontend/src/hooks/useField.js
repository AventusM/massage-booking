import { useState } from 'react'

const useField = (type, defaultValue) => {
  const [value, setValue] = useState(defaultValue || '')
  const handleFieldChange = event => {
    setValue(event.target.value)
  }

  const changeValue = value => {
    setValue(value)
  }

  const reset = () => {
    setValue('')
  }

  return { type, value, handleFieldChange, reset, changeValue }
}

export default useField
