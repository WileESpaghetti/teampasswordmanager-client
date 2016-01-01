var TeamPasswordManager = require('../index');
describe("Given a string to search for", function() {
    it("should return 0 or more password", function(done) {
        var tpm = new TeamPasswordManager();
        var query = 'www.example.com';

        tpm.passwords(query, function(err, password) {
            expect(err).toBe(null);
            expect(password).not.toBe(null);

            expect(Array.isArray(password)).toBe(true);
            done();
        });
    });
});

describe("Given an invalid search term", function() {
    it("should return an empty array", function(done) {
        var tpm = new TeamPasswordManager();
        var query = 'this should never match anything';

        tpm.passwords(query, function(err, password) {
            expect(err).toBe(null);
            expect(password).not.toBe(null);

            expect(Array.isArray(password)).toBe(true);
            expect(password.length).toBe(0);
            done();
        });
    });
});
