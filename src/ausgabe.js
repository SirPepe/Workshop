// Main-Datei. Lädt alle Widgets. Könnte man bestimmt schöner regeln!

require([
  'requirejs',
  'jquery',
  'lib/Mediator',
  'lib/LoadWidget',
  'widgets/ChartWidget/ChartWidget'
], function(_require, $, Mediator, loadWidget){

  'use strict';

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
  [].slice.call(arguments, 4).forEach(loadWidgetsInMain);

});