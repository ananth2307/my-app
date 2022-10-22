import React, { useEffect, useState } from "react";
import { logo, loginBanner } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { api } from "../../app/services/baseApiSetup";

const SignIn = () => {
  const [loginForm, setLoginForm] = useState({});
  const [login] = api.useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("isLoggedIn") === "true" &&
      navigate("observability/flowMetrics");
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const payload = `userName=${loginForm.userName}&userPassword=${loginForm.userPassword}&src=`;
    try {
      const data = await login(payload);
      console.log("redis suc", data);
      localStorage.setItem("isLoggedIn", "true");
      navigate("observability/flowMetrics");
    } catch (err) {
      console.log("Login Err", err);
    }
  };

  const handleChange = (e) => {
    const tmpLoginForm = _.cloneDeep(loginForm);
    tmpLoginForm[e.target.name] = e.target.value;
    setLoginForm(tmpLoginForm);
  };

  return (
    <div className="wrapper p-0">
      <div className="loginwrap">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 loginleft">
              <div className="logo">
                <img src={logo} alt="DevOpsLab" />
              </div>
              <div className="cmpanel">
                <div id="erpanel">Invalid user credentials</div>
              </div>
              <form id="login_form">
                <div className="frmgroup" data-validate="Username">
                  <input
                    type="text"
                    placeholder="Username"
                    id="userName"
                    name="userName"
                    value={loginForm.userName}
                    onChange={handleChange}
                  />
                </div>
                <div className="frmgroup" data-validate="Password">
                  <input
                    type="password"
                    placeholder="Password"
                    id="userPassword"
                    name="userPassword"
                    value={loginForm.userPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    checked=""
                    type="checkbox"
                    id="remember_me"
                    value="Remember Me"
                  />
                  <label className="form-check-label" for="remember_me">
                    Remember Me
                  </label>
                </div>
                <input type="hidden" value="" name="src" />
                <div className="btnftr">
                  <button
                    type="submit"
                    className="solid-btn"
                    id="loginBtn"
                    onClick={onLogin}
                  >
                    LOGIN
                  </button>
                  <h5>
                    <a href="">Forgot Password?</a>
                  </h5>
                </div>
              </form>
            </div>
            <div className="col-lg-8 loginbg">
              <img src={loginBanner} alt="DevOpsLab" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
