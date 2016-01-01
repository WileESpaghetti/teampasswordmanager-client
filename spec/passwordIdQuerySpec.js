var TeamPasswordManager = require('../index');
describe("Given a valid password ID", function() {
    it("should return a password", function(done) {
        var tpm = new TeamPasswordManager();
        var validId = 13;

        tpm.passwords(validId, function(err, password) {
            expect(err).toBe(null);
            expect(password).not.toBe(null);

            expect(typeof password).toBe('object');
            expect(Array.isArray(password)).toBe(false);
            context('', function(){});
            expect(password.id).toBe(validId);
            done();
        });
    });
});

describe("Given an invalid password ID", function() {
    it("should return a 'Not Found' error instead of a password", function(done) {
        var tpm = new TeamPasswordManager();
        var invalidId = 214000;

        tpm.passwords(invalidId, function(err, password) {
            expect(err).not.toBe(null);
            expect(typeof err).toBe('object');

            expect(err.error).toBe(true);
            expect(err.type).toBe('Not Found');
            expect(err.message).toBeTruthy();

            expect(password).toBe(null);
            done();
        });
    });
});
