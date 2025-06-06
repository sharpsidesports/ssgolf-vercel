// This file is part of the subscription component for the app.
import { generatePerformanceData } from './performance/data.js';
import Metrics from './performance/Metrics.js';
import Graph from './performance/Graph.js';

export default function PerformanceGraph() {
  const data = generatePerformanceData();

  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <Metrics data={data} />
      <div className="mt-8">
        <Graph data={data} />
      </div>
      <p className="text-gray-500 text-xs mt-4 italic">
        *Past performance is for informational purposes, it doesn't predict future results.
      </p>
    </div>
  );
}