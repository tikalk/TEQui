'use strict';

angular.module('tikalTeqApp')
  .controller('teqsCtrl', function ($rootScope,$scope,$location,repositoryService) {
    if (!$rootScope.loginInfo)
      $location.path("/");
     $scope.toggleLevelExperience = function(question,level){
      if (question.level == level)
        question.level = undefined;
      else
        question.level = level;
     }
     $scope.save = function(){
      repositoryService.save($rootScope.loginInfo);
     }
     $scope.print = function(){
      window.print();
     }
     $scope.selectTeq = function(teq){
      console.log("select tab ",teq);
       $scope.selectedTeq.active = false;
        $scope.selectedTeq = teq;
        $scope.selectedTeq.active = true; 
     }
     repositoryService.loadTEQsForUser($rootScope.loginInfo).then(
      function(teqs){
        
        for (var i=0;i<$rootScope.loginInfo.teqs.length;i++){
         $rootScope.loginInfo.teqs[i].active = false;
        }
        $scope.selectedTeq = $rootScope.loginInfo.teqs[0];
        $scope.teqs = $rootScope.loginInfo.teqs;
        $scope.selectedTeq.active = true;
        console.log($scope.selectedTeq);
        },
      function(err){},
      function(update){});
    
    
  });
