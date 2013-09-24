define(["jquery", "underscore"], function($) {

  'use strict';

  var apiDataPath = "http://tsmmhwbi807/workshop/api/data";
  var apiMetadataPath = "http://tsmmhwbi807/workshop/api/metadata";

  function getMetadata() {
    return $.getJSON(apiMetadataPath)
    .done(function(data) {
      console.log("success: retrieved metadata.");    
    })
    .fail(function(jqxhr, textStatus, error) {
      error.log("error retrieving metadata: " + textStatus + ", " + error);
    });
  }

  function getData() {
    return $.getJSON(apiDataPath)
    .done(function(data) {
      console.log("success: retrieved " + data.length + " items of data.");
    })
    .fail(function(jqxhr, textStatus, error) {
      error.log("error retrieving data: " + textStatus + ", " + error);
    });
  }

  return {
    getByQid: function(q, callback) {
      $.when(getMetadata(), getData()).done(function(allmetaResult, dataResult) {
        var allmeta = allmetaResult[0]; //metadata for all questions
        var data = dataResult[0]; //data from all respondents
        var meta = _.find(allmeta, function(m) { //get metadata only from question q
          return m.qid === q;
        });
        var answers = JSON.parse(meta.answers); //meta.answers is string from DB, convert to JSON

        //build result
        var result = {};
        result.answers = meta.answers;
        result.title = meta.title;
        result.text = meta.text;
        result.data = {};

        switch(meta.type) {
          case "Single":
            //set each answer to 0
            $.each(answers, function(key, val) {
              result.data[key] = 0;
            });
            result.data[null] = 0;

            //count respondent answers
            $.each(data, function(key, val) {
              result.data[val[q]]++;
            });
            break;
          case "Multi":
            //build each answer in result and set it to 0
            $.each(answers, function(key, val) {
              result.data[q + "_" + key] = 0;
            });

            //get questions variables for this question
            var questionVars = _.keys(data[0]).filter(function(keyname) { //get only those interesting for q
              return keyname.indexOf(q + "_") === 0;
            });
            
            //count respondent answers
            $.each(data, function(key, response) { //for each response
              $.each(questionVars, function(id, v) { //for each question in response
                if(response[v]) result.data[v]++;
              });
            });
            break;
          default:
        }

        //call callback
        callback(result);
      });
    }
  };
});
