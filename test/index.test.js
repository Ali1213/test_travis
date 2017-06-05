const app = require('../index.js');
const supertest = require('supertest');
const should = require('should');

const request = supertest(app);

describe('test/index.test.js', function () {

  it('should return 55 when n = 10', function () {
    request
      .get('/fib')
      .query({ "n": 10 })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.text.should.equal('55');
      })
  });


  const testFib = function (n, statusCode, expect, done) {
    request.get('/fib')
      .query({ "n": n })
      .expect(statusCode)
      .end(function (err, res) {
        res.text.should.equal(expect);
        done(err);
      })
  }

  it('should equal 0 when n===0', function (done) {
    testFib(0, 200, '0', done);
  });

  it('should equal 1 when n===1', function (done) {
    testFib(1, 200, '1', done);
  });
  it('should throw when n>10', function (done) {
    testFib(11, 500, 'n should <= 10', done);
  });

  it('should throw when n<0', function (done) {
    testFib(-1, 500, 'n should >= 0', done);
  })

  it('should throw when n isnot Number', function (done) {
    testFib('呵呵', 500, 'n should be a Number', done);
  })

  it('should status 500 when error', function (done) {
    request.get('/fib')
      .query({ n: 100 })
      .expect(500)
      .end(function (err, res) {
        done(err);
      });
  });
});