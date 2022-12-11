import { get, isEmpty } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { toolsName } from "../constants";

const ToolsOnBoard = () => {
  const { accessManagement } = useSelector((state) => state.efficiency);

  const onBoardData = get(accessManagement, "onBoardData", []);

  console.log({onBoardData})

  const matchTools = (name) => {
    console.log({name})
    return (
      onBoardData.map((tool) => {
        console.log({tool})
        if (tool.type === name) {
            console.log("items matchesd",tool)
          return (
            <div class="toolsList_panel">
              <div class="toolscol-img">
                <img
                  src={`./../../../assets/images/tools/${tool.tool}.png`}
                  class="Adtools"
                  alt="toolImg"
                />
              </div>
            </div>
          );
        }
      })
    );
  };

  return (
    <div class="onboard-wrap">
      <h5 class="sechead">Tools Onboarded</h5>
      <div class="onboardcol bg-white">
        <div class="toolsnav">
          {toolsName.map((name) => {
            return (
              <div class="toolscol">
                <h4>{name}</h4>
                {matchTools(name)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsOnBoard;
