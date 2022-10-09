import React, { useState } from "react";
import images from "../../assets/images";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { pageTitleMapper } from "./utilities/constants";
import { get } from "lodash";

const Container = () => {
  const [showSettingsChild, setShowSettingsChild] = useState(false);
  const [showAdminChild, setShowAdminChild] = useState(false);
  const [showDevopsMetricsChild, setShowDevopsMetricsChild] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onNavigate = (e, url) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <div class="wrapper_jr">
      <header>
        <div class="headerwrap">
          <div class="header-logo">
            <a hlight="index.html">
              <img src={images.logoSmall} alt="DevOpsLab" />
            </a>
          </div>
          <div class="nav">
            <ul>
              <li
                class={`dropdown-btn ${
                  location.pathname.includes("observability") && "active"
                }`}
              >
                {" "}
                <a
                  hlight="/Observability"
                  class="hovertip"
                  data-tip="Code8 Observability"
                >
                  <img src={images.observability} alt="Code8 Observability" />
                </a>
                <div class="dropdown-container">
                  <a href="/flowMetrics">Flow Metrics</a>
                  <a href="/peopleMetrics">People Metrics</a>
                  <a href="/productivityMetrics">Productivity Metrics</a>
                  <a href="/devopsMetrics">DevOps Metrics</a>
                  <a
                    flag="ops"
                    onMouseOver={() => setShowDevopsMetricsChild(true)}
                    onMouseLeave={() => setShowDevopsMetricsChild(false)}
                  >
                    Ops Metrics
                  </a>
                  <div
                    class={`dropdown-container_child ops ${
                      showDevopsMetricsChild && "active"
                    }`}
                    id="inchange"
                    onMouseOver={() => setShowDevopsMetricsChild(true)}
                    onMouseLeave={() => setShowDevopsMetricsChild(false)}
                  >
                    <a href="/incidentManagement">Incident Management</a>
                    <a href="/changeManagement">Change Management</a>
                  </div>
                </div>
              </li>
              <li
                class={`dropdown-btn ${
                  location.pathname.includes("gnc") && "active"
                }`}
              >
                <a
                  href="/gnc"
                  hlight="/Governance"
                  class="hovertipgnc"
                  data-tip="Governance and Compliance"
                >
                  <img src={images.gnc} alt="Governance and Compliance" />
                </a>
                <div class="dropdown-container">
                  <a href="/bt">Jenkins</a>
                  <a href="/bitbucketTrend">Bitbucket</a>
                </div>
              </li>
              <li
                class={`dropdown-btn ${
                  location.pathname.includes("efficiency") && "active"
                }`}
              >
                <a
                  hlight="/Efficiency"
                  class="hovertip"
                  data-tip="Code8 Efficiency"
                >
                  <img src={images.efficiency} alt="Code8 Efficiency" />
                </a>
                <div class="dropdown-container">
                  <a href="/appConfig">App Config</a>
                  <a href="/accessManagement">Access Management</a>
                  <a href="/myRequest">My Request</a>
                  <a href="/myApproval">My Approval</a>
                  <a href="/auditLog">Audit Log</a>
                </div>
              </li>
              <li
                class={`dropdown-btn ${
                  location.pathname.includes("configuration") && "active"
                }`}
              >
                {" "}
                <a
                  hlight="/Configuration"
                  class="hovertip"
                  data-tip="Code8 Configuration"
                >
                  <img src={images.configuration} alt="Code8 Configuration" />
                </a>
                <div class="dropdown-container">
                  <a
                    flag="settings"
                    onMouseOver={() => setShowSettingsChild(true)}
                    onMouseLeave={() => setShowSettingsChild(false)}
                  >
                    Settings
                  </a>
                  <div
                    className={`dropdown-container_child settings ${
                      showSettingsChild && "active"
                    }`}
                    onMouseOver={() => setShowSettingsChild(true)}
                    onMouseLeave={() => setShowSettingsChild(false)}
                  >
                    <a
                      href="#"
                      onClick={(e) =>
                        onNavigate(e, "/configuration/settings/tools")
                      }
                    >
                      Tools
                    </a>
                    <a
                      href="#"
                      onClick={(e) =>
                        onNavigate(e, "/configuration/settings/groups")
                      }
                    >
                      Groups
                    </a>
                  </div>
                  <a
                    flag="admin"
                    onMouseOver={() => setShowAdminChild(true)}
                    onMouseLeave={() => setShowAdminChild(false)}
                  >
                    Administration
                  </a>
                  <div
                    className={`dropdown-container_child admin ${
                      showAdminChild && "active"
                    }`}
                    id="adchange"
                    onMouseOver={() => setShowAdminChild(true)}
                    onMouseLeave={() => setShowAdminChild(false)}
                  >
                    <a
                      href="#"
                      onClick={(e) =>
                        onNavigate(
                          e,
                          "/configuration/administration/ldapConfig"
                        )
                      }
                    >
                      LDAP Configuration
                    </a>
                    <a
                      href="#"
                      onClick={(e) =>
                        onNavigate(
                          e,
                          "/configuration/administration/smtpConfig"
                        )
                      }
                    >
                      SMTP Configuration
                    </a>
                    <a
                      href="#"
                      onClick={(e) =>
                        onNavigate(
                          e,
                          "/configuration/administration/licenseConfig"
                        )
                      }
                    >
                      License Configuration
                    </a>
                    <a
                      href="#"
                      onClick={(e) =>
                        onNavigate(
                          e,
                          "/configuration/administration/userManagement"
                        )
                      }
                    >
                      User Management
                    </a>
                    <a
                      href="#"
                      onClick={(e) =>
                        onNavigate(
                          e,
                          "/configuration/administration/loggingConfig"
                        )
                      }
                    >
                      Logging Configuration
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div class="mainwrap content">
        <div class="topwrap">
          <div class="top_Header">
            <div class="topheader">
              <div class="topheader-left">
                <h3 id="topheader_text">{get(pageTitleMapper, `${location.pathname}.module`, '')} </h3>
                <h4 id="Page_header">{get(pageTitleMapper, `${location.pathname}.pageTitle`, '')}</h4>
              </div>
              <div class="topheader-right">
                <div class="notify-block">
                  <a href="">
                    <img src={images.notification} />
                  </a>
                </div>
                <div class="userwrap">
                  <div class="logindes">
                    <h4>
                      <a class="">kevin</a>
                    </h4>
                    <h6>
                      <a class="userRole">Operation</a>
                    </h6>
                  </div>
                  <div class="loginico">
                    <a href="">
                      <img src={images.user} />
                    </a>
                  </div>
                </div>
                <div class="logout">
                  <a href="/logout">
                    <img src={images.logout} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
