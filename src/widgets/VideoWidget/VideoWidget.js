// Ein zweites Beispiel-Modul mit jQuery als Dependency
define(['jquery'], function($){

  'use strict';

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
  return function VideoWidget (target){

  $(target).append('<section class="videoPlayer"></section>').html('<video controls autoplay><source src="http://cdn.tns-global.com/multimedia/DE/bi/test/Ad1_Kia_Sportage.mp4" id="v1">Video herunterladen</video>');

    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen

    var $likebutton=createButton();
    $likebutton.addClass('likeVideo').val('Like');
    var $dislikebutton = createButton();
    $dislikebutton.addClass('dislikeVideo').val('Dislike');
    
    // Erzeugten Button in das Ziel-Element einhängen
    $likebutton.appendTo(target);
    $dislikebutton.appendTo(target);

    // Beim Klick auf den Button ein "hallo"-Event triggern
    $likebutton.click(function(){
      window.APP.mediator.trigger('LIKE');
    });
    $dislikebutton.click(function(){
      window.APP.mediator.trigger('DISLIKE');
    });

  };

});