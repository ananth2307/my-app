import { get } from 'lodash';
import React, { memo } from 'react'
import { useSelector } from 'react-redux';

const MeanTimeDrill = ({meanTimeData}) => {
  const commonSliceState = useSelector((state) => state.common);
    const selectedData = get(commonSliceState, "offcanvasState.selectedData", []);
  return (
        <div class={!selectedData.MeanTimeDrillDown ? "incidnt-type-wrap" : ""}>
        {!selectedData.MeanTimeDrillDown &&
          <div class="typeleft-block">
            <h4>Mean Time Between Incidents</h4>
          </div>
        }
          <div class={!selectedData.MeanTimeDrillDown ? "typeright-block" : 'mtr'}>
            <div class="meantype-wrap">
              <div class="meantype-col">
                <h5>Shortest</h5>
                <div class="circle smcol">
                  <span id="shortest_count">
                    {Math.round(meanTimeData.shortest || 0)}
                  </span>{" "}
                  d
                </div>
              </div>
              <div class="meantype-col">
                <h5>Average</h5>
                <div class="circle mdcol">
                  <span id="average_count">
                    {Math.round(meanTimeData.avarage || 0)}
                  </span>{" "}
                  d
                </div>
              </div>
              <div class="meantype-col">
                <h5>Longest</h5>
                <div class="circle lgcol">
                  <span>{Math.round(meanTimeData.longest || 0)}</span> d
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default memo(MeanTimeDrill)