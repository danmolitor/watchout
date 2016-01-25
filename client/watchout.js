// start slingin' some d3 here.

//create gameBoard object, with dimensions.

var settings = {
    w: window.innerWidth,
    h: window.innerHeight,
    r: 15,
    duration: 1500
}




// var axes = {
//   x : d3.scale.linear().domain([0,100]).range([0,gameBoard.width]),
//   y : d3.scale.linear().domain([0,100]).range([0,gameBoard.height])
// };

var mouse = {
    x: settings.w / 2,
    y: settings.h / 2
};
var score = 0,
    highScore = 0,
    collisionCount = 0;

var pixelize = function(number) {
    return number + 'px';
}
var rand = function(n) {
    return Math.floor(Math.random() * n);
};
var randX = function() {
    return pixelize(rand(settings.w - settings.r * 2))
};
var randY = function() {
    return pixelize(rand(settings.h - settings.r * 2))
};


var updateScore = function() {
    d3.select('.scoreboard .current span').text(score);
    d3.select('.scoreboard .high span').text(highScore);
    d3.select('.scoreboard .collisions span').text(collisionCount);

}


//create svg variable as gameBoard
var board = d3.select(".board").style({
    width: pixelize(settings.w),
    height: pixelize(settings.h)
})


//create variable for enemies

var asteroids = board.selectAll(".asteroids")
    .data(d3.range(30))
    .enter()
    .append('div')
    .attr('class', 'asteroid')
    .style({
        top: randY,
        left: randX,
        width: pixelize(settings.r * 2),
        height: pixelize(settings.r * 2)
    })


// var drag = d3.behavior.drag()
//     .on('dragstart', function() {
//         user.style('fill', 'red');
//     })
//     .on('drag', function() {
//         user.attr('cx', d3.event.x).attr('cy', d3.event.y);
//     })
//     .on('dragend', function() {
//         user.style('fill', 'orange');
//     });


d3.select('.mouse').style({
    top: pixelize(mouse.y),
    left: pixelize(mouse.x),
    width: pixelize(settings.r * 2),
    height: pixelize(settings.r * 2),
    'border-radius': pixelize(settings.r * 2)
})

board.on('mousemove', function() {
    var loc = d3.mouse(this);
    mouse = {
        x: loc[0],
        y: loc[1]
    };
    d3.select('.mouse').style({
        top: pixelize(mouse.y - settings.r),
        left: pixelize(mouse.x - settings.r)
    })
});


var move = function(element) {
    element.transition().duration(settings.duration).ease('bounce-in-out').style({
        top: randY,
        left: randX
    }).each('end', function() {
        move(d3.select(this));

    });
}

move(asteroids);

// setInterval(function() {
//     board.selectAll('.asteroids')
//         .transition()
//         .attr("cx", function(d) {
//             return 20 + Math.floor(Math.random() * (board.width - 100));
//         })
//         .attr("cy", function(d) {

//             var y = Math.floor(Math.random() * board.height);
//             ////will need to change later and just use our axis
//             if (y < 10) {
//                 y = 10;
//             }
//             if (y > 790) {
//                 y = 790;
//             }
//             return y;

//         })
//         .duration(2000);

// }, 2000);

var scoreTicket = function() {
    score = score + 1;
    highScore = Math.max(score, highScore);
    updateScore();
}

setInterval(scoreTicket, 100);

var prevCollision = false;
var detectCollisions = function() {
    var collision = false;

    asteroids.each(function() {
        var cx = this.offsetLeft + settings.r;
        var cy = this.offsetTop + settings.r;
        //the magic of collision detection
        var x = cx - mouse.x;
        var y = cy - mouse.y;
        if (Math.sqrt(x * x + y * y) < settings.r * 2) {
            collision = true;
        }
    })
    if (collision) {
        score = 0;
        board.style('background-color', 'red')
        if (prevCollision !== collision) {
            collisionCount = collisionCount + 1;
        }
    } else {
      board.style('background-color', 'white')
    }
    prevCollision = collision;
};

d3.timer(detectCollisions);
