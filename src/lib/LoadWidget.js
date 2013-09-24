define(function(){

  return function($main, Widget){

    // Jedes Widget bekommt einen eigenen Container
    var $widgetContainer = $('<section>')
      .addClass('widgetContainer')
      .addClass(Widget.name);

    // Das Widget bekommt in seiner Constructorfunktion übergeben, in welchen
    // Container es sich rendern darf. Dass jedes Widget eine Constructorfunktion
    // bereitstellt, ist eine der KERNKONVENTIONEN der App.
    new Widget($widgetContainer[0]);

    // Der Widget-Container wird in das DOM eingehängt. Was das Widget mit dem
    // Container macht, bleibt ihm überlassen.
    $widgetContainer.appendTo($main);

  };
  
 });