import React from "react";

// Utility function to format numbers to 3 decimal places
const formatNumber = (num) => {
  const parsedNum = parseFloat(num);
  return !isNaN(parsedNum) ? parsedNum.toFixed(3) : "N/A";
};

// Define the list of metrics to display
const metricsList = [
  { key: "pageLoadTime", label: "Page Load Time", unit: "ms" },
  { key: "totalRequestSize", label: "Total Request Size", unit: "KB" },
  { key: "numberOfRequests", label: "Number of Requests", unit: "" },
  { key: "ttfb", label: "Time to First Byte (TTFB)", unit: "ms" },
  { key: "fcp", label: "First Contentful Paint (FCP)", unit: "ms" },
  { key: "lcp", label: "Largest Contentful Paint (LCP)", unit: "ms" },
  { key: "cls", label: "Cumulative Layout Shift (CLS)", unit: "" },
  { key: "tbt", label: "Total Blocking Time (TBT)", unit: "ms" },
];

// Export metricsList
// export { metricsList };

// Component to display performance metrics
const PerformanceMetrics = ({ data }) => {
  // Default values for metrics to handle incomplete data
  const defaultMetrics = {
    pageLoadTime: "N/A",
    totalRequestSize: "N/A",
    numberOfRequests: "N/A",
    ttfb: "N/A",
    fcp: "N/A",
    lcp: "N/A",
    cls: "N/A",
    tbt: "N/A",
  };

  // Combine default metrics with provided data
  const metrics = { ...defaultMetrics, ...data };

  return (
    <div className="performance-metrics">
      <h2>Performance Metrics</h2>
      {metricsList.map(({ key, label, unit }) => (
        <p key={key}>
          {label}: {formatNumber(metrics[key])} {unit}
        </p>
      ))}
    </div>
  );
};

export default PerformanceMetrics;
