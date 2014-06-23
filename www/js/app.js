document.addEventListener('deviceready', function(){
	console.log('Device Ready!');
});

weatherApp = angular.module('WeatherApp', ['ngRoute']);

weatherApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/weather', {
			templateUrl: 'views/weather.html',
			controller:  'WeatherController'
		}).
		otherwise({
			redirectTo: '/weather'
		});
}]);

weatherApp.controller('WeatherController', ['$scope', '$http', function($scope, $http){
	$scope.ready = false;

	apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY';

	$http({
		url: apiUrl,
		method: 'GET'
	}).success(function(data, status, headers, config) {
		console.log(data);
		$scope.ready = true;
		$scope.degree = parseInt(data.main.temp - 273.15);
		$scope.weather = data.weather[0];
	});
}]);