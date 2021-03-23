import "../SCSS/login.scss";
import React from "react"
import { Link } from "react-router-dom";

const Login = () => {

    return (
        <div className="login_box">

            <img className="user" alt="img woman" />
            <h3>USER LOGIN</h3>

            <form name="loginform">

            <p>User Name</p>
            <input type="text" name="username" placeholder="Enter Username" />

            <p>Password</p>
            <input type="password" name="pwd" placeholder="password" /><br/>

            <div id="errorbox"></div><br/>

            <input type="submit" name="" value="LOGIN"/><br/><br/>

            <a href="">Not registered? <span>Create an account</span></a>

            </form>

            <Link to="/home">
                <button>Ir a home (preuba)</button>
            </Link>
        </div>
    )
}

export default Login