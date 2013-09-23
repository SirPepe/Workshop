// Beispiel-Modul mit jQuery als Dependency
define(['jquery'], function($){

  'use strict';

  var apiPath = "http://tsmmhwbi807/workshop/api/data";

  // Jedes Modul gibt eine Constructorfunktion zurück. Das Ist eine der
  // KERNKONVENTIONEN der App. Die Funktion erwartet IMMER ein DOM-Element, das
  // das Widget als Zielcontainer für das eigene Sub-DOM nutzen kann
  return function AggregateWidget() {

    var gender = 
    { 
      "male": 0, 
      "female": 0,
      "other": 0
    };

    return $.getJSON(apiPath)
    .done(function(data) {
      console.log("success: retrieved " + data.length + " items.");
      
      $.each(data, function(key, val) {
        if(val.Q1 == 1) gender.male++;
        else if(val.Q1 == 2) gender.female++;
        else gender.other++;
      });

      console.log("Male: " + gender.male + ", female: " + gender.female + ", other: " + gender.other);
    })
    .fail(function(jqxhr, textStatus, error) {
      console.log("Error: "+ textStatus + ", " + error);
    })
    .always(function() {
      console.log("ready.");
    });


  };

});