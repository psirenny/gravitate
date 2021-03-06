var gravitate = require('..');
var should = require('chai').should();
var fixture = require('./fixture');

describe('gravitate', function () {
  it('should be an object', function () {
    gravitate.should.be.an('object');
  });

  describe('hash', function () {
    it('should be a function', function () {
      gravitate.hash.should.be.a('function');
    });

    it('should return an empty string', function () {
      var hash = gravitate.hash('');
      hash.should.be.a('string');
      hash.should.be.empty;
    });

    it('should hash an email', function () {
      var hash = gravitate.hash(fixture.email);
      hash.should.be.a('string');
      hash.should.eql(fixture.hash);
    });

    it('should ignore non-email', function () {
      var hash = gravitate.hash('foo');
      hash.should.be.a('string');
      hash.should.eql('foo');
    });

    it('should be case insensitive', function () {
      var hash = gravitate.hash(fixture.email.toUpperCase());
      hash.should.be.a('string');
      hash.should.eql(fixture.hash);
    });

    it('should trim whitespace', function () {
      var hash = gravitate.hash(' ' + fixture.email + ' ');
      hash.should.be.a('string');
      hash.should.eql(fixture.hash);
    });

    it('should ignore characters after "+" sign', function () {
      var hash = gravitate.hash(fixture.emailPlus);
      hash.should.be.a('string');
      hash.should.eql(fixture.hash);
    });

    it('should not ignore characters after "+" sign', function () {
      var hash = gravitate.hash(fixture.emailPlus, {ignorePlus: false});
      hash.should.be.a('string');
      hash.should.eql(fixture.hashPlus);
    });
  });

  describe('image', function () {
    it('should be an object', function () {
      gravitate.image.should.be.an('object');
    });

    describe('url', function () {
      it('should be a function', function () {
        gravitate.image.url.should.be.a('function');
      });

      it('should return an empty string', function () {
        var url = gravitate.image.url();
        url.should.be.a('string');
        url.should.be.empty;
      });

      it('should return a secure url', function () {
        var url = gravitate.image.url(fixture.email);
        url.should.eql(fixture.secureImageUrl);
      });

      it('should return an insecure url', function () {
        var url = gravitate.image.url(fixture.email, {secure: false});
        url.should.eql(fixture.imageUrl);
      });

      it ('should allow parameters', function () {
        var url = gravitate.image.url(fixture.email, fixture.parameters);
        url.should.eql(fixture.parameterizedImageUrl);
      });
    });
  });

  describe('profile', function () {
    it('should be an object', function () {
      gravitate.profile.should.be.an('object');
    });

    describe('data', function () {
      it('should be a function', function () {
        gravitate.profile.data.should.be.a('function');
      });

      it('should return an empty object', function (done) {
        gravitate.profile.data(fixture.email,
          function (err, data) {
            (err === null).should.be.true;
            data.should.be.an('object');
            data.should.be.empty;
            done();
          }
        );
      });

      it('should allow options', function (done) {
        gravitate.profile.data(fixture.email, {},
          function (err, data) {
            (err === null).should.be.true;
            data.should.be.an('object');
            data.should.be.empty;
            done();
          }
        );
      });

      it('should return profile data', function (done) {
        gravitate.profile.data(fixture.realProfileHash,
          function (err, data) {
            (err === null).should.be.true;
            data.should.be.an('object');
            data.should.not.be.empty;
            done();
          }
        );
      });
    });

    describe('url', function () {
      it('should be a function', function () {
        gravitate.profile.url.should.be.a('function');
      });

      it('should return an empty string', function () {
        var url = gravitate.profile.url();
        url.should.be.a('string');
        url.should.be.empty;
      });

      it('should return a secure url', function () {
        var url = gravitate.profile.url(fixture.email);
        url.should.eql(fixture.secureProfileUrl);
      });

      it('should return an insecure url', function () {
        var url = gravitate.profile.url(fixture.email, {secure: false});
        url.should.eql(fixture.profileUrl);
      });
    });
  });
});
