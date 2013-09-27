// ChartModul: Saeulen - basiert auf http://www.chartjs.org/
define(['jquery', 'chart','underscore'], function($){

  'use strict';
  
  // Erzeugt Funktion createCanvas,
  var createCanvas = function(){
    return $('<canvas/>').attr({
      width: 600,
      height: 400
    });
  }; // ENDE createCanvas
  
  return function ColumnChart(target, data){ // Ziel wohin und mit was
    var $canvas = createCanvas();
    $(target).append($canvas);
    var ctx = $canvas.get(0).getContext("2d");
    
    //ColumnChart DefaultSettings
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
	scaleFontSize : 10,
	
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

	//Boolean - If there is a stroke on each bar	
	barShowStroke : true,
	
	//Number - Pixel width of the bar stroke	
	barStrokeWidth : 2,
	
	//Number - Spacing between each of the X value sets
	barValueSpacing : 5,
	
	//Number - Spacing between data sets within X values
	barDatasetSpacing : 1,
	
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
  data.datasets[0].fillColor = "rgba(236,0,140,0.7)";
  data.datasets[0].strokeColor = "rgba(220,220,220,0)";


  new Chart(ctx).Bar(data,defaults); // Chart zeichnen
  return $canvas; // gibt $canvas zurueck damit es bei Chartwechsel geloescht werden kann
  
  };
  
  }); // ENDE AMD