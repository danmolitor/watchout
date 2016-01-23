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

// var enemies = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
      return  Math.floor(Math.random() * 600 )
    })
    .style("fill", "white")
    .classed("enemy", true);

    setTimeout(function(){

    }, 2000);

var user = svgBoard.selectAll("circle")
    .data(enemies())
    .enter()
    .append('circle')
    .attr("r", 10)
    .attr("cy", function(d){

      var y = Math.floor(Math.random() * gameBoard.height)
      ////will need to change later and just use our axis
      if(y < 10){
        y = 10;
      }
      if(y > 790){
        y = 790;
      }
      return y;

    })
    .attr("cx", function(d){
      return  20 + Math.floor(Math.random() * (gameBoard.width - 100));
    })
    .style("fill", "white")
    .classed("enemy", true);

// svgBoard.selectAll('circle').data(dataset).enter().append(enemy)

// function(d){
//   return (Math.random() * d) * gameBoard.width
// }

setInterval(function() {
  svgBoard.selectAll('circle')
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