/**
 * As an API user
 * I want to authenticate
 * So that I can make API calls
 */
describe("As an unauthenticated API user", function() {
	describe("when given a valid TeamPasswordManager URL", function() {
		describe("I want to authenticate", function() {
			describe("using HTTP Basic Authentication", function() {
				describe("and valid credentials", function() {

					it("should be able to connect", function() {
						expect(true).toBe(false);
					});

					it("should be able to make API calls", function() {
					});

				});

				describe("and invalid credentials", function() {

				});
			});
		});
	});
});
