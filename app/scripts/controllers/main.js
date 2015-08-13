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
    	$scope.gridHeight = { 'height' : document.body.clientHeight - 70 + 'px' };

    	// hour demo for a easy test. Change for test
    	var currentHour = new Date("August 12, 2015 15:40:00");
    	if (currentHour.getMinutes() < 10) {
    		var minutes = '0' + currentHour.getMinutes();
    	} else {
    		var minutes = currentHour.getMinutes();
    	}
    	// 15:35
    	$scope.currentHour = currentHour.getHours() + ':' + minutes;
    	// ['15','35'] for get the train position
    	var hourMinutes    = $scope.currentHour.split(':');
    	hourMinutes        = hourMinutes[0]*60 + hourMinutes[1];
     	// get model
        $http.get('scripts/model/ldb.json')
            .then(function(res) {
                $scope.model = res.data;
                // change the grid height if we are different stops
                $scope.numbersStops = { 'height' : 100 / $scope.model.callingPoints.length + '%' };
                // minutes late for each stop
                $scope.scheduled = new Array();
                $scope.expected  = new Array();
                $scope.late      = new Array();
                $scope.onTime    = new Array();
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

	           		// if train comes early
	           		if (hourLate < 0) {
	           			// on time
           				$scope.onTime[i] = true;
	           		}

	           		if (hourLate === 0) {
	           			hourLate = '';
	           			if (minutesLate === 0) {
	           				// on time
	           				$scope.onTime[i] = true;
	           			}
	           		} else {
           				hourLate = hourLate + ' hr ';
	           		}
	           		if (minutesLate > 0) {
           				// at time
           				minutesLate = minutesLate + ' min';
           			}

                	$scope.late[i]  = hourLate + ' ' + minutesLate;

                	// calculate the train position
            		var hourMinutesExpected = $scope.expected[i][0]*60 + $scope.expected[i][1];
            		if (hourMinutes == hourMinutesExpected) {
            			$scope.train = {
            				state: 'stopped',
            				stop: i
            			};
            		}
            		if (hourMinutes > hourMinutesExpected) {
            			$scope.train = {
            				state: 'moving',
            				stop: i
            			};
            		}

                }
                // Train position
                var rowHeight  = parseInt($scope.gridHeight.height) / $scope.model.callingPoints.length;
                var stopHeight = rowHeight * $scope.train.stop - 6;
                if ($scope.train.state === 'moving') {
                	console.log('move');
                	stopHeight = stopHeight + rowHeight / 2;
                }
            	$scope.trainPos = {
            		'top': stopHeight + 70 + 'px',
            		'left': '150px'
            	};
            });
    });