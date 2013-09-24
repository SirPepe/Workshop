// ChartModul: Torte - basiert auf http://www.chartjs.org/
define(['jquery', 'chart'], function($){ // fuer 'chart' kein parameter weil kein AMD Modul Chart ist global!

  'use strict';
  
  
  // Erzeugt Funktion createCanvas,
  var createCanvas = function(){
    return $('<canvas/>').attr({
      width: 400,
      height: 400,
      id: 'myChart'
    });
  };

  // Jedes Modul gibt eine Constructorfunktion zurück. Das Ist eine der
  // KERNKONVENTIONEN der App. Die Funktion erwartet IMMER ein DOM-Element, das
  // das Widget als Zielcontainer für das eigene Sub-DOM nutzen kann
  return function ChartWidget(target){

  var $canvas = createCanvas();
  $(target).append($canvas);
  
  var ctx = $canvas.get(0).getContext("2d");

  
  var data =  [
	{
		value: 30,
		color:"#F38630"
	},
	{
		value : 50,
		color : "#E0E4CC"
	},
	{
		value : 100,
		color : "#69D2E7"
	}			
    ];
  new Chart(ctx).Pie(data);
  
  
  
  
  

  };

});