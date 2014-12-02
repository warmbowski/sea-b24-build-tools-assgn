'use strict';
var expect = require('chai').expect;
var weaveStory = require('../../client/js/app.js');

describe('Bad Libs! client testing', function() {

  var arr1 = ['<p>The ', ' in ', ' falls mainly in the ', '.</p>'];
  var arr2 = ['rain', 'Spain', 'plain'];
  var combined = weaveStory(arr1, arr2);

  it('should weave a story', function(done) {
    expect(combined.join('')).to.eql('<p>The <i>rain</i> in <i>Spain</i> falls mainly in the <i>plain</i>.</p><i></i>');
    done();
  });
});
