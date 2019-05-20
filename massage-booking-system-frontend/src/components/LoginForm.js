import React from 'react'
import { tsPropertySignature } from '@babel/types';

const LoginForm = (props) => {
    let email = ''
    let password = ''
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('username', email, 'password', password)
        try {

        } catch (exception) {
            
        }
      }

    return (
        <form onSubmit={handleLogin}>
            Email:
            <br />
            <input type="text" name="email" onChange={({ target }) => email=target.value}/>
            <br />
            Password:
            <br />
            <input type="password" name="password" onChange={({ target }) => password=target.value}/>
            <br />
            <button type='submit' >Login</button>
        </form>
    )
}

export default LoginForm