import React, { memo } from "react";
import { goldMedal } from "../../../assets/images";
import { get } from "lodash";

const ProjectChampions = (props) => {
  return (
    <div class="cham-block">
      <div class="chamrow" id="championsDiv">
        <div class="chamwrap">
          <div class="cham-med">
            <img src={goldMedal} />
          </div>
          <div class="cham-head">
            <h3>Shriraam</h3>
            <h4>JAVA</h4>
          </div>
        </div>
        <div class="cham-des">
          <p>Average lines of code per week</p>
          <div class="cham-num">3805</div>
        </div>
      </div>
      <div class="chamrow">
        <div class="chamwrap">
          <div class="cham-med">
            <img src={goldMedal} />
          </div>
          <div class="cham-head">
            <h3>Kevin</h3>
            <h4>JAVA</h4>
          </div>
        </div>
        <div class="cham-des">
          <p>Average lines of code per week</p>
          <div class="cham-num">2112</div>
        </div>
      </div>
      <div class="chamrow">
        <div class="chamwrap">
          <div class="cham-med">
            <img src={goldMedal} />
          </div>
          <div class="cham-head">
            <h3>Lisha</h3>
            <h4>JAVA</h4>
          </div>
        </div>
        <div class="cham-des">
          <p>Average lines of code per week</p>
          <div class="cham-num">1234</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectChampions);
