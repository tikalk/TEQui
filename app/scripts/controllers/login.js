'use strict';

angular.module('tikalTeqApp')
  .controller('LoginCtrl', function ($rootScope,$scope,repositoryService) {
   

   console.log("loginInfo");
    $rootScope.loginInfo = new loginInfo();
   //  $scope.TEQs = repositoryService.TEQs;
	  // $scope.entries = repositoryService.entries;
   
    $scope.isActive = function(token){
    	return token == "";
    }

    $scope.selectTEQ = function(){
    	// repositoryService.loadTEQs();
      repositoryService.loadTEQsForUser($scope.loginInfo);
    }
  });
