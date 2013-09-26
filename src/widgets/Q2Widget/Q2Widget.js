// Q2 NUMBER-Question for age

define(['jquery', 'text!widgets/Q2Widget/form.html'], function($,html){
  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function Q2Widget(target){
     $(target).html(html);
     var $form = $(target).find("form");
     $form.submit(function(evt){
         evt.preventDefault();
         var val = $(target).find("input[name='age']").val();
         window.APP.mediator.trigger('q2result', val);
    });
    
     window.APP.mediator.on('q2data');

//Pofalla beendet Target
    window.APP.mediator.on("pofalla", function listener(){
       $(target).remove();
       window.APP.mediator.off("pofalla", listener);
       window.APP.mediator.off("q2data");
    });
  };
});