var Graph = function() {
  this.x = null;
  this.y = null;

  var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  this.svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  this.createAxis = function(xRange, yRange) {
    var x = d3.scale.identity()
      .domain(xRange),
      y = d3.scale.identity()
        .domain(yRange);

    d3.svg.axis()
      .scale(x)
      .ticks(0)
      .orient("bottom");

    d3.svg.axis()
      .scale(y)
      .ticks(0)
      .orient("left");

    this.x = x;
    this.y = y;
  };

  this.drawDots = function(data, config) {
    config = config || {};

    var self = this,
    dots = this.svg
      .selectAll('.'+config.class || '.dots')
      .data(data);


    dots
      .enter()
      .append("circle")
      .attr("class", config.class || 'dots')
      .attr("r", config.r || '2');

    dots
      .attr("cx", function(d) { return self.x(d.x) })
      .attr("cy", function(d) { return self.y(d.y) })
      .attr("fill", function(d) { return (d.cluster || d).color});

    dots.exit().remove();
  };

  this.drawLines = function(data) {
    var self = this,
      lines = this.svg.selectAll('.connection')
        .data(data);

    lines
      .enter()
      .append("line")
      .attr("class", "connection");

    lines
      .style("stroke", function(d) { return (d.cluster || {color: 'black'}).color  })
      .style("opacity", "0.2")
      .attr('x1', function(d) { return self.x(d.x) })
      .attr('y1', function(d) { return self.y(d.y) })
      .attr('x2', function(d) { return self.x((d.cluster || d).x)})
      .attr('y2', function(d) { return self.y((d.cluster || d).y)});

    lines.exit().remove();
  };
};


