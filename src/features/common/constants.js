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
export const getMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
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
