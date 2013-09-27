define(['jquery', 'text!widgets/Q3Widget/form.html'], function($,html){
  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function Q3Widget(target){
     $(target).html(html);
     var $form = $(target).find("form");
     $form.submit(function(evt){
         evt.preventDefault();
         var val = [];
         var $trs = $(target).find('tr').each(function(trIdx, tr){
            var $inputs = $(tr).find('input[type=radio]');
            if($inputs.length > 0){
              var value = null;
              $inputs.each(function(inputIdx, input){
                if($(input).prop('checked')){
                  value = this.value;
                }
              });
              val.push(value);
            }
         });
         window.APP.mediator.trigger('q3Data', JSON.stringify(val));
    });

    //Pofalla beendet Target
    window.APP.mediator.once("pofalla", function(){
       $(target).remove();
    });

    
  };

});