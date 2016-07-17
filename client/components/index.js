var angular = require('angular');
var ngRoute = require('angular-route');

var gallery = require('./gallery');

module.exports = angular.module('photoGallery', [
  ngRoute,
  gallery,
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
