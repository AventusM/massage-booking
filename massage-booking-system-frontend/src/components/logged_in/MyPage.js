import React, { Fragment, useState, useContext } from 'react'
import { UserContext } from '../../App'
import useField from '../../hooks/useField'

const MyPage = () => {
  const currentUserContext = useContext(UserContext)
  const { user, setUser, userService } = currentUserContext
  const { number, avatarUrl, name } = user
  const numberField = useField('text', number)

  const handleNumberUpdate = event => {
    event.preventDefault()
    const number = numberField.value
    const updatedUser = { ...user, number }
    console.log('Hei', updatedUser)

    setUser(updatedUser)
    userService.updateUser(user._id, updatedUser)
  }

  return (
    <Fragment>
      {avatarUrl ? (
        <img src={avatarUrl} alt="profile pic" height="50" width="50" />
      ) : (
        'avatar'
      )}
      {name}
      <label>Phone number</label>
      <form onSubmit={handleNumberUpdate}>
        <input
          type={numberField.type}
          id="number"
          value={numberField.value}
          name="number"
          onChange={numberField.handleFieldChange}
        />
        <button type="submit">Update</button>
      </form>
    </Fragment>
  )
}

export default MyPage
