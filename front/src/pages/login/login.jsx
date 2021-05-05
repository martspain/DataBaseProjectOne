import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import InputLight from '../../components/input-light/input-light'
import TextLight from '../../components/text-light/text-light'
import { login } from '../../services/accountService'
import TEXTS from '../../services/texts'
import styles from './login.css'

const Login = () => {
  const [account, setAccount] = React.useState({
    username: '',
    password: '',
  })
  const [message, setMessage] = React.useState('')
  const history = useHistory()

  const handleInputChange = (event) => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target
    setAccount({
      ...account,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    login(account).then((res) => {
      if (res.message) setMessage(res.message)
      else {
        history.push('/')
      }
    })
    event.preventDefault()
  }

  return (
    <div className={styles.container}>
      <TextLight text="LOGIN" type={TEXTS.TITLE1} />
      <form name="loginForm" onSubmit={handleSubmit}>
        <InputLight title="Username" type="text" name="username" value={account.username} onChange={handleInputChange} placeHolder="Enter Username" />
        <InputLight title="Password" type="password" name="password" value={account.password} onChange={handleInputChange} placeHolder="Enter Password" />
        <TextLight text={message} type={TEXTS.ERROR} />
        <InputLight type="submit" name="login" value="LOGIN" onChange={() => { }} />
        <Link to="/signup">
          <TextLight text="Not registered? Create an account" type={TEXTS.LINK} />
        </Link>
      </form>
    </div>
  )
}

export default Login
