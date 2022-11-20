import React from "react";
import {
  observability,
  gnc,
  efficiency,
  configuration,
} from "../assets/images/index";

const SignIn = React.lazy(() => import("../features/auth/SignIn"));
const FlowMetrics = React.lazy(() =>
  import("../features/observability/flowMetrics/FlowMetricsLanding")
);
const PeopleMetrics = React.lazy(() =>
  import("../features/observability/peopleMetrics/PeopleMetricsLanding")
);
const ProductivityMetrics = React.lazy(() =>
  import("../features/observability/productivityMetrics/ProductivityMetricsLanding")
);
const DevopsMetrics = React.lazy(() =>
  import("../features/observability/devopsMetrics/DevopsMetricsLanding")
);
const OpsMetricsIncidentManagement = React.lazy(() =>
  import("../features/observability/opsMetrics/IncidentManagement/IncidentMangementLanding")
);
const OpsMetricsChangeManagement = React.lazy(() =>
  import("../features/observability/opsMetrics/ChangeMangement/ChangeMangementLanding")
);
const Bitbucket = React.lazy(() =>
  import("../features/gnc/bitbucket/Bitbucket")
);
const Jenkins = React.lazy(() => import("../features/gnc/jenkins/JenkinsLanding"));
const AppConfig = React.lazy(() =>
  import("../features/efficiency/appConfig/AppConfig")
);
const AccessManagement = React.lazy(() =>
  import("../features/efficiency/accessManagement/AccessManagement")
);
const MyRequest = React.lazy(() =>
  import("../features/efficiency/myRequest/MyRequest")
);
const MyApproval = React.lazy(() =>
  import("../features/efficiency/myApproval/MyApproval")
);
const AuditLog = React.lazy(() =>
  import("../features/efficiency/auditLog/AuditLog")
);
const Tools = React.lazy(() =>
  import("../features/configuration/settings/tools/Tools")
);
const Groups = React.lazy(() =>
  import("../features/configuration/settings/groups/Groups")
);
const LdapConfig = React.lazy(() =>
  import("../features/configuration/admin/ldapConfig/LdapConfig")
);
const SmtpConfig = React.lazy(() =>
  import("../features/configuration/admin/smtpConfig/SmtpConfig")
);
const LicenseConfig = React.lazy(() =>
  import("../features/configuration/admin/licenseConfig/LicenseConfig")
);
const UserManagement = React.lazy(() =>
  import("../features/configuration/admin/userManagement/UserManagement")
);
const LoggingConfig = React.lazy(() =>
  import("../features/configuration/admin/loggingConfig/LoggingConfig")
);

export const authRoutes = [
  {
    name: "SignIn",
    path: "/logout",
    component: <SignIn />,
    key: 0,
  },
  {
    name: "SignIn",
    path: "/auth",
    component: <SignIn />,
    key: 0,
  },
];

