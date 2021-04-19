import * as d3 from "d3";
import { useEffect } from "react";
import "../App.css";

function Chart({ improvement, type, name, author }) {
  useEffect(() => {
    createChart();
  }, []);

  const createChart = () => {
    d3.select("svg").selectAll("*").remove();

    const arr = improvement;
    const dataType = type;

    var svg = d3.select("svg"),
      margin = 150,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain(arr.map((d, i) => i));
    yScale.domain([0, d3.max(arr, (d) => d)]);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickFormat(""));

    g.append("g").call(
      d3
        .axisLeft(yScale)
        .tickFormat((d) => d + " " + dataType + `'s`)
        .ticks(6)
    );
    g.selectAll("rect")
      .data(arr)
      .enter()
      .append("rect")
      .attr("fill", (d, i) => {
        if (i > 0 && d < arr[i - 1]) {
          return "rgba(153, 27, 27,1)";
        } else {
          return "rgba(6, 95, 70,1)";
        }
      })
      .attr("x", (d, i) => xScale(i))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(0))
      .attr("height", 0)
      .transition()
      .duration(1000)
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => height - yScale(d));
  };

  return (
    <div className="relative container mx-auto">
      <div className="absolute inset-x-0 top-0">
        <h1 className="text-center text-gray-900 pt-10 text-xl">{`${author}'s ${name} improvement`}</h1>
      </div>
      <svg
        className="mx-auto"
        preserveAspectRatio="none"
        width="400"
        height="300"
      ></svg>
    </div>
  );
}

export default Chart;
