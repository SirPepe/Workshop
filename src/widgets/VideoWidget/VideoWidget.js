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
//Zeit der clicks holen
     var getVideoTime = function(target){
       var $mediaElement = $(target).find('video');
       var z1=$mediaElement.get(0).currentTime;
       return z1;
    };
//snapshot
    var getSnapShot = function(target){
    // Get handles on the video and canvas elements
    var $video = $(target).find('video');
    var $canvas = $(target).find('canvas');
    var canvas = $canvas.get(0);
    // Get a handle on the 2d context of the canvas element
    var context = canvas.getContext('2d');
    canvas.width = $video.get(0).videoWidth;
    canvas.height = $video.get(0).videoHeight;                                      
    context.drawImage($video.get(0), 0, 0, $video.get(0).videoWidth, $video.get(0).videoHeight);
    };


  // Die übliche Modul-Constructor-Funktion
  return function VideoWidget (target){
  $(target).html('<div class="videoPlayer"><video controls autoplay><source src="http://cdn.tns-global.com/multimedia/DE/bi/test/Ad1_Kia_Sportage.mp4" id="v1">Video herunterladen</video></div><canvas id="canvas"></canvas></canvas>');
    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $v1 = $(target).find('video');
    var v1 = $(target).find('video').get(0);
    var $likebutton=createButton();
    $likebutton.addClass('likeVideo').val('Like');
    var $dislikebutton = createButton();
    $dislikebutton.addClass('dislikeVideo').val('Dislike');
    
    // Erzeugten Button in das Ziel-Element einhängen
    $likebutton.appendTo(target);
    $dislikebutton.appendTo(target);
    var help=[];
    var videoObject = {};
     var videoObjectSum = [];
v1.onplay = function () {
    // Do play stuff here
    // Beim Klick auf den Button ein "hallo"-Event triggern
    $(target).each(function(){
        $likebutton.click(function(index){
        videoObject=({"videoObject.wert": "1", "videoObject.sntime": getVideoTime(target)});
        videoObjectSum.push(videoObject);
        var snap=getSnapShot(target);
    });
    $dislikebutton.click(function(index){
        var tg=getVideoTime(target);
        videoObject=({"videoObject.wert": "2", "videoObject.sntime": getVideoTime(target)});
        videoObjectSum.push(videoObject);
        var snap=getSnapShot(target);
    });
    });
};

     $v1.bind("ended", function() {
     var json=JSON.stringify(videoObjectSum);
     //alert(json);
      window.APP.mediator.trigger(json);
});
  };

});