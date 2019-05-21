import React, { Fragment } from 'react'

const Index = (props) => {
  const { user } = props
  return (
    <Fragment>
      Tervetuloa {user.name}!
    </Fragment>
  )
}

export default Index