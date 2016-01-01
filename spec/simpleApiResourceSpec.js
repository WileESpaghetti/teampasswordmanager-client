var SimpleApiResource = require('../lib/simple-api-resource');

describe("A SimpleApiResource", function() {
    var resource;

    describe('given a valid resource path', function() {
        beforeEach(function() {
            resource = new SimpleApiResource({
                resource: 'version'
            });
        });

        it('an API resource', function(done) {
            resource.get(function(err, result) {
                expect(err).toBe(null);
                expect(result).not.toBe(null);
                expect(typeof result).toBe('object');
                done();
            });
        });
    });

    describe('given an invalid resource path', function() {
        beforeEach(function() {
            resource = new SimpleApiResource({
                resource: 'notValidResouce'
            });
        });

        it('should return an error', function(done) {
            resource.get(function(err, result) {
                console.log(err);
                console.log(result);
                expect(err).not.toBe(null);
                expect(result).toBe(null);
                done();
            });
        });
    });
});
