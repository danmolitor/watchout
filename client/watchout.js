// start slingin' some d3 here.

//create gameBoard object, with dimensions.
var gameBoard = {
  height : 800,
  width :  750,
};

//create svg variable as gameBoard
var svg = d3.select("body")
            .append("svg")
            .attr("width", gameBoard.width)
            .attr("height", gameBoard.height)
            .classed("svg", true)
            .style("background-color", "black");


//create variable for enemies