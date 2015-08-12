'use strict';

/**
 * @ngdoc function
 * @name repoWebdevForInfoDanielrodriguezeuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the repoWebdevForInfoDanielrodriguezeuApp
 */
angular.module('repoWebdevForInfoDanielrodriguezeuApp')
    .controller('MainCtrl', function($scope, $http) {
// there are 'On time' and 'X minutes late'
    	// hour demo for a easy test. Change for test
    	var currentHour    = new Date("August 12, 2015 15:35:00");
    	$scope.currentHour = currentHour.getHours() + ':' + currentHour.getMinutes();
    	// get model
        $http.get('model/ldb.json')
            .then(function(res) {
                $scope.model = res.data;
                console.log($scope.model);
                // change the grid height if we are different stops
                $scope.numbersStops = { 'height' : 100/$scope.model.callingPoints.length + '%' };
            });

        $scope.gridHeight = { 'height' : document.body.clientHeight - 50 + 'px' };

    });