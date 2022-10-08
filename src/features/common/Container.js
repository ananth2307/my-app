import React from "react";
import images from "../../assets/images";

const Container = ({children}) => {
  return (
    <div class="wrapper_jr">
      <header>
        <div class="headerwrap">
          <div class="header-logo">
            <a hlight="index.html">
              <img
                src={images.logoSmall}
                alt="DevOpsLab"
              />
            </a>
          </div>
          <div class="nav">
            <ul>
              <li class="dropdown-btn active">
                {" "}
                <a
                  hlight="/Observability"
                  class="hovertip"
                  data-tip="Code8 Observability"
                >
                  <img
                    src={images.observability} alt="Code8 Observability"
                  />
                </a>
                <div class="dropdown-container">
                  <a href="/flowMetrics">Flow Metrics</a>
                  <a href="/peopleMetrics">People Metrics</a>
                  <a href="/productivityMetrics">Productivity Metrics</a>
                  <a href="/devopsMetrics">DevOps Metrics</a>
                  <a flag="ops">Ops Metrics</a>
                  <div class="dropdown-container_child ops" id="inchange">
                    <a href="/incidentManagement">Incident Management</a>
                    <a href="/changeManagement">Change Management</a>
                  </div>
                </div>
              </li>
              <li class="dropdown-btn">
                <a
                  href="/gnc"
                  hlight="/Governance"
                  class="hovertipgnc"
                  data-tip="Governance and Compliance"
                >
                  <img
                    src={images.gnc}
                    alt="Governance and Compliance"
                  />
                </a>
                <div class="dropdown-container">
                  <a href="/bt">Jenkins</a>
                  <a href="/bitbucketTrend">Bitbucket</a>
                </div>
              </li>
              <li class="dropdown-btn">
                <a
                  hlight="/Efficiency"
                  class="hovertip"
                  data-tip="Code8 Efficiency"
                >
                  <img
                    src={images.efficiency}
                    alt="Code8 Efficiency"
                  />
                </a>
                <div class="dropdown-container">
                  <a href="/appConfig">App Config</a>
                  <a href="/accessManagement">Access Management</a>
                  <a href="/myRequest">My Request</a>
                  <a href="/myApproval">My Approval</a>
                  <a href="/auditLog">Audit Log</a>
                </div>
              </li>
              <li class="dropdown-btn">
                {" "}
                <a
                  hlight="/Configuration"
                  class="hovertip"
                  data-tip="Code8 Configuration"
                >
                  <img
                    src={images.configuration}
                    alt="Code8 Configuration"
                  />
                </a>
                <div class="dropdown-container">
                  <a flag="settings">Settings</a>
                  <div class="dropdown-container_child settings">
                    <a href="/settings/tools">Tools</a>
                    <a href="/settings/groups">Groups</a>
                  </div>
                  <a flag="admin">Administration</a>
                  <div class="dropdown-container_child admin" id="adchange">
                    <a href="/admin/directory">LDAP Configuration</a>
                    <a href="/smtpConfiguration">SMTP Configuration</a>
                    <a href="/admin/licence">License Configuration</a>
                    <a href="/admin/users">User Management</a>
                    <a href="/admin/loggingConfiguration">
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
                <h3 id="topheader_text">Code8 Observability - </h3>
                <h4 id="Page_header">People Metrics</h4>
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
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
