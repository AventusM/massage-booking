import React from 'react'
import logo from '../pics/unity5.png'

import {
  Link
} from 'react-router-dom'

const AuthHeader = ({ user }) => {
  return (
    <nav className="navbar">
      <span className="navbar-toggle" id="js-navbar-toggle">
        <i
          onClick={() =>
            document.getElementById('js-menu').classList.toggle('active')
          }
          className="fas fa-bars"
        />
      </span>
      <Link to="/">
        <img src={logo} className="logo" />
      </Link>
      <ul className="main-nav" id="js-menu">
        <li>
          <Link className="nav-link" to="/">
            Index
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/mypage">
            {user.name}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/dashboard">
            Admin dashboard
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/stats">
            Stats
          </Link>
        </li>
        <li>
          <i
            onClick={() => (window.location.href = '/auth/logout')}
            id="logout"
            className="fas fa-sign-out-alt"
          />
        </li>
      </ul>
    </nav>
  )
}

const NonAuthHeader = props => {
  return (
    <nav className="navbar">
      <span className="navbar-toggle" id="js-navbar-toggle">
        <i
          onClick={() =>
            document.getElementById('js-menu').classList.toggle('active')
          }
          className="fas fa-bars"
        />
      </span>
      <img src={logo} className="logo" />
      <ul className="main-nav" id="js-menu">
        <li>
          <a href="/auth/google">Log in</a>
        </li>
      </ul>
    </nav>
  )
}

const Header = props => {
  const { user } = props
  if (user) {
    return <AuthHeader user={user} />
  }
  return <NonAuthHeader />
}

export default Header
