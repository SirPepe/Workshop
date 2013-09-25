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
    $video.attr('crossOrigin','Anonymous');
    
    canvas.width = $video.get(0).videoWidth/4;
    canvas.height = $video.get(0).videoHeight/4;                                      
    context.drawImage($video.get(0), 0, 0, $video.get(0).videoWidth/4, $video.get(0).videoHeight/4);
    $canvas.css('display','none');
    
     var img = canvas.toDataURL("image/png");
    var bild ='<img src="'+img+'"/>';
    return bild;
     };


  // Die übliche Modul-Constructor-Funktion
  return function VideoWidget (target){
  $(target).html('<div class="videoPlayer"><video controls autoplay><source src="Ad1_Kia_Sportage.mp4" id="v1">Video herunterladen</video></div><canvas id="canvas"></canvas><div class="snapshotcontainer"></div>');
    $(target).find('.snapshotcontainer').append("<div class='greenlike'></div>");
    $(target).find('.snapshotcontainer').append("<div class='reddislike'></div>");
    $(target).find('.greenlike').css({
      'background-color':'green',
      'min-width':'350px',
      'max-width':'350px',
      'float':'left'
    });
    $(target).find('.reddislike').css({
      'background-color':'red',
      'min-width':'350px',
      'max-width':'350px',
      'float':'left'
    });
    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $v1 = $(target).find('video');
    var v1 = $(target).find('video').get(0);
    var $likebutton=createButton();
    $likebutton.addClass('likeVideo').val('Like');
    var $dislikebutton = createButton();
    $dislikebutton.addClass('dislikeVideo').val('Dislike');
    
    // Erzeugten Button in das Ziel-Element einhängen
    var $vPlayer = $(target).find('.videoPlayer');    
    $likebutton.appendTo($vPlayer);
    $dislikebutton.appendTo($vPlayer);
    var help=[];
    var videoObject = {};
     var videoObjectSum = [];
v1.onplay = function () {
    // Do play stuff here
    // Beim Klick auf den Button ein "hallo"-Event triggern
    $(target).each(function(){
        $likebutton.click(function(index){
        var snap=getSnapShot(target);
        videoObject = { wert: "1", sntime: getVideoTime(target), screenshot: snap};
        videoObjectSum.push(videoObject);
        $(target).find(".greenlike").append(snap);
    });
    $dislikebutton.click(function(index){
        var snap=getSnapShot(target);
        videoObject = { wert: "2", sntime: getVideoTime(target), screenshot: snap};
        videoObjectSum.push(videoObject);
        $(target).find(".reddislike").append(snap);
    });
    });
};


window.APP.mediator.on("pofalla", function listener(){
      window.APP.mediator.trigger(videoObjectSum);
      $(target).remove();
      window.APP.mediator.off('pofalla', listener);
    });



     $v1.bind("ended", function() {
      $(target).find('.videoPlayer').hide( 2000 , function (){
        $(this).remove();
      });
      window.APP.mediator.trigger(videoObjectSum);
});
  };

});