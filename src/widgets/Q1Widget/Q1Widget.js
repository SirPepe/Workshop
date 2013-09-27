define(['jquery', 'text!widgets/Q1Widget/form.html'], function($,html){
  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function Q1Widget(target){
     $(target).html(html);
     var $form = $(target).find("form");
     $form.submit(function(evt){
         evt.preventDefault();
         var val = $(target).find("input[name=gender]:checked").val();   
         window.APP.mediator.trigger('q1Data', val);
    });
    
    

//Pofalla beendet Target
    window.APP.mediator.once("pofalla", function(){
       $(target).remove();
    });
  };
});