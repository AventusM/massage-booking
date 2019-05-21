import React, { Fragment } from 'react'

const Index = (props) => {
  const { user } = props
  return (
    <Fragment>
      Welcome {user.name}!
    </Fragment>
  )
}

export default Index