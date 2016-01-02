var tpmConfig = require('../lib/config');

describe("TeamPasswordManager Configuration", function() {
	describe("Using an unsupported API version", function() {
		it("contains spec with an expectation", function() {
			tpmConfig();
			expect(true).toBe(true);
		});
	});

	describe("Using a self signed certificate", function() {
	});

	describe("authentication type", function() {
		// not specifying an auth type should ddefault to HTTP Basic
		// using an unsupported auth type (HHMAC, etc.)
	});

	describe("Using an invalid certificate", function() {
		// FIXME stuf
		// FIXME revoked, weak, wrong domain, other SSL defeciencies
	});

});