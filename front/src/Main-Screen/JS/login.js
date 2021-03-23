import "../SCSS/login.scss";
import React from "react"
import { Link } from "react-router-dom";
import { login } from "./Services/accountService";

const Login = () => {
    const [account, setAccount] = React.useState({
        'username': '',
        'password': '',
    })

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
        login(account)
        event.preventDefault();
    }

    return (
        <div className="login_box">

            <img className="user" alt="img woman" />
            <h3>USER LOGIN</h3>

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

                <div id="errorbox"></div><br/>

                <input type="submit"/><br/><br/>

                <a href="">Not registered? <span>Create an account</span></a>

            </form>

            <Link to="/home">
                <button>Ir a home (preuba)</button>
            </Link>
        </div>
    )
}

export default Login