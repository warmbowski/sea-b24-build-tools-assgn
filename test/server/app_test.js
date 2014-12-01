/*jshint expr: true*/
'use strict';
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

require('../../lib/server');
var port = process.env.PORT || 3000;
var url = 'http://localhost:' + port;

describe('Bad Libs! server testing', function() {

  it('should return index.html without error', function(done) {
    chai.request(url)
      .get('/')
      .end(function(err, res) {
        expect(err).to.be.null();
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.html;
        done();
      });
  });
});
