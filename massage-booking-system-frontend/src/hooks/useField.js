import React, { useState } from 'react'

const useField = (type, defaultValue) => {
  const [value, setValue] = useState(defaultValue || '')
  const handleFieldChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return { type, value, handleFieldChange, reset }
}

export default useField 