import React, { memo } from 'react'

const MeanTimeDrill = ({MTBIdata}) => {
  return (
        <div class="incidnt-type-wrap">
          <div class="typeleft-block">
            <h4>Mean Time Between Incidents</h4>
          </div>
          <div class="typeright-block">
            <div class="meantype-wrap">
              <div class="meantype-col">
                <h5>Shortest</h5>
                <div class="circle smcol">
                  <span id="shortest_count">
                    {Math.round(MTBIdata.shortest || 0)}
                  </span>{" "}
                  d
                </div>
              </div>
              <div class="meantype-col">
                <h5>Average</h5>
                <div class="circle mdcol">
                  <span id="average_count">
                    {Math.round(MTBIdata.average || 0)}
                  </span>{" "}
                  d
                </div>
              </div>
              <div class="meantype-col">
                <h5>Longest</h5>
                <div class="circle lgcol">
                  <span>{Math.round(MTBIdata.longest || 0)}</span> d
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default memo(MeanTimeDrill)