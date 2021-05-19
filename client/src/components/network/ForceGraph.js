import React, { useEffect, useRef } from "react"
import * as d3 from 'd3'
import styles from "./forceGraph.module.css";

const ForceGraph = ({ data, nodeHoverTooltip, searchPanel, width, height }) => {
    const containerRef = useRef(null)
    const svgRef = useRef(null)
    // const cache = useRef(props.data)
    
    // todo: this is re-rendering on every change in the parent (okay for now but why is it updating like that?)
    const { nodes, links } = data
    
    // called initially and on every data change
    useEffect(() => {
        if (nodes != null && links != null) {
            const validNodes = []
            nodes.forEach((d) => {
                validNodes.push(d.id)

        
                // also get earliest and latest year
            })

            var earliestYear = Math.min(...nodes.map(node => node.year));
            var latestYear = Math.max(...nodes.map(node => node.year));

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
                // should make start and end year the start and end of this set of data
                const yearToColor = d3.scaleSequential()
                .domain([earliestYear-50, latestYear])
                .interpolator(d3.interpolateBlues);
                
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
                    .style("font-weight", "bold")
                    .style("opacity", 1);
                divTooltip
                    .html(nodeHoverTooltip(d))
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
                    .html(searchPanel(d))
            }

            // Simulation Logic
            const simulation = d3
                .forceSimulation(nodes)
                .force("link", d3.forceLink(filteredLinks).id(d => d.id))
                .force('center', d3.forceCenter(width / 2, height / 2)) // set position of Center of gravity
                .force("charge", d3.forceManyBody().strength(-350)) // changes the central force
                .force("x", d3.forceX())
                .force("y", d3.forceY())
            
            const drag = (simulation) => {
                const dragStarted = (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.1).restart();
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
 
            // make every node clickable with href to semantic scholar id
            d3
                .selectAll("circle").each(function(d) {
                    d3
                        .select(this.parentNode)
                        .append("a")
                        .attr('xlink:href', d.s2Url)
                        .node()
                        .appendChild(this)
                })

            const link = svg
                .append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("strokeWidth", d => Math.sqrt(d.value));
                
            const label = svg
                .append("g")
                .selectAll("text")
                .data(nodes)
                .enter()
                .append("text")
                .attr("fill", "cadetblue")
                .attr("font-weight", "bold")
                .attr('text-anchor', 'end')
                .attr('dominant-baseline', 'hanging')
                .text(d => d.authors[0].name)
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

            // Add Zoom functionality -> try to maintain full context without zoom
            // svg.call(d3.zoom().on("zoom", function (event) {
            //     svg.attr("transform", event.transform);
            // }));
        }
    }, [nodes, links])

    return (
        <div ref={containerRef} className={styles.container}>
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default ForceGraph
