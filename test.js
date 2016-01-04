var rc = require('rc');
var paged = require('./lib/paginated-api-resource');
var pathed = require('./lib/pathed-api-resource');
var simple = require('./lib/simple-api-resource');

//new pathed({resource: 'passwords'}).get(function(err, version) {
//    console.log(err);
//    console.log(version);
//});
//new pathed({resource: 'passwords'}).get(13, function(err, version) {
//    console.log(err);
//    console.log(version);
//});
//new pathed({resource: 'passwords'}).get('13', function(err, version) {
//    console.log(err);
//    console.log(version);
//});
//new pathed({resource: 'passwords'}).get('search/access:http://www', function(err, version) {
//    console.log(err);
//    console.log(version);
//});
// TODO single page
//new paged({resource: 'passwords'}).count.get(function(err, version) {
//    console.log(err);
//    console.log(version);
//});
//new paged({resource: 'passwords'}).get(function(err, version) {
//    console.log(err);
//    console.log(version);
//});
//new paged({resource: 'passwords'}).get({}, function(err, version) {
//    console.log(err);
//    console.log(version);
//});
//new paged({resource: 'passwords'}).get({concat: false}, function(err, version) {
//    console.log(err);
//    console.log(version.length);
//});
//new paged({resource: 'passwords'}).get({concat: true}, function(err, version) {
//    console.log(err);
//    console.log(version.length);
//});
new paged({resource: 'passwords'}).get({concat: true, path: 'page1'}, function(err, version) {
    // FIXME path is ignored
    console.log(err);
    console.log(version.length);
});
