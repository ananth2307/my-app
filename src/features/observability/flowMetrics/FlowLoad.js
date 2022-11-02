import React from "react";
import * as d3 from "d3";
import { useD3 } from "../../../hooks/useD3";
import { truncate, responsivefy } from "../../../app/utilities/helpers";

const chartData = [
  {
    name: "Done",
    children: [
      {
        name: "Features",
        tasksize: 1,
        parent: "Done",
      },
      {
        name: "Defects",
        tasksize: 2,
        parent: "Done",
      },
      {
        name: "Risks",
        tasksize: 2,
        parent: "Done",
      },
      {
        name: "Enablers",
        tasksize: 1,
        parent: "Done",
      },
      {
        name: "Debt",
        tasksize: 1,
        parent: "Done",
      },
      {
        name: "Prod-Fix",
        tasksize: 1,
        parent: "Done",
      },
    ],
    tasksize: 8,
    items: "13",
  },
  {
    name: "In-Dev",
    children: [
      {
        name: "Features",
        tasksize: 2,
        parent: "In-Dev",
      },
      {
        name: "Defects",
        tasksize: 2,
        parent: "In-Dev",
      },
      {
        name: "Risks",
        tasksize: 0,
        parent: "In-Dev",
      },
      {
        name: "Enablers",
        tasksize: 3,
        parent: "In-Dev",
      },
      {
        name: "Debt",
        tasksize: 0,
        parent: "In-Dev",
      },
      {
        name: "Prod-Fix",
        tasksize: 0,
        parent: "In-Dev",
      },
    ],
    tasksize: 7,
    items: "13",
  },
  {
    name: "READY-VERIFICATION",
    children: [
      {
        name: "Features",
        tasksize: 0,
        parent: "READY-VERIFICATION",
      },
      {
        name: "Defects",
        tasksize: 4,
        parent: "READY-VERIFICATION",
      },
      {
        name: "Risks",
        tasksize: 0,
        parent: "READY-VERIFICATION",
      },
      {
        name: "Enablers",
        tasksize: 0,
        parent: "READY-VERIFICATION",
      },
      {
        name: "Debt",
        tasksize: 0,
        parent: "READY-VERIFICATION",
      },
      {
        name: "Prod-Fix",
        tasksize: 1,
        parent: "READY-VERIFICATION",
      },
    ],
    tasksize: 5,
    items: "13",
  },
  {
    name: "IN-DEFINE",
    children: [
      {
        name: "Features",
        tasksize: 1,
        parent: "IN-DEFINE",
      },
      {
        name: "Defects",
        tasksize: 3,
        parent: "IN-DEFINE",
      },
      {
        name: "Risks",
        tasksize: 0,
        parent: "IN-DEFINE",
      },
      {
        name: "Enablers",
        tasksize: 1,
        parent: "IN-DEFINE",
      },
      {
        name: "Debt",
        tasksize: 0,
        parent: "IN-DEFINE",
      },
      {
        name: "Prod-Fix",
        tasksize: 0,
        parent: "IN-DEFINE",
      },
    ],
    tasksize: 5,
    items: "13",
  },
];