export const routes = [
  //CODE8 Observability
  {
    name: "Code8 Observability",
    path: "observability",
    component: <FlowMetrics />,
    key: "1",
    icon: observability,
    childNavs: [
      {
        name: "FlowMetrics",
        text: "Flow Metrics",
        path: "/observability/flowMetrics",
        component: <FlowMetrics />,
        key: "1.1",
      },
      {
        name: "PeopleMetrics",
        text: "People Metrics",
        path: "observability/peopleMetrics",
        component: <PeopleMetrics />,
        key: "1.2",
      },
      {
        text: "Productivity Metrics",
        name: "ProductivityMetrics",
        path: "observability/productivityMetrics",
        component: <ProductivityMetrics />,
        key: "1.3",
      },
      {
        text: "Devops Metrics",
        name: "DevopsMetrics",
        path: "observability/devopsMetrics",
        component: <DevopsMetrics />,
        key: "1.4",
      },
      {
        text: "Ops Metrics",
        name: "OpsMetrics",
        path: "observability/opsMetrics/incidentManagement",
        customDropContainerClass: "ops",
        component: <OpsMetricsIncidentManagement />,
        key: "1.5",
        childNavs: [
          {
            text: "Incident Management",
            name: "IncidentManagement",
            path: "observability/opsMetrics/incidentManagement",
            component: <OpsMetricsIncidentManagement/>,
            key: "1.5.1",
          },
          {
            text: "Change Management",
            name: "ChangeManagement",
            path: "observability/opsMetrics/changeManagement",
            component: <OpsMetricsChangeManagement/>,
            key: "1.5.1",
          },
        ],
      },
    ],
  },
  //CODE8 Governance and Compliance
  {
    name: "Governance and Compliance",
    path: "gnc",
    component: <Bitbucket />,
    key: "2",
    icon: gnc,
    toolTipCustomClass: "hovertipgnc",
    childNavs: [
      {
        name: "Jenkins",
        text: "Jenkins",
        path: "gnc/jenkins",
        component: <Jenkins />,
        key: "2.1",
      },
      {
        name: "Bitbucket",
        text: "Bitbucket",
        path: "gnc/bitbucket",
        component: <Bitbucket />,
        key: "2.2",
      },
    ],
  },
  //CODE8 Efficiency
  {
    name: "Code8 Efficiency",
    path: "efficiency",
    component: <AppConfig />,
    key: "3",
    icon: efficiency,
    childNavs: [
      {
        name: "AppConfig",
        text: "App Config",
        path: "efficiency/appConfig",
        component: <AppConfig />,
        key: "3.1",
      },
      {
        name: "AccessManagement",
        text: "Access Management",
        path: "efficiency/accessManagement",
        component: <AccessManagement />,
        key: "3.2",
      },
      {
        name: "MyRequest",
        text: "My Request",
        path: "efficiency/myRequest",
        component: <MyRequest />,
        key: "3.3",
      },
      {
        name: "MyApproval",
        text: "My Approval",
        path: "efficiency/myApproval",
        component: <MyApproval />,
        key: "3.4",
      },
      {
        name: "AuditLog",
        text: "Audit Log",
        path: "efficiency/auditLog",
        component: <AuditLog />,
        key: "3.5",
      },
    ],
  },
  //CODE8 Configuration
  {
    name: "Code8 Configuration",
    path: "configuration",
    component: <Tools />,
    key: "4",
    icon: configuration,
    childNavs: [
      {
        name: "Settings",
        text: "Settings",
        path: "configuration/settings/tools",
        customDropContainerClass: "settings",
        component: <Tools />,
        key: "4.1",
        childNavs: [
          {
            name: "Tools",
            text: "Tools",
            path: "configuration/settings/tools",
            component: <Tools />,
            key: "4.1.1",
          },
          {
            name: "Groups",
            text: "Groups",
            path: "configuration/settings/groups",
            component: <Groups />,
            key: "4.1.2",
          },
        ],
      },
      {
        name: "Administration",
        text: "Administration",
        path: "configuration/administration/ldapConfig",
        customDropContainerClass: "admin",
        component: <LdapConfig />,
        key: "4.2",
        childNavs: [
          {
            name: "LdapConfig",
            text: "Ldap Config",
            path: "configuration/administration/ldapConfig",
            component: <LdapConfig />,
            key: "4.2.1",
          },
          {
            name: "SmtpConfig",
            text: "Smtp Config",
            path: "configuration/administration/smtpConfig",
            component: <SmtpConfig />,
            key: "4.2.2",
          },
          {
            name: "LicenseConfig",
            text: "License Config",
            path: "configuration/administration/licenseConfig",
            component: <LicenseConfig />,
            key: "4.2.3",
          },
          {
            name: "UserManagement",
            text: "User Management",
            path: "configuration/administration/userManagement",
            component: <UserManagement />,
            key: "4.2.4",
          },
          {
            name: "LoggingConfig",
            text: "Logging Config",
            path: "configuration/administration/loggingConfig",
            component: <LoggingConfig />,
            key: "4.2.5",
          },
        ],
      },
    ],
  },
];
