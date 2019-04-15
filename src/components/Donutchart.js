import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3'

class Donutchart extends React.Component{

    render(){

        const div = new ReactFauxDOM.Element('div')

        var data = [
            
            {name: "UK", value: 60},
            {name: "Canada", value: 30},
            {name: "Maxico", value: 10},
          ];
          var totalCount="Currently";
          var totalCount2= "Line2";
          
          var width = 260;
          var height = 260;
          var thickness = 10;
          var duration = 750;
          
          var radius = Math.min(width, height) / 2;
          var color = d3.scaleOrdinal(d3.schemeCategory10);
          
          var svg = d3.select("#dchart")
          .append('svg')
          .attr('class', 'pie')
          .attr('width', width)
          .attr('height', height);
          
          var g = svg.append('g')
          .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
          
          var arc = d3.arc()
          .innerRadius(radius - thickness)
          .outerRadius(radius)
          .cornerRadius(10)
          .endAngle(Math.PI*2)
          
          var pie = d3.pie()
          .value(function(d) { return d.value; })
          .sort(null);
          
          var path = g.selectAll('path')
          .data(pie(data))
          .enter()
          .append("g")
          .on("mouseover", function(d) {
                let g = d3.select(this)
                  .style("cursor", "pointer")
                  .style("fill", "black")
                  .append("g")
                  .attr("class", "text-group");
           
                g.append("text")
                  .attr("class", "name-text")
                  .text(`${d.data.name}`)
                  .attr('text-anchor', 'middle')
                  .attr('dy', '-1.2em');
            
                g.append("text")
                  .attr("class", "value-text")
                  .text(`${d.data.value}`)
                  .attr('text-anchor', 'middle')
                  .attr('dy', '.6em');
              })
            .on("mouseout", function(d) {
                d3.select(this)
                  .style("cursor", "none")  
                  .style("fill", color(this._current))
                  .select(".text-group").remove();
              })
            .append('path')
            .attr('d', arc)
            .attr('fill', (d,i) => color(i))
            .on("mouseover", function(d) {
                d3.select(this)     
                  .style("cursor", "pointer")
                  .style("fill", "black");
              })
            .on("mouseout", function(d) {
                d3.select(this)
                  .style("cursor", "none")  
                  .style("fill", color(this._current));
              })
            .each(function(d, i) { this._current = i; });
          
      

          g.append("text")
              .attr("text-anchor", "start")
              .attr('font-size', '2em')
              .attr('y', -20)
              .attr('x', -102)
              .text(totalCount);

          g.append("text")
              .attr("text-anchor", "end")
              .attr('font-size', '1em')
              .attr('y', 50)
              .attr('x', 22)
              .text(totalCount2);

              return div.toReact()
    }

}
export default Donutchart;
