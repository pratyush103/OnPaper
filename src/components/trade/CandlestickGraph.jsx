import { useState, useEffect } from "react";

const HistoricalChart = ({ rawData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Transform the rawData to match ApexCharts format
    const formattedData = rawData.Success.map(item => ({
      x: new Date(item.datetime),
      y: [parseFloat(item.open), parseFloat(item.high), parseFloat(item.low), parseFloat(item.close)]
    }));
    
    setChartData(formattedData);
  }, [rawData]); // re-run effect when rawData changes

  return (
    // Pass chartData to ApexCharts component here
    <div>{/* ApexCharts component */}</div>
  );
};

export default HistoricalChart;
