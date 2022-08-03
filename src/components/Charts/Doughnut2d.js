
// STEP 1 - Include Dependencies
// Include react
import React from "react";


// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import candy from "fusioncharts/themes/fusioncharts.theme.candy";
import { doughnut2d } from ".";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, candy);
const ChartComponent =({data})=>{
  const chartConfigs = {
  type: "doughnut2d", // The chart type
  width: "100%", // Width of the chart
  height: "400", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption:'stars per language',
      
      decimals: 0,
      daughnutRadius:'45%',
      theme:'candy',
      showPercentValues:0,
      // enableSlicing:true,
      slicingDistance: 30

    },
    // Chart Data
    data
  }
};
  return (<ReactFC {...chartConfigs} />)
}
// STEP 4 - Creating the DOM element to pass the react-fusioncharts component


export default ChartComponent;

