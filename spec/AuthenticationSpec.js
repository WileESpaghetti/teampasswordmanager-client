var request = require('request');

/**
 * As an API user
 * I want to authenticate
 * So that I can make API calls
 */
describe("As an unauthenticated API user", function() {
	describe("given a valid TeamPasswordManager URL", function() {
		it("is formatted correctly", function(){
			expect(config.baseUrl).toBeTruthy();
			expect(typeof config.baseUrl).toBe('string'); // FIXME I think this is an incomplete way to detect strings
		});

		describe('when I am able to connect', function() {
			it("responds to HTTP requests", function(done) {
				var config = {baseUrl: 'asdf'};
				done();
			});

			describe("I want to authenticate", function() {
				describe("using HTTP Basic Authentication", function() {
					describe("and valid credentials", function() {

						it("should be able to connect", function() {
						});

						it("should be able to make API calls", function() {
						});

					});

					describe("and invalid credentials", function() {

					});
				});

				describe("Using some other authentication type", function() {
					// not supported
				});
			});
		});

		describe('when I am able to connect', function() {}); // should this be moved under invalid URL?

	});

	describe("given an invalid TeamPasswordManager URL", function() {
		describe("no baseUrl not specified", function() {});
	});
});
