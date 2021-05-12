import "../SCSS/login.scss";
import React from "react"
import { Link, useHistory } from "react-router-dom";
import { login } from "./Services/accountService";

const Login = () => {
    const [account, setAccount] = React.useState({
        'username': '',
        'password': '',
    })
    const [message, setMessage] = React.useState('')
    const history = useHistory()

    const handleInputChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        setAccount({
            ...account,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        login(account).then(res => {
            if (res.message) setMessage(res.message)
            else {
                setMessage('')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.setItem('token', res.token)
                localStorage.setItem('user', JSON.stringify(res.user))
                history.push('/home/discover')
            }
        })
        event.preventDefault();

    }

    return (
        <div className="login_box">

            <h3>LOGIN</h3>

            <form name="loginform" onSubmit={handleSubmit}>

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
                <br/>

                <p className="errorbox">{message}</p><br/>

                <input type="submit" value="LOGIN"/><br/><br/>

                <Link to="/signup">
                    <p className="goSignup">Not registered? <span>Create an account</span></p>
                </Link>

            </form>
        </div>
    )
}

export default Login