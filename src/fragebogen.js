// Main-Datei. Lädt alle Widgets. Könnte man bestimmt schöner regeln!

require([
  'requirejs',
  'jquery',
  'lib/Mediator',
  'lib/LoadWidget',
  'widgets/VideoWidget/VideoWidget',
  'widgets/Q1Widget/Q1Widget',
  'widgets/TextWidget/TextWidget'
], function(_require, $, Mediator, loadWidget,
  VideoWidget,
  Q1Widget,
  TextWidget
){
  'use strict';
  
  var pages = {
    seite1: [Q1Widget],
    seite2: [VideoWidget]
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
  
  // Footer-Element für next button
  $footer = $('footer');
  
  // Next Button
   var createButton = function(){
    return $('<input/>').attr({
      type: 'button',
      class: 'btn btn-primary clearfix',
    });};
    
  var $nextbutton=createButton();
  $nextbutton.addClass('next').val('NEXT');
 
  // Jedes Widget ist ein Mini-Programm und muss einzeln initialisiert werden
  var loadWidgetsInMain = loadWidget.bind(null, $main);
  
  //Sendet Pofalla
  var init = function(){
    window.APP.mediator.trigger('pofalla');
    pageLoader(pages).forEach(loadWidgetsInMain);
    $nextbutton.prependTo($footer);
  };
  $(window).on('hashchange', init);
  $(document).ready(init); 
  
  $nextbutton.click(function(){
    var keys = Object.keys(pages);
    var index = keys.indexOf(window.location.hash.substring(1));
    var next = keys[index + 1];
    if(typeof next !== 'undefined'){
      window.location.hash='#' + next;
    }
    else {
      alert('Danke für das Ausfüllen');
    }
  });

});