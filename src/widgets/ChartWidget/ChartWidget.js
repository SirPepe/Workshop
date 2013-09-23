// Beispiel-Modul mit jQuery als Dependency
define(['jquery', 'chart'], function($){ // Peter wegen fehlendem chart fragen!!!

  'use strict';
  
  
  // Private Modul-Funktion. Da das Modul nur die Constructor-Funktion
  // "ButtonWidget" an die Außenwelt weitergibt, bleibt die Button-Erstellung
  // selbst verborgen und privat.
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
  
  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $canvas.get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);
  
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