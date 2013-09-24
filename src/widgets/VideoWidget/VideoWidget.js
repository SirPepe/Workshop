// Ein zweites Beispiel-Modul mit jQuery als Dependency
define(['jquery'], function($){

  'use strict';

  $('main').append('<div class="videoPlayer"></div>');
  $('.videoPlayer').html('<video controls><source src="http://cdn.tns-global.com/multimedia/DE/bi/test/Ad1_Kia_Sportage.mp4">Video herunterladen</video>');






  // Private Modul-Funktion. Da das Modul nur die Constructor-Funktion
  // "ButtonWidget" an die Außenwelt weitergibt, bleibt die Button-Erstellung
  // selbst verborgen und privat.
/*    var createButton = function(){
    return $('<input/>').attr({
      type: 'button',
      class: 'btn btn-primary',
      value: 'Hallo!'
    });
  };

  
  // Die übliche Modul-Constructor-Funktion
  return function ButtonWidget(target){

    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $button = createButton();

    // Erzeugten Button in das Ziel-Element einhängen
    $button.appendTo(target);

    // Beim Klick auf den Button ein "hallo"-Event triggern
    $button.click(function(){
      window.APP.mediator.trigger('hallo');
    });

  };*/

});