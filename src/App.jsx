import React, { useState } from 'react'
import AddUser from './components/Users/AddUser'
import UsersList from './components/Users/UsersList'

const App = () => {
  const [usersList, setUsersList] = useState([])

  const addUserHandler = (username, age) => {
    setUsersList((prevState) => {
      return [...prevState, { username, age, id: Math.random().toString() }]
    })
    console.log(usersList)
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  )
}

export default App
