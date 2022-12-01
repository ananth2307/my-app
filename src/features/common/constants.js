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
export const chartColors = [
  { success: "rgb(71,145,255)", failed: "rgb(242,172,4)" },
  { success: "rgb(2,188,119)", failed: "rgb(255,84,84)" },
  { success: "rgb(209,80,255)", failed: "rgb(80,255,255)" },
  { success: "rgb(209,225,6)", failed: "rgb(225,6,211)" },
  { success: "rgb(71,45,255)", failed: "rgb(242,67,4)" },
  { success: "rgb(123,145,112)", failed: "rgb(45,172,234)" },
  { success: "rgb(255,145,54)", failed: "rgb(26,172,214)" },
  { success: "rgb(123,234,59)", failed: "rgb(212,234,48)" },
];
