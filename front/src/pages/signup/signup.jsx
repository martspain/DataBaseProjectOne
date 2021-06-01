import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { login, signup } from '../../services/accountService'
import TEXTS from '../../services/texts'
import countriesList from '../../services/countries'
import styles from './signup.css'
import SelectLight from '../../components/select-light/select-light'

const Signup = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
    repwd: '',
    first_name: '',
    last_name: '',
    email: '',
    country: 'NO COUNTRY SPECIFIED',
  })
  const [message, setMessage] = useState('')
  const [resMessage, setResMessage] = useState('')
  const history = useHistory()

  const handleRePasswordChange = (event) => {
    const { value } = event.target
    if (event.target.name === 'password') {
      if (value !== account.repwd) setMessage('Las contraseñas no coinciden')
      else setMessage('')
    } else if (value !== account.password) setMessage('Las contraseñas no coinciden')
    else setMessage('')
  }

  const handleInputChange = (event) => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    setAccount({
      ...account,
      [name]: value,
    })
    if (target.type === 'password') handleRePasswordChange(event)
  }

  const handleSubmit = (event) => {
    if (account.password === account.repwd) {
      const blank = /^\s*$/g
      if ([account.username,
        account.password,
        account.first_name,
        account.email].some((e) => blank.test(e))) {
        setResMessage('Completa todos los campos')
      } else if (account.username.includes(' ')) {
        setResMessage('Tu nombre de usuario no puede contener espacios en blanco')
      } else if (account.country === 'NO COUNTRY SPECIFIED') {
        setResMessage('Selecciona un país!')
      } else {
        signup(account).then((res) => {
          if (res.message) setResMessage(res.message)
          else {
            login({ username: res[0].username, password: account.password }).then((loginRes) => {
              if (loginRes.message) setMessage(loginRes.message)
              else {
                history.push('/')
              }
            })
          }
        })
      }
    }
    event.preventDefault()
  }

  return (
    <div className={styles.container}>
      <TextLight text="SIGNUP" type={TEXTS.TITLE1} />

      <form name="signupForm" onSubmit={handleSubmit}>
        <InputLight title="Username" type="text" name="username" value={account.username} onChange={handleInputChange} placeHolder="Enter Username" />
        <InputLight title="Password" type="password" name="password" value={account.password} onChange={handleInputChange} placeHolder="Enter Password" />
        <InputLight title="Retype Password" type="password" name="repwd" value={account.repwd} onChange={handleInputChange} placeHolder="Re-Enter Password" />
        <TextLight text={message} type={TEXTS.ERROR} />
        <InputLight title="First Name" type="text" name="first_name" value={account.first_name} onChange={handleInputChange} placeHolder="Enter Your First Name" />
        <InputLight title="Last Name" type="text" name="last_name" value={account.last_name} onChange={handleInputChange} placeHolder="Enter Your Last Name" />
        <InputLight title="Email" type="email" name="email" value={account.email} onChange={handleInputChange} placeHolder="Enter Email" />
        <SelectLight title="Country" name="country" value={account.country} onChange={handleInputChange} options={countriesList} defaultOption="NO COUNTRY SPECIFIED" />
        <TextLight text={resMessage} type={TEXTS.ERROR} />
        <InputLight type="submit" name="signup" value="SIGNUP" onChange={() => { }} />
        <Link to="/login">
          <TextLight text="Existing user? Login" type={TEXTS.LINK} />
        </Link>
      </form>
    </div>
  )
}

export default Signup
