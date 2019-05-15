const express = require('express')
const app = express()

let users = [
  {
    "id": 1,
    "name": "Ville Heikkilä",
    "number": "050-123123123",
    "email": "tehomies@gmail.com",
    "appointments": [1]
  },
  {
    "id": 2,
    "name": "Anton Moroz",
    "number": "050-050040123",
    "email": "8antonm@gmail.com",
    "appointments": [2]
  },
  {
    "id": 3,
    "name": "Karoliina x",
    "number": "044-50912309",
    "email": "karoliine@gmail.com",
    "appointments": [3, 4]
  },
  {
    "id": 4,
    "name": "Kaius y",
    "number": "050-981023981",
    "email": "kaius@gmail.com",
    "appointments": []
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/users', (req, res) => {
  res.json(users)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})