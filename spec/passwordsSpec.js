describe("A suite", function() {
	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
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