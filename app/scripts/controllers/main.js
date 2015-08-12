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
                $scope.numbersStops = { 'height' : 100 / $scope.model.callingPoints.length + '%' };
                // minutes late for each stop
                $scope.scheduled = new Array();
                $scope.expected  = new Array();
                $scope.late      = new Array();
                $scope.atTime    = new Array();
                for (var i = 0; i < $scope.model.callingPoints.length; i ++) {
                	// ["15","50"]
                	$scope.expected[i]  = $scope.model.callingPoints[i].expected.split(':');
                	// ["15","41"]
                	$scope.scheduled[i] = $scope.model.callingPoints[i].scheduled.split(':');
                	var hourLate    = $scope.expected[i][0] - $scope.scheduled[i][0];
                	var minutesLate = $scope.expected[i][1] - $scope.scheduled[i][1];

                	

                	if (minutesLate < 0) {
            			hourLate    = hourLate - 1;
            			minutesLate = 60 + minutesLate;
	           		}

	           		// at time
	           		if (hourLate === 0 && minutesLate === 0) {
	           			$scope.atTime[i] = true;
	           		}




                	$scope.late[i]  = hourLate + ' ' + minutesLate;
                	console.log($scope.late[i]);
                }
            });

        $scope.gridHeight = { 'height' : document.body.clientHeight - 50 + 'px' };

    });