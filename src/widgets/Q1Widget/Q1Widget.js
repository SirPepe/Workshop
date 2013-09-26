define(['jquery', 'text!widgets/Q1Widget/form.html'], function($,html){
  'use strict';

  // Die übliche Modul-Constructor-Funktion
  return function Q1Widget(target){
     $(target).html(html);
     var $form = $(target).find("form");
     $form.submit(function(evt){
         evt.preventDefault();
         var msg;
         var val = $(target).find("input[name=gender]:checked").val();
         switch(val){
           case '1':
             msg = 'Hallo fellow.\nNext of kin, please!\n';
             break;
           case '2':
             msg = 'Hallo nice!\nMay i get your telephone number?\n';
             break;
           default:
             msg = '!No answer!\nPlease try again.\n';
             break;             
         }
         window.APP.mediator.trigger('q1result', val, msg);
    });
    
    // Nur zu Testzwecken
    function q1test(val, msg){
      alert(msg + '\n(Code = ' + val + ')');
    }
    window.APP.mediator.on('q1result', q1test);

//Pofalla beendet Target
    window.APP.mediator.on("pofalla", function listener(){
       $(target).remove();
       window.APP.mediator.off("pofalla", listener);
       window.APP.mediator.off("q1result", q1test);
    });

    
  };

});