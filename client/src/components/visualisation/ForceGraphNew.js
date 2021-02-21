
import React, { useEffect, useRef } from "react";
import runForceGraph from "./ForceGraphGenerator";
// import styles from "./forceGraph.module.css";

const ForceGraph = ({ linksData, nodesData, nodeHoverTooltip }) => {
  const containerRef = useRef(null);
  console.log({ linksData })
  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className='graphContainer' />;
}

export default ForceGraph;