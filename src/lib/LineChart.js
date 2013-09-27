﻿// ChartModul: LineChat - basiert auf http://www.chartjs.org/
define(['jquery', 'chart','underscore'], function($){

  'use strict';
  
  // Erzeugt Funktion createCanvas,
  var createCanvas = function(){
    return $('<canvas/>').attr({
      width: 600,
      height: 400
    });
  }; // ENDE createCanvas
  
  return function LineChart(target, data){ // Ziel wohin und mit was
    var $canvas = createCanvas();
    $(target).append($canvas);
    var ctx = $canvas.get(0).getContext("2d");
    
    //LineChart DefaultSettings
var defaults = {
				
	//Boolean - If we show the scale above the chart data			
	scaleOverlay : false,
	
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : true,
	
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : 10,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : Math.ceil(_.max(data.datasets[0].data)/10),
	//Number - The scale starting value
	scaleStartValue : 0,

	//String - Colour of the scale line	
	scaleLineColor : "rgba(0,0,0,.1)",
	
	//Number - Pixel width of the scale line	
	scaleLineWidth : 1,

	//Boolean - Whether to show labels on the scale	
	scaleShowLabels : true,
	
	//Interpolated JS string - can access value
	scaleLabel : "<%=value%>",
	
	//String - Scale label font declaration for the scale label
	scaleFontFamily : "'Arial'",
	
	//Number - Scale label font size in pixels	
	scaleFontSize : 12,
	
	//String - Scale label font weight style	
	scaleFontStyle : "normal",
	
	//String - Scale label font colour	
	scaleFontColor : "#666",	
	
	//Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : true,
	
	//String - Colour of the grid lines
	scaleGridLineColor : "rgba(0,0,0,.05)",
	
	//Number - Width of the grid lines
	scaleGridLineWidth : 1,	
	
	//Boolean - Whether the line is curved between points
	bezierCurve : true,
	
	//Boolean - Whether to show a dot for each point
	pointDot : true,
	
	//Number - Radius of each point dot in pixels
	pointDotRadius : 3,
	
	//Number - Pixel width of point dot stroke
	pointDotStrokeWidth : 1,
	
	//Boolean - Whether to show a stroke for datasets
	datasetStroke : true,
	
	//Number - Pixel width of dataset stroke
	datasetStrokeWidth : 2,
	
	//Boolean - Whether to fill the dataset with a colour
	datasetFill : true,
	
	//Boolean - Whether to animate the chart
	animation : true,

	//Number - Number of animation steps
	animationSteps : 60,
	
	//String - Animation easing effect
	animationEasing : "easeOutQuart",

	//Function - Fires when the animation is complete
	onAnimationComplete : null
	
};

  // Farb-Settings innerhalb Data structure des Charts
  data.datasets[0].fillColor = "rgba(115,115,115,0.25)";
  data.datasets[0].strokeColor = "rgba(122,34,128,1)";
  data.datasets[0].pointColor = "rgba(76,29,82,1)";
  data.datasets[0].pointstrokeColor = "rgba(122,34,128,1)";

  new Chart(ctx).Line(data,defaults); // Chart zeichnen
  return $canvas; // gibt $canvas zurueck damit es bei Chartwechsel geloescht werden kann
  
  };
  
  }); // ENDE AMD