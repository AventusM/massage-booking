import React from 'react'
import { tsPropertySignature } from '@babel/types';

const LoginForm = ({
    handleLogin, handleUsernameChange, handlePasswordChange
  }) => {
    

    return (
        <form onSubmit={handleLogin}>
            Email:
            <br />
            <input type="email" name="username" onChange={handleUsernameChange}/>
            <br />
            Password:
            <br />
            <input type="password" name="password" onChange={handlePasswordChange}/>
            <br />
            <button type='submit' >Login</button>
        </form>
    )
}

export default LoginForm