import "../SCSS/login.scss";
import React from "react"
import { Link, useHistory } from "react-router-dom";
import { login, signup } from "./Services/accountService";

const Signup = () => {
    const [account, setAccount] = React.useState({
        'username': '',
        'password': '',
        'repwd': '',
        'first_name': '',
        'last_name': '',
        'email': '',
    })
    const [message, setMessage] = React.useState('')
    const [resMessage, setResMessage] = React.useState('')
    const history = useHistory()

    const handleInputChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        setAccount({
            ...account,
            [name]: value
        })
        if (target.type === 'password') handleRePasswordChange(event)
    }

    const handleRePasswordChange = (event) => {
        const value = event.target.value
        if (event.target.name === 'password') {
            if (value !== account.repwd) setMessage('Las contraseñas no coinciden')
            else setMessage('')
        } else {
            if (value !== account.password) setMessage('Las contraseñas no coinciden')
            else setMessage('')
        }
    }

    const handleSubmit = (event) => {
        if (account.password === account.repwd) {
            const blank = /^\s*$/g;
            if ([account.username, account.password, account.first_name, account.email].some(e => blank.test(e))) {
                setResMessage('Completa todos los campos')
            } else if (account.username.includes(' ')) {
                setResMessage('Tu nombre de usuario no puede contener espacios en blanco')
            } else {
                setResMessage('')
                signup(account).then(res => {
                    if (res.message) setResMessage(res.message)
                    else {
                        setMessage('')
                        login({ username: res[0].username, password: account.password }).then(res => {
                            if (res.message) setMessage(res.message)
                            else {
                                setMessage('')
                                localStorage.setItem('token', res.token)
                                localStorage.setItem('user', JSON.stringify(res.user))
                                history.push('/home/discover')
                            }
                        })
                    }
                })
            }
        }
        event.preventDefault();
    }

    return (
        <div className="signup_box">
            <h3>SIGNUP</h3>

            <form name="signupform" onSubmit={handleSubmit}>

                <p>Username</p>
                <input
                    type="text"
                    name="username"
                    value={account.username}
                    onChange={handleInputChange}
                    placeholder="Enter Username"
                />

                <p>Password</p>
                <input
                    type="password"
                    name="password"
                    value={account.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                />

                <p>Retype Password</p>
                <input
                    type="password"
                    name="repwd"
                    value={account.repwd}
                    onChange={handleInputChange}
                    placeholder="Re-Enter Password"
                />
                <br />
                <p className="errorbox">{message}</p><br />

                <p>First Name</p>
                <input
                    type="text"
                    name="first_name"
                    value={account.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter Your First Name"
                />

                <p>Last Name</p>
                <input
                    type="text"
                    name="last_name"
                    value={account.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Last Name"
                />

                <p>Email</p>
                <input
                    type="email"
                    name="email"
                    value={account.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                />

                <p className="errorbox">{resMessage}</p><br />
                <input
                    type="submit"
                    value="SIGNUP"
                />
                <br /><br />

                <Link to="/">
                    <p className="goSignup">Existing user? <span>Login</span></p>
                </Link>
            </form>
        </div>
    )
}

export default Signup