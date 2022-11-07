import React from "react";

const DdDefaultLevelOne = (props) => {
  return (
    <div id="fb1" flag="distribute" className={`flowbox dark-blueline ${props.level.className}`}>
      <h4>{props?.level?.title}</h4>
      <h2 class="fdcount">
        {props.count ? props.count : 0}
      </h2>
    </div>
  );
};

export default DdDefaultLevelOne;
