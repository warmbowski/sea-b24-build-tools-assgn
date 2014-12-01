'use strict';
var $ = require('jquery');
var _ = require('underscore-contrib');
var storyArray;

$("#story-list-form").submit(function(event) {
  //retrieve selected story and corresponding word list
  event.preventDefault();
  var storySelected = $('input[name=story]:checked', '#story-list-form').val();

  $('#story-list').hide();

  $.ajax({
    type: 'POST',
    url: '/',
    data: {storyChoice: storySelected},
    success: function(data) {
      //create form for responses
      var formInputs = '<table>';
      storyArray = data.storyArray;
      data.fillInArray.forEach(function(item) {
        var formItem = '<tr><td>' + item + '</td><td><input type="text" name="item" /></td></tr>';
        formInputs += formItem;
      });
      formInputs += '</table><input type="submit" value="Submit" onsubmit="submitAnswers(this)" />';
      $('#word-query-form').append(formInputs);
    }
  });
});

$('#word-query-form').submit(function(event) {
  //build completed story and display
  event.preventDefault();
  var formValues = _.pluck($('#word-query-form').serializeArray(), 'value');
  storyArray = _.weave(storyArray, formValues);
  console.log(storyArray);
  
});