const FlowLoad = (props) => {
  const ref = useD3(
    (svg1) => {
      svg1.html("");
      function truncate(str, n) {
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
      }

      var wrap = function () {
        var self = d3.select(this),
          textLength = self.node().getComputedTextLength(),
          text = self.text();
        while (textLength > 50 && text.length > 0) {
          text = text.slice(0, -1);
          self.text(text + "...");
          textLength = self.node().getComputedTextLength();
        }
      };

      var colorCircle = function (name) {
        let colors = [
          "#167ad6",
          "#ff8000",
          "#ec6667",
          "#ae8ceb",
          "#ead96e",
          "#fcbc4c",
        ];

        if (!name) return "#ffffff";
        else {
          if (name == "Features") return colors[0];
          else if (name == "Defects") return colors[1];
          else if (name == "Risks") return colors[2];
          else if (name == "Enablers") return colors[3];
          else if (name == "Debt") return colors[4];
          else if (name == "Prod-Fix") return colors[5];
        }
      };

      var datasetfull = chartData;
      var tasksum = 0;
      var maxwidtha = 0;

      for (var r = 0; r < datasetfull.length; r++) {
        tasksum = tasksum + parseInt(datasetfull[r].tasksize);
      }

      for (var r = 0; r < datasetfull.length; r++) {
        datasetfull[r].widtha = (datasetfull[r].tasksize / tasksum) * 700;

        if (datasetfull[r].widtha > 220) {
          datasetfull[r].widtha = 220;
        }

        if (datasetfull[r].widtha < 50) {
          datasetfull[r].widtha = 50;
        }

        if (datasetfull[r].widtha > maxwidtha) {
          maxwidtha = datasetfull[r].widtha;
        }
      }

      for (let i = 0; i < datasetfull.length; i++) {
        var dataset = datasetfull[i];

        var width = dataset.widtha;
        var height = dataset.widtha;
        //Size of the circle pack layout
        var diameter = Math.min(width * 0.9, height * 0.9);

        var bubble = d3.pack().size([diameter, diameter]).padding(12);

        var svg = svg1
          .append("svg")
          .attr("style", "overflow:visible")
          .attr("width", diameter)
          .attr("height", diameter + 100)
          .attr("class", "bubble");

        //svg.attr("transform", "translate(" + 10 + "," + 40 + ")");

        svg
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labela")
          .attr("style", "overflow:visible")
          .attr("dy", 15)
          .attr("dx", diameter / 2)
          .style("text-anchor", "middle")
          .style("font-size", 14)
          .text(function (d) {
            return "Total Items";
          });

        svg
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labelb")
          .attr("style", "overflow:visible")
          .attr("dy", 40)
          .attr("dx", diameter / 2)
          .style("text-anchor", "middle")
          .style("font-size", 22)
          .text(function (d) {
            console.log(d);
            return dataset.tasksize;
          });

        console.log("aabb");
        console.log(maxwidtha);
        console.log(width);

        svg
          .append("text")
          .style("fill", "#000000")
          .attr("class", "labelc")
          .attr("style", "overflow:visible")
          .attr("dy", width + 60 + (maxwidtha - width) / 2)
          .attr("dx", diameter / 2)
          .style("text-anchor", "middle")
          .style("font-size", 16)
          .text(truncate(dataset.name, 10));

        var nodes = d3.hierarchy(dataset).sum(function (d) {
          return d.tasksize;
        });

        var vNodes = nodes.descendants();

        bubble(nodes);

        var vSlices = svg
          .selectAll("circle")
          .data(vNodes)
          .enter()
          .append("circle")
          .attr("transform", "translate(" + 0 + "," + 50 + ")");

        var leaf = svg.selectAll("circle").data(vNodes);

        // Draw on screen
        vSlices
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .attr("r", function (d) {
            return d.r;
          })
          .attr("style", "overflow:visible")
          .attr("class", "innercirc")
          .style("stroke", "#ccc")
          .style("fill", function (d) {
            if (d.depth == 0) return "#ffffff";
            else return colorCircle(d.data.name);
          });

        svg
          .select(".labelc")
          .append("svg:title")
          .text(function (d, i) {
            return dataset.name;
          });

        //svg.selectAll('circle').data(vNodes).enter().append('text').text("abcdd");

        /*
                  vNodes
                  .append("text")
      
                  .style("fill", "#000000")
                  .attr("fill", "white")
                  .attr('class', 'labels')
                  .attr("dy", ".2em")
      
                  .style('text-anchor', 'middle')
                  .style('font-size', 10)
                  .text(function(d) {
                      console.log("q");
                      console.log(d);
                      return "Abc";
                  });
      
          */
        // $(".innercirc").on("click", function () {
        //   var called = $(this).siblings(".labelc").children("title").text();
        //   getFlowLoaddrill1(called);
        // });
      }
    },
    [chartData]
  );
  return (
    <div
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    ></div>
  );
};

export default FlowLoad;
