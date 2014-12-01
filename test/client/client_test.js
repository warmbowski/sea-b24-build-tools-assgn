'use strict';
var expect = require('chai').expect;
var clientApp = require('../../app/js/app.js');

describe('some test', function() {
  it('should be true', function() {
    expect(true).to.eql(true);
  });

  it('should also be true', function() {
    expect(clientApp()).to.be.true();
  });
});
