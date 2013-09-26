// ChartWidget
define(['jquery', 'chart', 'lib/aggregate', 'lib/ColumnChart', 'lib/LineChart', 'lib/PieChart', 'bootstrapDropdown'], function($,_chart,aggregate,ColumnChart,LineChart,PieChart){ // fuer '_chart' kein parameter weil kein AMD Modul Chart ist global! 

  'use strict';
  
  
    var data;    // Daten
  
  
    var createButton = function(type, label){
      var items;
      switch (type) {
        case 'chart':
          items = '<li><a href="#pie">Kreis</a></li><li><a href="#column">Säulen</a></li><li><a href="#line">Linien</a></li>';
          break;
        case 'data':
          items = '<li><a href="#Q1">Geschlecht</a></li><li><a href="#Q3">Automarken</a></li>';
          break;
        default:
          items = '<li><a href="#pie">Kreis</a></li><li><a href="#column">Säulen</a></li><li><a href="#line">Linien</a></li>';
      }
      var $div = $('<div/>').attr({
        class: 'btn-group'
      });
      var $button = $('<button/>').attr({
        type: 'button',
        class: 'btn btn-info dropdown-toggle', // btn-... default=weiss, success=gruen info=hellblau
        "data-toggle": 'dropdown',
      }).html(label + ' <span class="caret"></span>');
      var $ul = $('<ul/>').attr({
        class: 'dropdown-menu',
        role: 'menu'
      }).html(items);
      return $div.append($button,$ul);
    }; // Ende createButton
 
 
    // Callback wird ausgeführt wenn daten ankommen, bekommt data übergeben
    var getData = function(qid, callback){
      aggregate.getByQid(qid, function(oliverdata) {
        //console.log(oliverdata);
        delete oliverdata.data.null; // löscht die "null" aus den Dateneinträgen 
        var dataInArray =_.values(oliverdata.data); // Daten data (values) aus Object (oliverdata) in Array schreiben
        var answersInArray =_.values(oliverdata.answers); // Daten answers (values) aus Object (oliverdata) in Array schreiben    
        data = {
          labels : answersInArray,
          datasets : [
            { // fixes Datenformat fuer ColumnChart, die Daten ohne Label unter data.datasets[0].data
              fillColor : "rgba(236,0,140,0.5)",
              strokeColor : "rgba(220,220,220,0)",
              data : dataInArray
            },
          ]
        };
        callback(data);
      }); // Ende Datenanfrage
    };


 
  return function ChartWidget(target){ //ConstructorFn
    var $canvas; // Chart-Canvas im DOM
    var chartType = 'column';
  
  
    // Button fur charts
    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $chartButton = createButton('chart', 'Chart-Typ');
    var chartTypes = {
      pie: PieChart,
      line: LineChart,
      column: ColumnChart// Button fur charts
    };
    $chartButton.find('a').click(function(evt){
      evt.preventDefault();
      var type = $(this).attr('href').substring(1);
      chartType = type;
      $canvas.remove(); // löscht die canvas
      $canvas = new chartTypes[type](target, data);
    });    
    $chartButton.appendTo(target); // Erzeugten Button in das Ziel-Element einhängen
    
    
    // Button für Daten
    var $dataButton = createButton('data', 'Frage');
    $dataButton.find('a').click(function(evt){
      evt.preventDefault();
      var qid = $(this).attr('href').substring(1);
      getData(qid, function(data){
        $canvas.remove(); // löscht die canvas
        $canvas = new chartTypes[chartType](target, data);
      });
    });
    $dataButton.appendTo(target);
  
  
    // Start-Chart
    getData('Q3', function(data){
      $canvas = new ColumnChart(target, data);  // erzeugt Chart, default ist Column
    });

  
    //Pofalla beendet Target
    window.APP.mediator.once("pofalla", function(){
      $(target).remove();
   });
  

  }; // Ende Constructor

  
}); // Ende Modulf.