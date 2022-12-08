import React, { memo } from "react";
import { goldMedal } from "../../../assets/images";
import { get, isEmpty } from "lodash";
import { projectChampionData } from "../../../mockData/PeopleMetrics/ProjectChampions";
const ProjectChampions = (props) => {
  const projectChampions = get(projectChampionData, "project champions", []);
  let projectChampionsData = [];
  let linkRef = document.getElementsByClassName("viewlink");
  const openDrillDown = () => {          
    console.log('Drilldown clicked')
  };
  if (!isEmpty(linkRef)) {
    for (let i = 0; i < linkRef.length; i++) {
      linkRef[i].addEventListener("click", openDrillDown);
    }
  }
  !isEmpty(projectChampions) &&
    projectChampions
      .map((items) => items)
      .map((items) => {
        Object.keys(items).map((key) => {
          projectChampionsData.push(items[key]);
          projectChampionsData.sort((a, b) => b.commitCount - a.commitCount);
        });
      });
  const topThreeChampions = projectChampionsData.splice(0, 3);
  return (
    <div class="cham-block">
      {!isEmpty(topThreeChampions) &&
        topThreeChampions.map((champ) => (
          <div class="chamrow">
            <div class="chamwrap">
              <div class="cham-med">
                <img src={goldMedal} alt="goldMedal" />
              </div>
              <div class="cham-head">
                <h3>{champ.authorName}</h3>
                <h4>{champ.applicationName}</h4>
              </div>
            </div>
            <div class="cham-des">
              <p>Average lines of code per week</p>
              <div class="cham-num">{champ.commitCount}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default memo(ProjectChampions);
