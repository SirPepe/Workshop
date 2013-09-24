// Ein zweites Beispiel-Modul mit jQuery als Dependency
define(['jquery'], function($){

  'use strict';

  $('main').append('<section class="videoPlayer"></section>');
  $('.videoPlayer').html('<video controls autoplay><source src="http://cdn.tns-global.com/multimedia/DE/bi/test/Ad1_Kia_Sportage.mp4" id="v1">Video herunterladen</video>');
  

  // Private Modul-Funktion. Da das Modul nur die Constructor-Funktion
  // "ButtonWidget" an die Außenwelt weitergibt, bleibt die Button-Erstellung
  // selbst verborgen und privat.
    var createButton = function(){
    return $('<input/>').attr({
      type: 'button',
      class: 'btn btn-primary',
    });
  };

  
  // Die übliche Modul-Constructor-Funktion
  return function ButtonWidget(target){

    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen

    var $likebutton=createButton();
    $likebutton.addClass('likeVideo').val('Like');
    var $dislikebutton = createButton();
    $dislikebutton.addClass('dislikeVideo').val('Dislike');
    
    // Erzeugten Button in das Ziel-Element einhängen
    $likebutton.appendTo(".videoPlayer");
    $dislikebutton.appendTo(".videoPlayer");

    // Beim Klick auf den Button ein "hallo"-Event triggern
    $likebutton.click(function(){
      window.APP.mediator.trigger('LIKE');
    });
    $dislikebutton.click(function(){
      window.APP.mediator.trigger('DISLIKE');
    });

  };

});