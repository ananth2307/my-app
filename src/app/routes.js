import React from 'react';
const SignIn = React.lazy(() => import('../features/auth/SignIn'));
const FlowMetrics = React.lazy(() => import('../features/observability/flowMetrics/FlowMetrics'));
const PeopleMetrics = React.lazy(() => import('../features/observability/peopleMetrics/PeopleMetrics'));
const ProductivityMetrics = React.lazy(() => import('../features/observability/productivityMetrics/ProductivityMetrics'));
const DevopsMetrics = React.lazy(() => import('../features/observability/devopsMetrics/DevopsMetrics'));
const OpsMetrics = React.lazy(() => import('../features/observability/opsMetrics/OpsMetrics'));
const Bitbucket = React.lazy(() => import('../features/gnc/bitbucket/Bitbucket'));
const Jenkins = React.lazy(() => import('../features/gnc/jenkins/Jenkins'));
const AppConfig = React.lazy(() => import('../features/efficiency/appConfig/AppConfig'));
const AccessManagement = React.lazy(() => import('../features/efficiency/accessManagement/AccessManagement'));
const MyRequest = React.lazy(() => import('../features/efficiency/myRequest/MyRequest'));
const MyApproval = React.lazy(() => import('../features/efficiency/myApproval/MyApproval'));
const AuditLog = React.lazy(() => import('../features/efficiency/auditLog/AuditLog'));
const Tools = React.lazy(() => import('../features/configuration/settings/tools/Tools'));
const Groups = React.lazy(() => import('../features/configuration/settings/groups/Groups'));
const LdapConfig = React.lazy(() => import('../features/configuration/admin/ldapConfig/LdapConfig'));
const SmtpConfig = React.lazy(() => import('../features/configuration/admin/smtpConfig/SmtpConfig'));
const LicenseConfig = React.lazy(() => import('../features/configuration/admin/licenseConfig/LicenseConfig'));
const UserManagement = React.lazy(() => import('../features/configuration/admin/userManagement/UserManagement'));
const LoggingConfig = React.lazy(() => import('../features/configuration/admin/loggingConfig/LoggingConfig'));

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
]

export const routes = [
  //CODE8 Observability
  {
    name: "FlowMetrics",
    path: "observability",
    component: <FlowMetrics />,
    key: 1,
  },
  {
    name: "FlowMetrics",
    path: "observability/flowMetrics",
    component: <FlowMetrics />,
    key: 1.1,
  },
  {
    name: "PeopleMetrics",
    path: "observability/peopleMetrics",
    component: <PeopleMetrics />,
    key: 1.2,
  },
  {
    name: "ProductivityMetrics",
    path: "observability/productivityMetrics",
    component: <ProductivityMetrics />,
    key: 1.3,
  },
  {
    name: "DevopsMetrics",
    path: "observability/devopsMetrics",
    component: <DevopsMetrics />,
    key: 1.4,
  },
  {
    name: "OpsMetrics",
    path: "observability/opsMetrics",
    component: <OpsMetrics />,
    key: 1.5,
  },
  //CODE8 Governance and Compliance
  {
    name: "Bitbucket",
    path: "gnc/bitbucket",
    component: <Bitbucket />,
    key: 2.1,
  },
  {
    name: "Jenkins",
    path: "gnc/jenkins",
    component: <Jenkins />,
    key: 2.2,
  },
  //CODE8 Efficiency
  {
    name: "AppConfig",
    path: "efficiency/appConfig",
    component: <AppConfig />,
    key: 3.1,
  },
  {
    name: "AccessManagement",
    path: "efficiency/accessManagement",
    component: <AccessManagement />,
    key: 3.2,
  },
  {
    name: "MyRequest",
    path: "efficiency/myRequest",
    component: <MyRequest />,
    key: 3.3,
  },
  {
    name: "MyApproval",
    path: "efficiency/myApproval",
    component: <MyApproval />,
    key: 3.4,
  },
  {
    name: "AuditLog",
    path: "efficiency/auditLog",
    component: <AuditLog />,
    key: 3.5,
  },
  //CODE8 Configuration
  {
    name: "Tools",
    path: "configuration/settings/tools",
    component: <Tools />,
    key: "4.1.1",
  },
  {
    name: "Groups",
    path: "configuration/settings/groups",
    component: <Groups />,
    key: "4.1.2",
  },
  {
    name: "LdapConfig",
    path: "configuration/administration/ldapConfig",
    component: <LdapConfig />,
    key: "4.2.1",
  },
  {
    name: "SmtpConfig",
    path: "configuration/administration/smtpConfig",
    component: <SmtpConfig />,
    key: "4.2.2",
  },
  {
    name: "LicenseConfig",
    path: "configuration/administration/licenseConfig",
    component: <LicenseConfig />,
    key: "4.2.3",
  },
  {
    name: "UserManagement",
    path: "configuration/administration/userManagement",
    component: <UserManagement />,
    key: "4.2.4",
  },
  {
    name: "LoggingConfig",
    path: "configuration/administration/loggingConfig",
    component: <LoggingConfig />,
    key: "4.2.5",
  },
];
