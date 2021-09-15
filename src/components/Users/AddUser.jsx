import React, { useState } from 'react'
import Button from '../UI/Button'
import Card from '../UI/Card'
import ErrorModal from '../UI/ErrorModal'

import classes from './AddUser.module.css'

const AddUser = (props) => {
  const [enteredData, setEnteredData] = useState({ username: '', age: '' })
  const [error, setError] = useState()
  const addUserHandler = (e) => {
    e.preventDefault()
    if (
      enteredData.username.trim().length === 0 ||
      enteredData.age.trim().length === 0
    ) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age (non-empty values)',
      })
      return
    }
    if (+enteredData.age < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0)',
      })
      return
    }
    props.onAddUser(enteredData.username, enteredData.age)
    setEnteredData({ username: '', age: '' })
    setError()
  }

  const usernameChangeHandler = (e) => {
    setEnteredData((prevState) => {
      return { ...prevState, username: e.target.value }
    })
  }
  const ageChangeHandler = (e) => {
    setEnteredData((prevState) => {
      return { ...prevState, age: e.target.value }
    })
  }

  const errorHandler = () => {
    setError()
  }

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredData.username}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={enteredData.age}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </>
  )
}

export default AddUser
