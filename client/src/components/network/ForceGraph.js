import React, { useEffect, useRef } from "react"
import * as d3 from 'd3'
import styles from "./forceGraph.module.css";

const ForceGraph = (props) => {
    const containerRef = useRef(null)
    const svgRef = useRef(null)
    // const cache = useRef(props.data)
    
    // todo: this is re-rendering on every change in the parent (okay for now but why is it updating like that?)
    const { nodes, links } = props.data
    
    // called initially and on every data change
    useEffect(() => {
        if (nodes != null && links != null) {
            const validNodes = []
            nodes.forEach((d) => validNodes.push(d.id))

            // filter out links to nodes not in the network
            const filteredLinks = Object.entries(links)
                .filter(entry => 
                    validNodes.includes(entry.target) && validNodes.includes(entry.target)
                )

            /* Define Canvas Attributes */
            const containerRect = containerRef.current.getBoundingClientRect();
            const height = containerRect.height;
            const width = containerRect.width;

            console.log({height})
            console.log({width})

            const svg = d3
                .select(svgRef.current)

            // Workaround for centering
            svg.attr('viewbox', [-width / 2, -height / 2, width, height])

            // Define Bubble Attributes - all these attributes are prefixed with the bubble keyword
            const bubbleSize = (d) => d.score * 0.8
        
            const bubbleColor = (d) => { 
                const yearToColor = d3.scaleSequential()
                .domain([1900, 2021])
                .interpolator(d3.interpolateRainbow);
                
                return yearToColor(d.year)
            }

            /* Define Tooltip */
            const tooltip = document.querySelector("#graph-tooltip")
            
            if (!tooltip) {
                const tooltipDiv = document.createElement("div");
                tooltipDiv.classList.add(styles.tooltip);
                tooltipDiv.style.opacity = "0";
                tooltipDiv.id = "graph-tooltip";
                document.body.appendChild(tooltipDiv);
            }
                
            const divTooltip = d3.select("#graph-tooltip");

            const addTooltip = (d, x, y) => {
                divTooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0.9);
                divTooltip
                    .html(props.nodeHoverTooltip(d))
                    .style("left", `${x}px`)
                    .style("top", `${y - 28}px`);
            };

            const removeTooltip = () => {
                divTooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0);
            };
            
            // /* Sidebar Logic */
            const divPanel = d3.select("#graph-panel")

            const updatePanel = (d, x, y) => {
                divPanel
                    .html(props.searchPanel(d))
            }

            // Simulation Logic
            const simulation = d3
                .forceSimulation(nodes)
                .force("link", d3.forceLink(filteredLinks).id(d => d.id))
                .force('center', d3.forceCenter(width / 2, height / 2)) // set position of Center of gravity
                .force("charge", d3.forceManyBody().strength(-250)) // changes the central force
                .force("x", d3.forceX())
                .force("y", d3.forceY())
            
            const drag = (simulation) => {
                const dragStarted = (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.2).restart();
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
            console.log({svg})

            const node = svg
                .append("g")
                .attr("stroke", "#fff")
                .attr("strokeWidth", 2)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", bubbleSize)
                .attr("fill", bubbleColor)
                .call(drag(simulation))

            const link = svg
                .append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("strokeWidth", d => Math.sqrt(d.value));

            const label = svg.append("g")
                .attr("class", "labels")
                .selectAll("text")
                .data(nodes)
                .enter()
                .append("text")
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'central')
                // .text(d => "hi")
                .call(drag(simulation));

            // // update node positions
            simulation.on("tick", () => {
                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)

                //update link positions
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                // update label positions
                label
                    .attr("x", d => d.x)
                    .attr("y", d => d.y)
            })

            // MouseEvents
            node
                .on("mouseover", (event, d) => {
                    addTooltip(d, event.pageX, event.pageY);
                    updatePanel(d, event.pageX, event.pageY);
                })
                .on("mouseout", () => {
                    removeTooltip();
                });

            // Add Zoom functionality
            svg.call(d3.zoom().on("zoom", function (event) {
                svg.attr("transform", event.transform);
            }));
        }
    }, [nodes, links])

    return (
        <div ref={containerRef} className={styles.container}>
            <svg ref={svgRef} width={props.width} height={props.width}></svg>
        </div>
    )
}

export default ForceGraph

// step one add the bubbles