import React, { Fragment, useState, useContext } from 'react'
import userService from '../../services/users'
import { UserContext } from '../../App'
import useField from '../../hooks/useField';

const UserHomepage = () => {
    const currentUserContext = useContext(UserContext)
    const user = currentUserContext.user

    const name = useField('text', user.name)
    const number = useField('text', user.number)
    const password = useField('password')
    const passwordCheck = useField('password')

    const handleUserUpdate = async () => {
        // console.log('handleUserUpdate Called')
        const updatedUser = { ...user, name, number }

        // todo use data from this to update local userdata
        const userFromServer = await userService.updateUser(user._id, updatedUser)

        // refactor this to user gboal update user, todo create update user
        window.localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))

    }

    const handlePasswordChange = () => {
        // console.log('handlePasswordChange Called')

        if (password === passwordCheck) {
            userService.changePassword(user._id, password)
        } else {
            window.alert('password missmatch')
        }
    }

    return (
        <Fragment>
            <h2>Welcome {user.name}!</h2>
            <section>
                <h3>Update your info</h3>
                <form onSubmit={() => handleUserUpdate()}>
                    <label>Name</label>
                    <input
                        type={name.type}
                        id="name"
                        value={name.value}
                        name="name"
                        onChange={name.handleFieldChange}
                    />

                    <label>Phone number</label>
                    <input
                        type={number.type}
                        id="number"
                        value={number.value}
                        name="number"
                        onChange={number.handleFieldChange}
                    />

                    <button type="submit">Update</button>
                </form>
            </section>

            <section>
                <h3>Change password</h3>
                <form onSubmit={() => handlePasswordChange()}>
                    <label>Password</label>
                    <input
                        type={password.type}
                        id="password"
                        value={password.value}
                        name="password"
                        onChange={password.handleFieldChange}
                    />

                    <label>Retype password</label>
                    <input
                        type={passwordCheck.type}
                        id="passwordCheck"
                        value={passwordCheck.value}
                        name="passwordCheck"
                        onChange={passwordCheck.handleFieldChange}
                    />
                    <button type="submit">Change password</button>
                </form>
            </section>
        </Fragment>


    )
}

export default UserHomepage