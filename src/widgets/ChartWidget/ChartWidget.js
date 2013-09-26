// ChartWidget
define(['jquery', 'chart', 'lib/aggregate', 'lib/ColumnChart', 'lib/LineChart', 'lib/PieChart', 'bootstrapDropdown'], function($,_chart,aggregate,ColumnChart,LineChart,PieChart){ // fuer '_chart' kein parameter weil kein AMD Modul Chart ist global! 

  'use strict';
  
    var createButton = function(){
    var $div = $('<div/>').attr({
    class: 'btn-group'
    });
    var $button = $('<button/>').attr({
      type: 'button',
      class: 'btn btn-default dropdown-toggle',
      "data-toggle": 'dropdown',
    }).html('Charttyp <span class="caret"></span>');
    var $ul = $('<ul/>').attr({
    class: 'dropdown-menu',
    role: 'menu'
    }).html('<li><a href="#pie">Kreis</a></li><li><a href="#column">Säulen</a></li><li><a href="#line">Linien</a></li>');
    return $div.append($button,$ul);
  }; // Ende createButton
  
  return function ChartWidget(target){ //ConstructorFn

  // DATEN VON OLIVER

  aggregate.getByQid("Q3", function(oliverdata) {
    //console.log(oliverdata);
    delete oliverdata.data.null; // löscht die "null" aus den Dateneinträgen 
    var dataInArray =_.values(oliverdata.data); // Daten data (values) aus Object (oliverdata) in Array schreiben
    var answersInArray =_.values(oliverdata.answers); // Daten answers (values) aus Object (oliverdata) in Array schreiben
    
      
  var data = {
    labels : answersInArray,
    datasets : [
		{ // fixes Datenformat fuer ColumnChart, die Daten ohne Label unter data.datasets[0].data
			fillColor : "rgba(236,0,140,0.5)",
			strokeColor : "rgba(220,220,220,0)",
			data : dataInArray
		},
/*  zweite Serie fuer ColumnChart mölich
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			data : [28,48,40,19,96,27,100]
		}
    */
	]
};

    var $canvas = new ColumnChart(target, data);  // erzeugt Chart, default ist Column
  
  
     // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $button = createButton();
    
    $linkPie = $button.find('a[href="#pie"]').click(function(evt){ // Chart-Type-Auswahl, evt-objekt für "click" um auf der Seite zu bleiben, sonst gibt's #pie.html
      evt.preventDefault();
      $canvas.remove(); // löscht die canvas
      $canvas = new PieChart(target, data);
    });
    $linkColumn = $button.find('a[href="#column"]').click(function(evt){
      evt.preventDefault();
      $canvas.remove();
      $canvas = new ColumnChart(target, data);
    });
    $linkLine = $button.find('a[href="#line"]').click(function(evt){
      evt.preventDefault();
      $canvas.remove();
      $canvas = new LineChart(target, data);
    });
    
    // Erzeugten Button in das Ziel-Element einhängen
    $button.appendTo(target);


  
  
  }); // Ende Datenanfrage
  
//Pofalla beendet Target
  window.APP.mediator.on("pofalla", function listener(){
  $(target).remove();
  window.APP.mediator.off("pofalla", listener);
   });
  

  }; // Ende Constructor

}); // Ende Modulf.