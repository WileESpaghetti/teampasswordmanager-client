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
                expect(Array.isArray(result)).toBe(false);
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
                expect(err).not.toBe(null);
                expect(Array.isArray(err)).toBe(false);
                expect(typeof err).toBe('object');
                expect(err.error).toBe(true);

                expect(result).toBe(null);

                done();
            });
        });
    });
});
