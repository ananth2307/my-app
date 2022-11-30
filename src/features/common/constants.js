// export const metricTypesMapping = {
//   Task: "features",
//   Subtask: "features",
//   Epic: "features",
//   Story: "features",
//   "Change Request": "enablers",
//   Enablers: "enablers",
//   Risk: "risk",
//   Bug: "defects",
//   Debt: "debt",
//   prodFix: "prodFix",
// };
export const getMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const metricTypesMapping = {
  features: ["Task", "Subtask", "Epic", "Story"],
  enablers: ["Change Request", "Enablers"],
  risk: ["Risk"],
  defects: ["Bug"],
  debt: ["Debt"],
  prodFix: ["prodFix"],
};
export const  sortingArr = [
  "Backlog",
  "IN-DEFINE",
  "In-Dev",
  "READY-VERIFICATION",
  "SIT IN-VERIFICATION",
  "SIT-VERIFICATION FAILED",
  "Testing",
  "Done",
];
export const ChartLineColor1 = "rgb(75, 192, 192)"
export const loginColor = "#035558";
export const logoutColor = "#B80413";
export const IncidentLabels =
[
  {
  label:'Performance',
  open:false
},
{
  label:'Availability',
  open:false
},
{
  label:'Network',
  open:false
},
{
  label:'Others',
  open:false
}
]
export const ChangeLabels =
[
  {
  label:'Normal',
  open:false
},
{
  label:'Standard',
  open:false
},
{
  label:'Emergency',
  open:false
}
]