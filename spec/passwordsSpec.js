var TeamPasswordManager = require('../index');

describe("Passwords", function() {
	describe("null query", function() {
		var client = new TeamPasswordManager();
        it("should be an array", function(done) {
			client.passwords(function(err, passwords) {
				expect(err).toBe(null);
				expect(Array.isArray(passwords)).toBe(true);
				expect(passwords.length).toBeGreaterThan(0);
				done();
			});
		});
	});

	describe("id query", function() {
		describe("found", function() {
			var client = new TeamPasswordManager();
			it("should be a password object", function(done) {
				client.passwords(13, function(err, passwords) {
					expect(err).toBe(null);
					expect(Array.isArray(passwords)).toBe(false);

					expect(typeof passwords).toBe('object');
					done();
				});
			});
		});

		describe("not found", function() {
			var client = new TeamPasswordManager();
			it("should be an error object", function(done) {
				client.passwords(9999, function(err, passwords) {
					expect(err).not.toBe(null);
					expect(typeof err).toBe('object');
					expect(err.error).toBe(true);

					expect(passwords).toBe(null);
					done();
				});
			});
		});
	});

	describe("string query", function() {
		describe("found", function() {
			var client = new TeamPasswordManager();
			it("should be an array", function(done) {
				client.passwords('www', function(err, passwords) {
					expect(err).toBe(null);
					expect(Array.isArray(passwords)).toBe(true);
					expect(passwords.length).toBeGreaterThan(0);
					done();
				});
			});
		});
	});

	describe("not found", function() {
		var client = new TeamPasswordManager();
		it("should be an array", function(done) {
			client.passwords('not found', function(err, passwords) {
				expect(err).toBe(null);
				expect(Array.isArray(passwords)).toBe(true);
				expect(passwords.length).toBe(0);
				done();
			});
		});
	});
});

/*
TeamPasswordManager.passwords(function(err, passwords) {});
TeamPasswordManager.passwords(13,    function(err, passwords) {});
TeamPasswordManager.passwords('www', function(err, passwords) {});
TeamPasswordManager.passwords({concat: true}, function(err, passwords) {});
TeamPasswordManager.passwords({concat: true, search: 'www'}, function(err, passwords) {});
TeamPasswordManager.passwords({concat: true, access_info: 'www'}, function(err, passwords) {});
TeamPasswordManager.passwords({concat: true, search: 'www', access_info: 'ftp://'}, function(err, passwords) {});
// the above searches should also work if query = []
 */