// Ein zweites Beispiel-Modul mit jQuery als Dependency
define(['jquery', 'text!widgets/TextWidget/content.html'], function($,html){

  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function TextWidget(target){
     
    $(target).html(html);

//Pofalla beendet Target
    window.APP.mediator.on("pofalla", function listener(){
       $(target).remove();
       window.APP.mediator.off("pofalla", listener);
    });
      
  };

});