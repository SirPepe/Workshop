// Ganz simpler Event Emitter als Mixin. Stellt folgende Funktionen bereit:
//  * `on(topic, cb)` setzt einen Callback "cb" als Listener auf das Event "topic" an
//  * `once(topic, cb)` setzt "cb" als einmaligen Listener auf "topic" an
//  * `off(topic, cb)` entfernt einen Callback als Listener
//  * `trigger(topic, data...)` löst das Event "topic" aus und übergibt ggf. weitere Daten
// Benutzung: EventEmitter.call(MeinObjConstructor.prototype);
define(function(){

  "use strict";

  var cleanup = function(arr){
    arr = arr.filter(function(value){
      return typeof value !== 'undefined';
    });
  };

  return function EventEmitter(){

    // Enthält Arrays von Callbacks, die auf Events warten
    var topics = {};

    // Meldet "callback" als Event Handler für "topic" an
    this.on = function(topic, callback){
      if(typeof topics[topic] === 'undefined') topics[topic] = [];
      topics[topic].push(callback);
    };

    // Meldet "callback" als Event Handler für "topic" an, entfernt
    // "callback" nach einmaliger Verwendung wieder
    this.once = function(topic, callback){
      var self = this;
      if(typeof topics[topic] === 'undefined') topics[topic] = [];
      topics[topic].push(function fn(){
        callback.apply(null, arguments);
        self.off(topic, fn);
      });
    };

    // Entfernt "callback" für das Event "topic"
    this.off = function(topic, callback){
      var index = topics[topic].indexOf(callback);
      if(index > -1) delete topics[topic][index];
    };

    // Löst alle Callbacks für das Event "topic" aus und übergibt alle weiteren
    // an "trigger" übergebenen Parameter als Daten-Arguments an die Callbacks
    this.trigger = function(topic){
      if(typeof topics[topic] === 'undefined') return;
      cleanup(topics[topic]);
      var args = Array.prototype.slice.call(arguments, 1);
      for(var i = 0; i < topics[topic].length; i++){
        var callback = topics[topic][i];
        if(callback) callback.apply(null, args);
      }
    };

  };

});