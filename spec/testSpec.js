'use strict';
const index = require('../dist/index.js');

describe('test jasmine', function() {
  it('expect triue to be true', function(done) {
    expect(true).toBe(true);
    done();
  });
});