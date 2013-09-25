// ChartWidget
define(['jquery', 'chart', 'lib/aggregate', 'lib/ColumnChart', 'lib/LineChart', 'lib/PieChart'], function($,_chart,aggregate,ColumnChart,LineChart,PieChart){ // fuer '_chart' kein parameter weil kein AMD Modul Chart ist global! , fuer dropdown button: '../../../bower_components/bootstrap/js/dropdown'

  'use strict';
  
  
  // Erzeugt Funktion createCanvas,
  var createCanvas = function(){
    return $('<canvas/>').attr({
      width: 600,
      height: 400,
      id: 'myChart'
    });
  };
  
    var createButton = function(){
    return $('<input/>').attr({
      type: 'button',
      class: 'btn btn-primary',
      value: 'Hallo!'
    });
  };
  
  return function ChartWidget(target){ //ConstructorFn

  // DATEN VON OLIVER

  aggregate.getByQid("Q3", function(oliverdata) {
    console.log(oliverdata);
    delete oliverdata.data.null; // löscht die "null" aus den Dateneinträgen 
    var dataInArray =_.values(oliverdata.data); // Daten data (values) aus Object (oliverdata) in Array schreiben
    var answersInArray =_.values(oliverdata.answers); // Daten answers (values) aus Object (oliverdata) in Array schreiben
    
    
    console.log(dataInArray);
  
var data = {
	labels : answersInArray,
	datasets : [
		{
			fillColor : "rgba(236,0,140,0.5)",
			strokeColor : "rgba(220,220,220,0)",
			data : dataInArray
		},
/*  zweite Serie
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			data : [28,48,40,19,96,27,100]
		}
    */
	]
};

new PieChart(target, data);  
  
  
     // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $button = createButton();

    // Erzeugten Button in das Ziel-Element einhängen
    $button.appendTo(target);

    // Beim Klick auf den Button ein "hallo"-Event triggern
    $button.click(function(){
      window.APP.mediator.trigger('hallo');
    });
  
  
  }); // Ende Datenanfrage
  
//Pofalla beendet Target
  window.APP.mediator.on("pofalla", function listener(){
  $(target).remove();
  window.APP.mediator.off("pofalla", listener);
   });
  

  }; // Ende Constructor

}); // Ende Modulf.