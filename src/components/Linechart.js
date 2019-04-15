import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3'

class Linechart extends React.Component{
   
    render(){
        const div = new ReactFauxDOM.Element('div')
        var data = [
           
            
            {
              name: "Canada",
              values: [
                {date: "2000", price: "400"},
                {date: "1500", price: "800"},
                {date: "1000", price: "900"},
                {date: "1800", price: "2000"},
                {date: "600", price: "900"},
                {date: "1500", price: "190"},
                {date: "200", price: "1000"},
                {date: "2307", price: "800"},
                {date: "4008", price: "1500"},
                {date: "6000", price: "1300"}
              ]
            },
            {
              name: "Mexico",
              values: [
                {date: "2000", price: "50"},
                {date: "2001", price: "10"},
                {date: "2002", price: "5"},
                {date: "2003", price: "71"},
                {date: "2004", price: "20"},
                {date: "2005", price: "9"},
                {date: "2006", price: "220"},
                {date: "2007", price: "235"},
                {date: "2008", price: "61"},
                {date: "2009", price: "10"}
              ]
            }
          ];
          
          var width = 1900;
          var height = 300;
          var margin = 50;
          var duration = 250;
          
          var lineOpacity = "0.25";
          var lineOpacityHover = "0.85";
          var otherLinesOpacityHover = "0.1";
          var lineStroke = "1.5px";
          var lineStrokeHover = "2.5px";
          
          var circleOpacity = '0.85';
          var circleOpacityOnLineHover = "0.25"
          var circleRadius = 3;
          var circleRadiusHover = 6;
          
         

          /* Format Data */
          var parseDate = d3.timeParse("%Y");
          data.forEach(function(d) { 
            d.values.forEach(function(d) {
              d.date = +d.date;
              d.price = +d.price;    
            });
          });
          
          
          /* Scale */
           var xScale = d3.time.scale()
            .domain([0,d3.max(data[0].values, d => d.date)])
            .range([width-margin, 0]);
          
          var yScale = d3.scaleLinear()
            .domain([0, d3.max(data[0].values, d => d.price)])
            .range([height-margin, 0]);
          
          var color = d3.scaleOrdinal(d3.schemeCategory10);
          
          /* Add SVG */
          var svg = d3.select("#chart").append("svg")
            .attr("width", (width+margin)+"px")
            .attr("height", (height+margin)+"px")
            .append('g')
            .attr("transform", `translate(${margin}, ${margin})`);
          
          
          /* Add line into SVG */
          var line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.price));
          
          let lines = svg.append('g')
            .attr('class', 'lines');
          
          lines.selectAll('.line-group')
            .data(data).enter()
            .append('g')
            .attr('class', 'line-group')  
            .on("mouseover", function(d, i) {
                svg.append("text")
                  .attr("class", "title-text")
                  .style("fill", color(i))        
                  .text(d.name)
                  .attr("text-anchor", "middle")
                  .attr("x", (width-margin)/2)
                  .attr("y", 5);
              })
            .on("mouseout", function(d) {
                svg.select(".title-text").remove();
              })
            .append('path')
            .attr('class', 'line')  
            .attr('d', d => line(d.values))
            .style('stroke', (d, i) => color(i))
            .style('opacity', lineOpacity)
            .on("mouseover", function(d) {
                d3.selectAll('.line')
                              .style('opacity', otherLinesOpacityHover);
                d3.selectAll('.circle')
                              .style('opacity', circleOpacityOnLineHover);
                d3.select(this)
                  .style('opacity', lineOpacityHover)
                  .style("stroke-width", lineStrokeHover)
                  .style("cursor", "pointer");
              })
            .on("mouseout", function(d) {
                d3.selectAll(".line")
                              .style('opacity', lineOpacity);
                d3.selectAll('.circle')
                              .style('opacity', circleOpacity);
                d3.select(this)
                  .style("stroke-width", lineStroke)
                  .style("cursor", "none");
              });
          
          
          /* Add circles in the line */
          lines.selectAll("circle-group")
            .data(data).enter()
            .append("g")
            .style("fill", (d, i) => color(i))
            .selectAll("circle")
            .data(d => d.values).enter()
            .append("g")
            .attr("class", "circle")  
            .on("mouseover", function(d) {
                d3.select(this)     
                  .style("cursor", "pointer")
                  .append("text")
                  .attr("class", "text")
                  .text(`${d.price}`)
                  .attr("x", d => xScale(d.date) + 5)
                  .attr("y", d => yScale(d.price) - 10);
              })
            .on("mouseout", function(d) {
                d3.select(this)
                  .style("cursor", "none")  
                  .transition()
                  .duration(duration)
                  .selectAll(".text").remove();
              })
            .append("circle")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.price))
            .attr("r", circleRadius)
            .style('opacity', circleOpacity)
            .on("mouseover", function(d) {
                  d3.select(this)
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadiusHover);
                })
              .on("mouseout", function(d) {
                  d3.select(this) 
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadius);  
                });
          
          
          /* Add Axis into SVG */
          var xAxis = d3.axisBottom(xScale).ticks(5);
          var yAxis = d3.axisLeft(yScale).ticks(5);
          
          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height-margin})`)
            .call(xAxis);
          
          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append('text')
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .text("Total values");
            return div.toReact()
    }
  


}

export default Linechart;