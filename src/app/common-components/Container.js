import React, { useState } from "react";
import {
  logoSmall,
  notification,
  user,
  logout,
} from "../../assets/images/index";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { pageTitleMapper } from "../utilities/constants";
import { get } from "lodash";
import { routes } from "../routes";
import { mapValues } from "lodash";


const Container = () => {
  const [childMenuState, setChildMenuState] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = get(location, "pathname", "");

  const onNavigate = (e, url) => {
    e.preventDefault();
    navigate(url);
  };

  const handleChildMenuState = (path, value) => {
    const resetMenuState = mapValues({ ...childMenuState }, () => false);
    setChildMenuState({ ...resetMenuState, [path]: value });
  };

  return (
    <div className="wrapper_jr">
      <header>
        <div className="headerwrap">
          <div className="header-logo">
            <a href="#">
              <img src={logoSmall} alt="DevOpsLab" />
            </a>
          </div>
          <div className="nav">
            <ul>
              {routes.map((route) => (
                <li
                  className={`dropdown-btn ${
                    pathName.includes(route?.path?.split("/")[0]) && "active"
                  }`}
                >
                  <a
                    href="#"
                    className={`${
                      route?.toolTipCustomClass
                        ? route?.toolTipCustomClass
                        : "hovertip"
                    }`}
                    data-tip={route.name}
                  >
                    <img src={route.icon} alt={route.name} />
                  </a>
                  <div className="dropdown-container">
                    {/* First Level childNavs */}
                    {route?.childNavs?.map((firstChildNav) => (
                      !firstChildNav.isNotSideBarNavigation &&
                      <>
                        <a
                          href="#"
                          onClick={(e) => onNavigate(e, firstChildNav?.path)}
                          onMouseOver={() =>
                            handleChildMenuState(firstChildNav.path, true)
                          }
                          onMouseLeave={() =>
                            handleChildMenuState(firstChildNav.path, false)
                          }
                        >
                          {firstChildNav.text}
                        </a>
                        {/* Second Level childNavs */}
                        {firstChildNav?.childNavs && <div
                          className={`dropdown-container_child ${firstChildNav.customDropContainerClass && firstChildNav.customDropContainerClass} ${
                            childMenuState[firstChildNav.path] && "active"
                          }`}
                          onMouseOver={() =>
                            handleChildMenuState(firstChildNav.path, true)
                          }
                          onMouseLeave={() =>
                            handleChildMenuState(firstChildNav.path, false)
                          }
                        >
                          {firstChildNav?.childNavs?.map((secondChildNav) => (
                            <a
                              href="#"
                              onClick={(e) =>
                                onNavigate(e, secondChildNav.path)
                              }
                            >
                              {secondChildNav.text}
                            </a>
                          ))}
                        </div>}
                      </>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <div className="mainwrap content">
        <div className="topwrap">
          <div className="top_Header">
            <div className="topheader">
              <div className="topheader-left">
                <h3 id="topheader_text">
                  {get(pageTitleMapper, `${pathName}.module`, "")}{" "}
                </h3>
                <h4 id="Page_header">
                  {get(pageTitleMapper, `${pathName}.pageTitle`, "")}
                </h4>
              </div>
              <div className="topheader-right">
                <div className="notify-block">
                  <a href="">
                    <img src={notification} />
                  </a>
                </div>
                <div className="userwrap">
                  <div className="logindes">
                    <h4>
                      <a className="">kevin</a>
                    </h4>
                    <h6>
                      <a className="userRole">Operation</a>
                    </h6>
                  </div>
                  <div className="loginico">
                    <a href="">
                      <img src={user} />
                    </a>
                  </div>
                </div>
                <div className="logout">
                  <a href="/logout">
                    <img src={logout} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
