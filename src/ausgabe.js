// Main-Datei. Lädt alle Widgets. Könnte man bestimmt schöner regeln!

require([
  'requirejs',
  'jquery',
  'lib/Mediator',
  'lib/LoadWidget',
  'widgets/ChartWidget/ChartWidget',
  'widgets/TextWidget/TextWidget'
], function(_require, $, Mediator, loadWidget,
  ChartWidget,
  TextWidget
){

  'use strict';
  
  var pages = {
    seite1: [ChartWidget],
    seite2: [TextWidget]
  };
  
  
  
  function pageLoader(pages){  
    var page = window.location.hash.substring(1);
    if (pages.hasOwnProperty(page)) return pages[page];
    return pages.seite1; 
  }
  
  
  // Globalen App-Namespace initialisieren. Alle globalen Variablen werden, wenn
  // sie denn nötig sind, hier platziert.
  window.APP = window.APP || {};

  // Mediator initialisieren. Dass der Mediator hier erreichbar ist, ist eine
  // der KERNKONVENTIONEN der App.
  window.APP.mediator = new Mediator();

  // Container-Element für alle Widgets
  $main = $('main');

  // Jedes Widget ist ein Mini-Programm und muss einzeln initialisiert werden
  var loadWidgetsInMain = loadWidget.bind(null, $main);
  
  var init = function(){
    window.APP.mediator.trigger('pofalla');
    pageLoader(pages).forEach(loadWidgetsInMain);
  };
  $(window).on('hashchange', init);
  $(document).ready(init);
  
});
