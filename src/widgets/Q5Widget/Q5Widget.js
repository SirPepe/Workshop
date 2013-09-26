
// Ein zweites Beispiel-Modul mit jQuery als Dependency
define(['jquery','text!widgets/VideoWidget/video.html'], function($,html){

  'use strict';

  // Private Modul-Funktion. Da das Modul nur die Constructor-Funktion
  // "ButtonWidget" an die Außenwelt weitergibt, bleibt die Button-Erstellung
  // selbst verborgen und privat.
    var createButton = function(){
    return $('<input/>').attr({
      type: 'button',
      class: 'btn btn-primary'
    });
  };

  // Die übliche Modul-Constructor-Funktion
  return function Q5Widget (target){
    $(target).html('<div class="videoPlayer"><video controls autoplay><source src="Ad1_Kia_Sportage.webm"><source src="Ad1_Kia_Sportage.mp4">Your browser does not support the video element</video></div><div class="snapshotcontainer"></div>');
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
  //Zeit der clicks holen
     var getVideoTime = function(){
       var $mediaElement = $(target).find('video');
       var z1=$mediaElement.get(0).currentTime;
       return z1;
    };
//snapshot
    var getSnapShot = function(but){
    // Get handles on the video and canvas elements
    var $video = $(target).find('video');
    var video = $video.get(0);
    var $canvas = $('<canvas/>');
    // Get a handle on the 2d context of the canvas element
    var context = $canvas.get(0).getContext('2d');
    
    // Add a listener to wait for the 'loadedmetadata' state so the video's dimensions can be read
    $video.on('loadedmetadata', function(){
      $canvas.attr('width', this.videoWidth);
      $canvas.attr('height', this.videoHeight);      
    });
    context.drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight/2);
    var url = $canvas.get(0).toDataURL();
    $img = $('<img/>').attr({
        src: url
      }).appendTo('div.' + but);
     return url;
     };


    
    // Tipp: Variablen mit jQuery-Objekten darin mit $ kennzeichnen
    var $likebutton=createButton();
    $likebutton.addClass('likeVideo').val('Like');
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
        var snap=getSnapShot("greenlike");
        videoObject = { wert: "1", sntime: getVideoTime(), screenshot: snap};
        videoObjectSum.push(videoObject);
        //$(target).find(".greenlike").append(snap);
    });
    $dislikebutton.click(function(index){
        var snap=getSnapShot("reddislike");
        videoObject = { wert: "2", sntime: getVideoTime(), screenshot: snap};
        videoObjectSum.push(videoObject);
        //$(target).find(".reddislike").append(snap);
    });


   window.APP.mediator.once("pofalla", function(){
      $(target).remove();
   });



     $video.on("ended", function() {
        window.APP.mediator.trigger('q5Data', videoObjectSum);
        $(target).find('.videoPlayer').hide( 2000 , function (){
           $(this).remove();
        });
     });
  };

});

    