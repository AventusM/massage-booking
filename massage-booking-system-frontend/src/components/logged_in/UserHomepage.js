import React, { useState, useEffect } from 'react'
import userService from '../../services/users'
import {Redirect} from 'react-router-dom'
import { render } from 'react-testing-library';

const UserHomepage = ({ user }) => {
    console.log('userhome got user as ', user)
    const [name, setName] = useState(user.name || '')
    const [number, setNumber] = useState(user.number || '')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('') 

    const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth))
  }, [])

    const handleUserUpdate = () => {
        console.log('handleUserUpdate Called')
        console.log('User', user)
        console.log('number ', number)
        const updatedUser = {...user, name, number}
        console.log('Updated user ', updatedUser)
        userService.updateUser(user.id, updatedUser) 
        return(
            <Redirect to="/" />
        )
    }

    
    const handlePasswodChange = () => {
        console.log('handleUserUpdate Called')
        console.log('User', user)
        if (password === passwordCheck) {
            //todo change password

        } else {
            window.alert('password missmatch')
        }
    }
    const isMobile = width <= 700
    if (!isMobile) {
    return (
    
        <div className = 'userHomepageWrapper_desktop'>
        <h2>Welcome {user.name}</h2>
        <div>

        <h3>Update your info</h3>
        <form onSubmit={() => handleUserUpdate()}>
            <div><label>Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    name="name"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div><label>Phone Number</label>
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
            <div><label>Password</label>
                <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div><label>Confirm Password</label>
                <input
                    type="passwordCheck"
                    id="passwordCheck"
                    value={passwordCheck}
                    name="passwordCheck"
                    onChange={({ target }) => setPasswordCheck(target.value)}
                />
            </div>
            <button type="submit">Change password</button>
        </form>
        </div>
        </div>
    )
} else {
    return (
        
        <div className = 'userHomepageWrapper_mobile'>
        <h2>Welcome {user.name}</h2>
        <div>

        <h3>Update your info</h3>
        <form onSubmit={() => handleUserUpdate()}>
            <div><label>Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    name="name"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div><label>Phone Number</label>
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
            <div><label>Password</label>
                <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div><label>Confirm Password</label>
                <input
                    type="passwordCheck"
                    id="passwordCheck"
                    value={passwordCheck}
                    name="passwordCheck"
                    onChange={({ target }) => setPasswordCheck(target.value)}
                />
            </div>
            <button type="submit">Change password</button>
        </form>
        </div>
        </div>
    
)
        
}
}

export default UserHomepage