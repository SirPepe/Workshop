﻿// ChartModul: Pie - basiert auf http://www.chartjs.org/
define(['jquery', 'chart','underscore'], function($){

  'use strict';
  
  // Erzeugt Funktion createCanvas,
  var createCanvas = function(){
    return $('<canvas/>').attr({
      width: 400,
      height: 400
    });
  }; // ENDE createCanvas
  
  return function PieChart(target, data){ // Ziel wohin und mit was
    var $container = $('<div/>'); // um die Labels in html zuerzeugen
    var $canvas = createCanvas();
    $container.append($canvas);
    $(target).append($container);
    var ctx = $canvas.get(0).getContext("2d"); // 2D 
    
       
    //PieChart DefaultSettings
      var defaults = {
				
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,
	
      //String - The colour of each segment stroke
      segmentStrokeColor : "#fff",
      
      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,
      
      //Boolean - Whether we should animate the chart	
      animation : true,
      
      //Number - Amount of animation steps
      animationSteps : 100,
      
      //String - Animation easing effect
      animationEasing : "easeOutBounce",
      
      //Boolean - Whether we animate the rotation of the Pie
      animateRotate : true,

      //Boolean - Whether we animate scaling the Pie from the centre
      animateScale : false,
      
      //Function - Will fire on animation completion.
      onAnimationComplete : null
	
    };

    var pieData = data.datasets[0].data.map(function(value, idx){ // Datentransformation für PieChart: erstes Objekt[0] aus data.datasets, idx gibt Anzahlder Elemente zürück - für die Farberzeugung
      return {
        label: data.labels[idx],
        value: value,
        color: "hsl(" + 360/data.datasets[0].data.length*idx + ",100%,50%)"
      };
    }); 
  new Chart(ctx).Pie(pieData,defaults); // Chart zeichnen
  
  // <UL> mit Labels
  var $ul = $('<ul/>').addClass('legend');
  $ul.appendTo($container);
  pieData.forEach (function(value){
    var $li = $('<li/>');
    $li.text(value.label);
    var $span = $('<span/>').css('background-color',value.color);
    $span.appendTo($li);    
    $li.appendTo($ul);
    
  });
  
  return $container; // gibt $container (mit $canvas) zurueck damit es bei Chartwechsel geloescht werden kann
  
  };
  
  }); // ENDE AMD