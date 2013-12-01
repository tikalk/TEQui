'use strict';

angular.module('tikalTeqApp')
  .controller('BuilderCtrl', function ($rootScope,$scope,repositoryService) {
   

   console.log("BuilderCtrl");
   
   
    $scope.build = function(){
    	repositoryService.init();
    }

   
  });
