import React from "react";
import { Bar } from "react-chartjs-2";

const Plan = (props) => {
  return (
    <>
      <div className="row">
        <div class="col-md-12">
          <div class="panel-inner_class">
            <label>Active sprints</label>
            <canvas
              id="activeSprints"
              width="1156"
              height="216"
              // style="display: block; height: 108px; width: 578px;"
              class="chartjs-render-monitor"
            ></canvas>
          </div>
        </div>
      </div>
      <div className="row">
        <div class="col-md-4">
          <div class="panel-inner_class set_fix">
            <label>Active sprint: Issue types</label>
            <canvas
              id="issueTypes"
              width="956"
              height="572"
            //   style="display: block; height: 286px; width: 478px;"
              class="chartjs-render-monitor"
            ></canvas>
            <div class="ps-legend spl-case" id="asit">
              <div class="row mb-10"></div>
              <div class="row mb-10">
                <div class="b-ring-clr legend-ring"></div>
                <div class="legend-text">Features</div>
                <span class="legend-val" id="asFeatures">
                  38
                </span>
              </div>
              <div class="row mb-10">
                <div class="dy-ring-clr legend-ring"></div>
                <div class="legend-text">Defects</div>
                <span class="legend-val" id="asDefects">
                  47
                </span>
              </div>
              <div class="row mb-10">
                <div class="y-ring-clr legend-ring"></div>
                <div class="legend-text">Risks</div>
                <span class="legend-val" id="asRisks">
                  0
                </span>
              </div>
              <div class="row mb-10">
                <div class="r-ring-clr legend-ring"></div>
                <div class="legend-text">Enablers</div>
                <span class="legend-val" id="asEnablers">
                  17
                </span>
              </div>
              <div class="row mb-10">
                <div class="db-ring-clr legend-ring"></div>
                <div class="legend-text">Debt</div>
                <span class="legend-val" id="asDebt">
                  1
                </span>
              </div>
              <div class="row mb-10">
                <div class="pd-ring-clr legend-ring"></div>
                <div class="legend-text">Prod-Fix</div>
                <span class="legend-val" id="asProdfix">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      <div class="col-md-4">
        <div class="panel-inner_class col-md-12 row set_fix">
            <div class="col-md-12 p-0">
                <label>Active sprint: Priority</label>
            </div>
            <div id="priority" class="col-md-12 p-0 us-propanal pascroll">
                <span class="progress-name">Blocker</span><span class="pull-right progress-name" id="uspBlocker">0 %</span>
                <div class="progress us-progress" value="Blocker">
                    <div class="progress-bar" id="us-scale-3" data-toggle="tooltip" title="0" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: "0%"}} data-original-title="">
                    </div>
                </div>
                <span class="progress-name">Critical</span><span class="pull-right progress-name" id="uspCritical">3.74 %</span>
                <div class="progress us-progress" value="Critical">
                    <div class="progress-bar" id="us-scale-1" data-toggle="tooltip" title="4" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: "3.74%"}} data-original-title="">
                    </div>
                </div>
                <span class="progress-name">High</span><span class="pull-right progress-name" id="uspHigh">73.83 %</span>
                <div class="progress us-progress" value="High">
                    <div class="progress-bar" id="us-scale-4" data-toggle="tooltip" title="79" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: "73.83%"}} data-original-title="">
                    </div>
                </div>
                <span class="progress-name">Medium</span><span class="pull-right progress-name" id="uspMedium">8.41 %</span>
                <div class="progress us-progress" value="Medium">
                    <div class="progress-bar" id="us-scale-2" data-toggle="tooltip" title="9" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: "8.41%"}} data-original-title="">
                    </div>
                </div>
                <span class="progress-name">Low</span><span class="pull-right progress-name" id="uspLow">10.28 %</span>
                <div class="progress us-progress" value="Low">
                    <div class="progress-bar" id="us-scale-5" data-toggle="tooltip" title="11" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: "10.28%"}} data-original-title="">
                    </div>
                </div>
            </div>
            <div class="col-md-5 pr-0 d-none">
                <div class="sm-panal">
                    <label class="m-0">Stories</label>
                    <div>
                        </div>
                    <span class="trad-count" id="feature">0</span>
                </div>
                <div class="sm-panal">
                    <label class="m-0">Bugs</label>
                    <div>
                        </div>
                    <span class="trad-count" id="bug">48</span>
                </div>
                <div class="sm-panal">
                    <label class="m-0">CR</label>
                    <div>
                        </div>
                    <span class="trad-count" id="cr">11</span>
                </div>
            </div>
        </div>
        <div id="myModal2" class="modal-plan modal-priority">
            <div class="mod-header row">
                <h4 class="header p-0-10"></h4>
                <div class="close_head">
                    <i class="fa fa-close close-btn"></i>
                </div>
            </div>
            <div class="data col-md-12 row common_scroll">
                <ul class="list-group-progress ">
                    <li class="list-group">Features<span id="priority_features"></span></li>
                    <li class="list-group">Defects<span id="priority_defects"></span></li>
                    <li class="list-group">Risks<span id="priority_risks"></span></li>
                    <li class="list-group">Enablers<span id="priority_enablers"></span></li>
                    <li class="list-group">Debt<span id="priority_debt"></span></li>
                    <li class="list-group">Prod-Fix<span id="priority_prodFix"></span></li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default Plan;
