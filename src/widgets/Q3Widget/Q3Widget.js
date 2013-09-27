define(['jquery', 'text!widgets/Q3Widget/form.html'], function($,html){
  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function Q3Widget(target){
     $(target).html(html);
     var $form = $(target).find("form");
     $form.submit(function(evt){
         evt.preventDefault();
         var val={};
         $(target).find("input[type=radio]:checked").each(function(idx,input){
            var name = $(input).attr("name").replace('Radio','Q3_');
            var value = $(input).val();
            val[name]=value;
         });
         window.APP.mediator.trigger('q3Data', val);
    });

    //Pofalla beendet Target
    window.APP.mediator.once("pofalla", function(){
       $(target).remove();
    });

    
  };

});