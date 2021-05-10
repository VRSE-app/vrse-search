import * as d3 from "d3";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./forceGraph.module.css";
// import d3Fisheye from "d3-fisheye"
// import radial from './radial'

export function runForceGraph(
    container,
    nodesData,
    linksData,
    nodeHoverTooltip,
    searchPanel
) {
    const nodes = nodesData.map((d) => Object.assign({}, d));
    const validNodes = [];
    
    nodesData.map((d) => validNodes.push(d.id)); // this part works

    var links = Object.entries(linksData).filter(entry => validNodes.includes(entry.target) && validNodes.includes(entry.target));
    
    // todo: uncomment to add back links
    // When you get the links in remove all the links that are not in the nodes
    // const linkedNodes = [...new Set(Object.values(links))]
    // there are no nodes in the list of nodes that have sources and targets both in the search results
    
    /* Define Canvas Attributes */
    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    /* Define Bubble Attributes */
    const bubbleSize = (d) => d.score

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
    
    /* Sidebar Logic */
    const divPanel = d3.select("#graph-panel")

    const updatePanel = (d, x, y) => {
        divPanel
            .html(searchPanel(d))
    }

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

    // Add the tooltip element to the graph

    const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-250)) // changes the central force
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    /* Create SVG Elements */
    const svg = d3
        .select(container)
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
    
    const link = svg
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("strokeWidth", d => Math.sqrt(d.value));

    const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("strokeWidth", 2)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", bubbleSize)
        .attr("fill", bubbleColor)
        .call(drag(simulation));

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

    node
        .on("mouseover", (event, d) => {
            addTooltip(d, event.pageX, event.pageY);
            updatePanel(d, event.pageX, event.pageY);
        })
        .on("mouseout", () => {
            removeTooltip();
        });

    simulation.on("tick", () => {
        //update link positions
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // update node positions
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        // update label positions
        label
            .attr("x", d => d.x)
            .attr("y", d => d.y)
    });

    // Add Zoom functionality
    svg.call(d3.zoom().on("zoom", function (event) {
        svg.attr("transform", event.transform);
    }));

    return {
        destroy: () => {
            simulation.stop();
        },
        nodes: () => svg.node()
    };
}