import React, { useRef, useState } from 'react'
import Button from '../UI/Button'
import Card from '../UI/Card'
import ErrorModal from '../UI/ErrorModal'

import classes from './AddUser.module.css'

const AddUser = (props) => {
  const usernameInputRef = useRef()
  const ageInputRef = useRef()

  const [error, setError] = useState()
  const addUserHandler = (e) => {
    e.preventDefault()
    const username = usernameInputRef.current.value
    const age = ageInputRef.current.value
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age (non-empty values)',
      })
      return
    }
    if (+age < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0)',
      })
      return
    }
    props.onAddUser(username, age)
    usernameInputRef.current.value = ''
    ageInputRef.current.value = ''
    setError()
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
          <input id="username" type="text" ref={usernameInputRef} />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </>
  )
}

export default AddUser
