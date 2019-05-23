import React, { useState } from 'react'
import userService from '../../services/users'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { render } from 'react-testing-library';

const UserHomepage = ({ user }) => {
    console.log('userhome got user as ', user)
    const [name, setName] = useState(user.name || '')
    const [number, setNumber] = useState(user.number || '')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('') 

    const handleUserUpdate = async () => {
        console.log('handleUserUpdate Called')
        console.log('User', user)
        console.log('number ', number)
        const updatedUser = {...user, name, number}
        console.log('Updated user ', updatedUser)
        const userFromServer = await userService.updateUser(user.id, updatedUser)
        console.log('userFromServer', userFromServer) 
        // todo update user in app state to match new user 
    }
    
    const handlePasswodChange = () => {
        console.log('handlePasswordChange Called')
        console.log('User', user)
        if (password === passwordCheck) {
            userService.changePassword(user.id, password)
        } else {
            window.alert('password missmatch')
        }
    }

    return (
        <>
        <h2>Welcome {user.name}!</h2>
        <div>
        <h3>Update your info</h3>
        <form onSubmit={() => handleUserUpdate()}>
            <div>Name
                <input
                    type="text"
                    id="name"
                    value={name}
                    name="name"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>Phone Number
                <input
                    type="text"
                    id="number"
                    value={number}
                    name="number"
                    onChange={({ target }) => setNumber(target.value)}
                />
            </div>

            <button type="submit">Update</button>
        </form>
        </div>

        <div>
        <h3>Change password</h3>
        <form onSubmit={() => handlePasswodChange()}>
            <div>Password
                <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div>Retype Password
                <input
                    type="password"
                    id="passwordCheck"
                    value={passwordCheck}
                    name="passwordCheck"
                    onChange={({ target }) => setPasswordCheck(target.value)}
                />
            </div>
            <button type="submit">Change password</button>
        </form>
        </div>
        
        
        </>
        
        
    )
}

export default UserHomepage