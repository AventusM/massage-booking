import React from 'react'

const LoginForm = () => {
    return (
        <form>
            Email:
            <br />
            <input type="text" name="email"/>
            <br />
            Password:
            <br />
            <input type="password" name="password"/>
            <br />
        </form>
    )
}

export default LoginForm