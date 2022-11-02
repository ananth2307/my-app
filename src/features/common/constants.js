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

export const metricTypesMapping = {
  features: ["Task", "Subtask", "Epic", "Story"],
  enablers: ["Change Request", "Enablers"],
  risk: ["Risk"],
  defects: ["Bug"],
  debt: ["Debt"],
  prodFix: ["prodFix"],
};
