import React, { useEffect, useRef } from "react"
import * as d3 from 'd3'

const ForceGraph = props => {
    const ref = useRef(null)
    const cache = useRef(props.data)
    
    // todo: this is re-rendering on every change in the parent (okay for now but why is it updating like that?)
    console.log(props.data)
    const { nodes, links } = props.data
    
    console.log({ nodes })
    console.log({ links })

    useEffect(() => {
        
    })

    if (nodes != null && links != null) {
        const validNodes = []
        nodes.map((d) => validNodes.push(d.id))

        // filter out links to nodes not in the network
        const filteredLinks = Object.entries(links)
            .filter(entry => 
                validNodes.includes(entry.target) && validNodes.includes(entry.target)
            )
        
        // Define Bubble Attributes - all these attributes are prefixed with the bubble keyword
        const bubbleSize = (d) => d.score
    
        const bubbleColor = (d) => { 
            const yearToColor = d3.scaleSequential()
            .domain([1900, 2021])
            .interpolator(d3.interpolateRainbow);
        
            return yearToColor(d.year)
        }

        // Simulation Logic
        const simulation = d3
            .forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-250)) // changes the central force
            .force("x", d3.forceX())
            .force("y", d3.forceY())
    
        const drag = (simulation) => {
            const dragStarted = (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            };
    
            const dragged = (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            };
    
            const dragEnded = (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            };
    
            return d3
                .drag()
                .on("start", dragStarted)
                .on("drag", dragged)
                .on("end", dragEnded);
        };
    
        /* Create SVG Elements */
        // this logic may have to be reworked - stitch together for now    
        const node = d3.select(ref)
            .append("g")
            .attr("stroke", "#fff")
            .attr("strokeWidth", 2)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", bubbleSize)
            .attr("fill", bubbleColor)
            .call(drag(simulation))
    
        simulation.on("tick", () => {    
            // update node positions
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
        })
    }

    return (
        <svg width={props.width} height={props.width}>
            <g 
                ref={ref}
                // transform={`translate(${props.cx} ${props.cy})`}
            />
        </svg>
    )
}

export default ForceGraph

// step one add the bubbles