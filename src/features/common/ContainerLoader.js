import React, { useState } from "react";
import images from "../../assets/images";

const Container = () => {
  const [showSettingsChild, setShowSettingsChild] = useState(false);
  const [showAdminChild, setShowAdminChild] = useState(false);
  const [showDevopsMetricsChild, setShowDevopsMetricsChild] = useState(false);

  return (
    <div className="wrapper_jr">
      <header>
        <div className="headerwrap">
          <div className="header-logo">
            <a hlight="index.html">
              <img src={images.logoSmall} alt="DevOpsLab" />
            </a>
          </div>
          <div className="nav">
            <ul>
              <li class={`dropdown-btn`}>
                {" "}
                <a
                  hlight="/Observability"
                  className="hovertip"
                  data-tip="Code8 Observability"
                >
                  <img src={images.observability} alt="Code8 Observability" />
                </a>
                <div className="dropdown-container">
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
              <li class={`dropdown-btn`}>
                <a
                  href="/gnc"
                  hlight="/Governance"
                  className="hovertipgnc"
                  data-tip="Governance and Compliance"
                >
                  <img src={images.gnc} alt="Governance and Compliance" />
                </a>
                <div className="dropdown-container">
                  <a href="/bt">Jenkins</a>
                  <a href="/bitbucketTrend">Bitbucket</a>
                </div>
              </li>
              <li class={`dropdown-btn`}>
                <a
                  hlight="/Efficiency"
                  className="hovertip"
                  data-tip="Code8 Efficiency"
                >
                  <img src={images.efficiency} alt="Code8 Efficiency" />
                </a>
                <div className="dropdown-container">
                  <a href="/appConfig">App Config</a>
                  <a href="/accessManagement">Access Management</a>
                  <a href="/myRequest">My Request</a>
                  <a href="/myApproval">My Approval</a>
                  <a href="/auditLog">Audit Log</a>
                </div>
              </li>
              <li class={`dropdown-btn`}>
                {" "}
                <a
                  hlight="/Configuration"
                  className="hovertip"
                  data-tip="Code8 Configuration"
                >
                  <img src={images.configuration} alt="Code8 Configuration" />
                </a>
                <div className="dropdown-container">
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
                    <a href="#">Tools</a>
                    <a href="#">Groups</a>
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
                    <a href="#">LDAP Configuration</a>
                    <a href="#">SMTP Configuration</a>
                    <a href="#">License Configuration</a>
                    <a href="#">User Management</a>
                    <a href="#">Logging Configuration</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="mainwrap content">
        <div className="topwrap">
          <div className="top_Header">
            <div className="topheader">
              <div className="topheader-left">
                <h3 id="topheader_text">Code8 Observability - </h3>
                <h4 id="Page_header">People Metrics</h4>
              </div>
              <div className="topheader-right">
                <div className="notify-block">
                  <a href="">
                    <img src={images.notification} />
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
                      <img src={images.user} />
                    </a>
                  </div>
                </div>
                <div className="logout">
                  <a href="/logout">
                    <img src={images.logout} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper"></div>
        </div>
      </div>
      <div className="loader_overlay">
        <div className="page_loader">
          <img className="page_loading" src={images.loader} alt="Loader" />
        </div>
      </div>
    </div>
  );
};

export default Container;
