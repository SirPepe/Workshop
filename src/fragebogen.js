// Main-Datei. Lädt alle Widgets. Könnte man bestimmt schöner regeln!

require([
  'requirejs',
  'jquery',
  'lib/Mediator',
  'lib/LoadWidget',
  'widgets/Q1Widget/Q1Widget',
  'widgets/Q2Widget/Q2Widget',
  'widgets/Q3Widget/Q3Widget',
  'widgets/Q5Widget/Q5Widget'
], function(_require, $, Mediator, loadWidget,
  Q1Widget,
  Q2Widget,
  Q3Widget,
  Q5Widget
){
  'use strict';
  
  var pages = {
    q1: [Q1Widget],
    q2: [Q2Widget],
    q3: [Q3Widget],
    q5: [Q5Widget]
  };

  function pageLoader(pages){  
    var page = window.location.hash.substring(1);
    if (pages.hasOwnProperty(page)) return pages[page];
    return pages.q1; 
  }

  // Globalen App-Namespace initialisieren. Alle globalen Variablen werden, wenn
  // sie denn nötig sind, hier platziert.
  window.APP = window.APP || {};

  // Mediator initialisieren. Dass der Mediator hier erreichbar ist, ist eine
  // der KERNKONVENTIONEN der App.
  window.APP.mediator = new Mediator();

  // Container-Element für alle Widgets
  $main = $('main');
  
  // Footer-Element für next button
  $footer = $('footer');
 
  // Jedes Widget ist ein Mini-Programm und muss einzeln initialisiert werden
  var loadWidgetsInMain = loadWidget.bind(null, $main);
  
  //Sendet Pofalla
  var init = function(){
    window.APP.mediator.trigger('pofalla');
    pageLoader(pages).forEach(loadWidgetsInMain);
  };
  $(window).on('hashchange', init);
  $(document).ready(init); 
  
  
  var pageNames = Object.keys(pages);
  var goToPage = function(idx){
    var next = pageNames[idx];
    if(typeof next !== 'undefined'){
      window.location.hash='#' + next;
    }
    else {
      console.log('Danke für das Ausfüllen');
      // Gesammelte Daten versenden
    }
  };
  
  
  // Gesammelte Daten des Befragten
  var data = {};
  //var ID = function () {
  //  return Math.random().toString(10).substr(1, 8);
  //};
  //alert(ID);
  
  pageNames.map(function(name){
    return name + 'Data';
  }).forEach(function(event, idx){
    window.APP.mediator.on(event, function(result){
      console.log('Event ' + event + ' (' + JSON.stringify(result) + ')');
      var qid = event;
      data[qid] = result;
      console.log(data);
      goToPage(idx + 1);
    });
  });

});