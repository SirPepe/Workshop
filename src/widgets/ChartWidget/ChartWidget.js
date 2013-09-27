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
        class: 'btn-group',
        style: 'padding-right: 50px;'
      });
      var $button = $('<button/>').attr({
        type: 'button',
        class: 'btn btn-success dropdown-toggle', // btn-xxx default=weiss, success=gruen info=hellblau
        "data-toggle": 'dropdown',
      }).html(label + ' <span class="caret"></span>');
      var $ul = $('<ul/>').attr({
        class: 'dropdown-menu',
        role: 'menu'
      }).html(items);
      return $div.append($button,$ul);
    }; // Ende createButton
 
 
    // Datenimport - Callback wird ausgeführt wenn daten ankommen, bekommt data übergeben
    var getData = function(qid, callback){
      aggregate.getByQid(qid, function(oliverdata) {
        //console.log(oliverdata);
        delete oliverdata.data.null; // löscht die "null" aus den Dateneinträgen 
        var dataInArray =_.values(oliverdata.data); // Daten data (values) aus Object (oliverdata) in Array schreiben
        var answersInArray =_.values(oliverdata.answers); // Daten answers (values) aus Object (oliverdata) in Array schreiben    
        data = {
          qText: oliverdata.text, //Fragetext - wird in die headline übergeben
          labels : answersInArray,
          datasets : [ // Array mit Objekt als Inhalt
            {
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
  
    //headline erstellen und updateheadline, text ist Fragetext
    var $headline = $('<h3>').text('Lade Daten...');
    var updateHeadline = function(content){
      $headline.text(content);
    };
  
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
        $canvas.remove(); // löscht die $canvas
        $canvas = new chartTypes[chartType](target, data);
        updateHeadline(data.qText); // text ist Frage
      });
    });
    $dataButton.appendTo(target);
    
    $headline.appendTo(target); // Headline in Target einhaengen
  
    // Start-Chart: Default
    getData('Q3', function(data){
      $canvas = new ColumnChart(target, data);  // erzeugt Chart, default ist Column->Q3
      updateHeadline(data.qText); // text ist Frage
    });

  
    //Pofalla beendet Target
    window.APP.mediator.once("pofalla", function(){
      $(target).remove();
   });
  

  }; // Ende Constructor

  
}); // Ende Modulf.