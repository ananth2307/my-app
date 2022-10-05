import React, { useState } from "react";
import images from "../../assets/images";
import { useSelector ,useDispatch } from "react-redux";
import { authenticateUser } from "./authSlice";
import _ from "lodash"


const SignIn = () => {

    const [loginForm, setLoginForm] = useState({})
    const dispatch = useDispatch();


    const onLogin = (e) => {
        e.preventDefault()
        dispatch(authenticateUser())
    }

    const handleChange = (e) => {
        const tmpLoginForm = _.cloneDeep(loginForm);
        tmpLoginForm[e.target.name] = e.target.value;
        setLoginForm(tmpLoginForm);
    }

    return (
        <div class="wrapper p-0">
        <div class="loginwrap">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 loginleft">
                        <div class="logo">
                            <img src={images.logo} alt="DevOpsLab" />
                        </div>
                        <div class="cmpanel">
                            <div id="erpanel">
                            Invalid user credentials
                            </div>
                        </div>
                        <form id="login_form">
                        
                            <div class="frmgroup" data-validate="Username">
                                <input type="text" placeholder="Username" id="userName" name="userName" value={loginForm.userName} onChange={handleChange} />
                            </div>
                            <div class="frmgroup" data-validate="Password">
                                <input type="password" placeholder="Password" id="userPassword" name="userPassword"  value={loginForm.userPassword} onChange={handleChange} />
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" checked="" type="checkbox" id="remember_me" value="Remember Me" />
                                <label class="form-check-label" for="remember_me">Remember Me</label>
                            </div>
                            <input type="hidden" value="" name="src" />
                            <div class="btnftr">
                                <button type="submit" class="solid-btn" id="loginBtn" onClick={onLogin}>LOGIN</button>
                                <h5><a href="">Forgot Password?</a></h5>
                            </div>
                        </form>
                    </div>
                    </div>
                    <div class="col-lg-8 loginbg">
                        <img src={images.loginBanner} alt="DevOpsLab" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;