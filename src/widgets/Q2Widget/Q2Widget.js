// Q2 NUMBER-Question for age

define(['jquery', 'text!widgets/Q2Widget/form.html'], function($,html){
  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function Q2Widget(target){
     $(target).html(html);
     var $form = $(target).find("form");
     $form.submit(function(evt){
         console.log(42);
         evt.preventDefault();
         var val = $(target).find("input[name='age']").val();
         window.APP.mediator.trigger('q2data', val);         
      });
    
    //Pofalla beendet Target
    window.APP.mediator.once("pofalla", function(){
       $(target).remove();
    });
  };
});