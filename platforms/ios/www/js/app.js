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
		when('/playground', {
			templateUrl: 'views/playground.html',
			controller:  'PlaygroundController'
		}).
		otherwise({
			//redirectTo: '/weather'
			redirectTo: '/playground'
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

weatherApp.controller('PlaygroundController', ['$scope', '$http', function($scope){
	$scope.alert = function(){
		navigator.notification.alert('You are the winner!', null, 'Game Over', 'Done');
	};

	$scope.confirm = function(){
		navigator.notification.confirm('You are the winner!', function(buttonIndex){
			console.log(buttonIndex);
		}, 'Game Over', ['Done', 'Cancel']);
	};

	$scope.prompt = function(){
		function onPrompt(results) {
			alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
		}

		navigator.notification.prompt(
			'Please enter your name',  // message
			onPrompt,                  // callback to invoke
			'Registration',            // title
			['Ok','Exit'],             // buttonLabels
			'Jane Doe'                 // defaultText
		);
	};

	$scope.beep = function(){
		navigator.notification.beep(2);
	};

	$scope.getlocation = function(){
		navigator.geolocation.getCurrentPosition(
		function(position) {
			alert(position.coords.latitude + ',' + position.coords.longitude);
		},
		function() {
			alert('Error getting location');
		});
	};

	$scope.takephoto = function(){
		var options =   {   quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 0,      // 0:Photo Library, 1=Camera, 2=Saved Album
			encodingType: 0     // 0=JPG 1=PNG
		};

		navigator.camera.getPicture(
		function(imageData) {
			document.getElementById('imagepreview').src = "data:image/jpeg;base64," + imageData;
		},
		function() {
			alert('Error taking picture', 'Error');
		},
		options);
	};
}]);