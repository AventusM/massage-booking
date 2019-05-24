import React, { Fragment, useState, useContext } from 'react'
import userService from '../../services/users'
import { UserContext } from '../../App'

const UserHomepage = () => {
    const currentUserContext = useContext(UserContext)
    const user = currentUserContext.user
    console.log('currentUserContext ', currentUserContext)

    const [name, setName] = useState(user.name || '')
    const [number, setNumber] = useState(user.number || '')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const handleUserUpdate = async () => {
        console.log('handleUserUpdate Called')
        const updatedUser = { ...user, name, number }

        // refactor this to user gboal update user, todo create update user
        window.localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))

        // todo use data from this to update local userdata
        const userFromServer = await userService.updateUser(user._id, updatedUser)

    }

    const handlePasswordChange = () => {
        console.log('handlePasswordChange Called')

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
                        type="text"
                        id="name"
                        value={name}
                        name="name"
                        onChange={({ target }) => setName(target.value)}
                    />

                    <label>Phone number</label>
                    <input
                        type="text"
                        id="number"
                        value={number}
                        name="number"
                        onChange={({ target }) => setNumber(target.value)}
                    />

                    <button type="submit">Update</button>
                </form>
            </section>

            <section>
                <h3>Change password</h3>
                <form onSubmit={() => handlePasswordChange()}>
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />

                    <label>Retype password</label>
                    <input
                        type="password"
                        id="passwordCheck"
                        value={passwordCheck}
                        name="passwordCheck"
                        onChange={({ target }) => setPasswordCheck(target.value)}
                    />
                    <button type="submit">Change password</button>
                </form>
            </section>
        </Fragment>


    )
}

export default UserHomepage