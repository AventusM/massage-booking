import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

const App = () => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then(response => console.log(response))
  }, [])

  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
