'use strict';
var $ = require('jquery');
var _ = require('underscore');
var storyArray;

$('#story-list-form').submit(function(event) {
  //retrieve selected story and corresponding word list
  event.preventDefault();
  var storySelected = $('input[name=story]:checked', '#story-list-form').val();

  $('#story-list').hide();

  $.ajax({
    type: 'POST',
    url: '/',
    data: {storyChoice: storySelected},
    success: function(data) {
      //create form for word type responses
      storyArray = data.storyArray;
      var formInputs = '<table>';
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
  var storyCombined = $.map(storyArray, function(v, i) {
    return [v, '<i>' + (formValues[i] || '') + '</i>'];
  });
  $('#word-query').hide();
  $('#completed-story').append(storyCombined.join(''));
});
