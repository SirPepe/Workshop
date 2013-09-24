// Ein zweites Beispiel-Modul mit jQuery als Dependency
define(['jquery', 'text!widgets/TextWidget/content.html'], function($,html){

  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function TextWidget(target){
     
      $(target).html(html);

  };

});