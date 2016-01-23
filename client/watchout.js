// start slingin' some d3 here.

//create gameBoard object, with dimensions.


var gameBoard = {
    height: 800,
    width: 750,
};


// var axes = {
//   x : d3.scale.linear().domain([0,100]).range([0,gameBoard.width]),
//   y : d3.scale.linear().domain([0,100]).range([0,gameBoard.height])
// };

var enemies = function(){
  var result = [];

  for(var i = 0; i < 30; i++){
    result.push(i);
  }

  return result;
};

console.log(enemies.length);
//create svg variable as gameBoard
var svgBoard = d3.select("body")
    .append("svg")
    .attr("width", gameBoard.width)
    .attr("height", gameBoard.height)
    .classed("svg", true)
    .style("background-color", "black");


//create variable for enemies

var enemy = svgBoard.selectAll("circle")
    .data(enemies())
    .enter()
    .append('circle')
    .attr("r", 10)
    .attr("cy", function(){

      return Math.floor(Math.random() * 650);
      ////will need to change later and just use our axis

    })
    .attr("cx", function(){
      return  Math.floor(Math.random() * 600 );
    })
    .style("fill", "white")
    .classed("enemy", true);

var drag = d3.behavior.drag()
            .on('dragstart', function(){user.style('fill', 'red');})
            .on('drag', function(){ user.attr('cx', d3.event.x).attr('cy', d3.event.y);})
            .on('dragend', function(){user.style('fill', 'orange');});


var user = svgBoard.selectAll('.draggableCircle')
    .data([{ x : (gameBoard.width / 2), y : (gameBoard.height / 2), r: 10}])
    .enter()
    .append('svg:circle')
    .attr('class', 'draggableCircle')
    .attr('cx', function(d) {return d.x; })
    .attr('cy', function(d){ return d.y; })
    .attr('r', function(d) { return d.r; })
    .call(drag)
    .style('fill', 'orange');


setInterval(function() {
  svgBoard.selectAll('.enemy')
  .transition()
  .attr("cx", function(d){
      return  20 + Math.floor(Math.random() * (gameBoard.width - 100));
    })
  .attr("cy", function(d){

      var y = Math.floor(Math.random() * gameBoard.height);
      ////will need to change later and just use our axis
      if(y < 10){
        y = 10;
      }
      if(y > 790){
        y = 790;
      }
      return y;

    })
  .duration(2000);

}, 2000);