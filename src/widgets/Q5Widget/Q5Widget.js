
// Ein zweites Beispiel-Modul mit jQuery als Dependency
define(['jquery','text!widgets/VideoWidget/video.html'], function($,html){

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
  return function Q5Widget (target){
    $(target).html('<div class="videoPlayer"><video controls autoplay><source src="Ad1_Kia_Sportage.webm"><source src="Ad1_Kia_Sportage.mp4">Your browser does not support the video element</video></div><div class="snapshotcontainer"></div><canvas></canvas>');
    //$(target).html(html);
    $(target).find('.snapshotcontainer').append("<div class='greenlike'></div>");
    $(target).find('.snapshotcontainer').append("<div class='reddislike'></div>");
    

  //Zeit der clicks holen
     var getVideoTime = function(){
       var $mediaElement = $(target).find('video');
       var z1=$mediaElement.get(0).currentTime;
       return z1;
    };
//snapshot
    var getSnapShot = function(){
    // Get handles on the video and canvas elements
    var $video = $(target).find('video');
    var $canvas = $(target).find('canvas');
    var canvas = $canvas.get(0);
    // Get a handle on the 2d context of the canvas element
    var context = canvas.getContext('2d');
    
    canvas.width = $video.get(0).videoWidth/4;
    canvas.height = $video.get(0).videoHeight/4;                                      
    context.drawImage($video.get(0), 0, 0, $video.get(0).videoWidth/4, $video.get(0).videoHeight/4);
   
    var img = canvas.toDataURL();
    var bild ='<img src="'+img+'"/>';
    return bild;
     };

   
    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $likebutton=createButton();
    $likebutton.addClass('likeVideo').val("Like");
    var $dislikebutton = createButton();
    $dislikebutton.addClass('dislikeVideo').val('Dislike');
    
    // Erzeugten Button in das Ziel-Element einhängen
    var $vPlayer = $(target).find('.videoPlayer');
    var $video = $(target).find('video');
    $likebutton.appendTo($vPlayer);
    $dislikebutton.appendTo($vPlayer);
    var help=[];
    var videoObject = {};
     var videoObjectSum = [];
    $likebutton.click(function(index){  
        var snap=getSnapShot();
        //mit bild
        //videoObject = { wert: "1", sntime: getVideoTime(), screenshot: snap};
        //ohne bild
        videoObject = { wert: "1", sntime: getVideoTime()};
        videoObjectSum.push(videoObject);
        $(target).find(".greenlike").append(snap);
    });
    $dislikebutton.click(function(index){
        var snap=getSnapShot();
        //videoObject = { wert: "2", sntime: getVideoTime(), screenshot: snap};
        videoObject = { wert: "2", sntime: getVideoTime()};
        videoObjectSum.push(videoObject);
        $(target).find(".reddislike").append(snap);
    });
   //$(target).find('img').addClass('rahmen');
   window.APP.mediator.once("pofalla", function(){
      $(target).remove();
   });



     $video.on("ended", function() {
      
        window.APP.mediator.trigger('q5Data', JSON.stringify(videoObjectSum));
        $(target).find('.videoPlayer').hide( 2000 , function (){
           $(this).remove();
        });
     });
  };

});

    