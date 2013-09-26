define(['jquery', 'text!widgets/Q3Widget/form.html'], function($,html){
  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function Q3Widget(target){
     $(target).html(html);
     var $form = $(target).find("form");
     $form.submit(function(evt){
         evt.preventDefault();
         window.APP.mediator.trigger('q3result', null);
    });

    //Pofalla beendet Target
    window.APP.mediator.once("pofalla", function(){
       $(target).remove();
    });

    
  };

});