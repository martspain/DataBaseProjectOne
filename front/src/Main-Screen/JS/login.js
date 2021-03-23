import "../SCSS/login.scss";
import magGlassImg from "../res/searchIcon.png";
import ReactDOM from "react-dom"
import React from "react"
import SCREENS from "./navigation"
import { setScreen } from "./index"

const Login = () => {
    return (
        <div className="login_box">

            <img className="user" src="../res/letterR.png" alt="img woman" />
            <h3>USER LOGIN</h3>

            <form name="loginform" onsubmit="">

            <p>User Name</p>
            <input type="text" name="username" placeholder="Enter Username" />

            <p>Password</p>
            <input type="password" name="pwd" placeholder="password" /><br/>

            <div id="errorbox"></div><br/>

            <input type="submit" name="" value="LOGIN"/><br/><br/>

            <a href="">Not registered? <span>Create an account</span></a>

            </form>

            <button onClick={()=>setScreen(SCREENS.HOME)}>Ir a home (preuba)</button>
        </div>
    )
}

export default Login