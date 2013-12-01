'use strict';
function TEQ(name,subjects){this.name = name;this.subjects=subjects} 
TEQ.prototype.name;
TEQ.prototype.subjects = new Object();

function TEQ_subject(name,domains){this.name=name;this.domains=domains} 
TEQ_subject.prototype.name;
TEQ_subject.prototype.domains = [];

function TEQ_domain(name,questions){this.name=name;this.questions=questions} 
TEQ_domain.prototype.questions = [];
TEQ_domain.options = ['Basic','Developer','Expert'];


function loginInfo(){ }
loginInfo.prototype.firstName;
loginInfo.prototype.lastName;
loginInfo.prototype.date =formatDate(new Date());

function formatDate(d)
{
    var month = d.getMonth();
    var day = d.getDate();
    month = month + 1;

    month = month + "";

    if (month.length == 1)
    {
        month = "0" + month;
    }

    day = day + "";

    if (day.length == 1)
    {
        day = "0" + day;
    }

    return month + '-' + day + '-' + d.getFullYear();
}

function mainCtrl($scope,$route){
    
    
    $scope.activeTab = function(){
      
      console.log($route.current.originalPath)
      return $route.current.originalPath;
      
    } 
  }

angular.module('tikalTeqApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute','ui.bootstrap'
])
  .config(function ($routeProvider) {
    // $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
       .when('/builder', {
        templateUrl: 'views/builder.html',
        controller: 'BuilderCtrl'
      })
       .when('/teqs', {
        templateUrl: 'views/teqs.html',
        controller: 'teqsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).service("repositoryService",function($q){
    var self = this;
    
    this.loadDomains = function(){
      var domains = $q.defer();
      var _domains =  JSON.parse(localStorage.getItem("TEQ_domains"));
      domains.resolve(_domains);
      return domains.promise;
     
    }
  
  this.save = function(loginInfo){
     var key = "TEQ-"+loginInfo.firstName+"-"+loginInfo.lastName;

     console.log("save",loginInfo);  
     localStorage.setItem(key, JSON.stringify(loginInfo)) ;

  }

this.loadTEQsForUser = function(loginInfo){
   

      self.loadDomains().then(
        function(domains){ 
          console.log("loadTEQs.....loginInfo");
          var _TEQs = JSON.parse(localStorage.getItem("TEQs"));
          var oldInfo =  JSON.parse(localStorage.getItem("TEQ-"+loginInfo.firstName+"-"+loginInfo.lastName));

          console.log("oldInfo",oldInfo);
          if (oldInfo && oldInfo["teqs"])
          {
            console.log("FOUND oldInfo teqs" ,oldInfo);
            loginInfo["teqs"] = oldInfo["teqs"];
          }
          else {
          loginInfo["teqs"] = [];
          for (var i=0;i<_TEQs.length;i++){
           var currentTeq = _TEQs[i];
           var teq = new TEQ(currentTeq.name,[]);
           loginInfo["teqs"].push(teq);
           
           for (var j=0;j<_TEQs[i].subjects.length;j++){
            var _subject = _TEQs[i].subjects[j];
            var subject = new TEQ_subject(currentTeq.subjects[j].name,[]);
            teq.subjects.push(subject);
            console.log(subject);
           
              for (var e=0;e<_subject.domains.length;e++){
                var _domain = domains[_subject.domains[e]];
                var domain = new TEQ_domain(_domain.name,[]);
                
                subject.domains.push(domain);
                
               
                console.log(subject.domains);
                
                for (var qIndex = 0 ;qIndex<_domain.questions.length;qIndex++){
                  var questionObj = new Object();
                  console.log(qIndex,subject.name);
                  questionObj["txt"] = _domain.questions[qIndex];
                  questionObj["level"];
                  questionObj["years"]=0;

                  console.log(questionObj);
                  domain.questions.push(questionObj);
                 
                } 
              }
            }
          }
        }
          console.log("loginInfo", loginInfo);
         TEQs.resolve(_TEQs);
        },
        function(err){},
        function(update){});
      var TEQs = $q.defer();
    
      return TEQs.promise;
      
    }
    this.init = function(){

      var TEQ_domains = new Object();
      TEQ_domains['Java Language'] = new TEQ_domain('Java Language' , ['Developing Java Classes','Using threads']);
      TEQ_domains['Database'] = new TEQ_domain('Database',
        ['SQL',
        'Designing Database Schema',
        'Creating ERD','Writing SQL Statements',
        'Implementing Data Access Classes',
        'Optimization and Tuning  (Please Specify Database)']);
      TEQ_domains['BigData'] = new TEQ_domain('BigData',
        ['NoSQL Database (MongoDB, CouchDB, Cassandra, Redis, BigTable, HBase)',
        'MapReduce (Hadoop, Hive)',
        'Servers (EC2, GAE)',
        'Processing (Solr/Lucene, ElasticSearch)']);

      var TEQs = [];
      var TEQ_subjects = [];
      var TEQ_subjectsGeneral = new TEQ_subject('General',['Java Language','Database'])
      var TEQ_subjectsTest = new TEQ_subject('Test',['BigData'])
	  var TEQ_subjectsDevOps = new TEQ_subject('DevOps',['BigData'])
      TEQs.push(new TEQ('JAVA',[TEQ_subjectsGeneral,TEQ_subjectsTest]))
      TEQs.push(new TEQ('JAVA Script',[TEQ_subjectsTest]))
      TEQs.push(new TEQ('.NET',[TEQ_subjectsTest]))
	  TEQs.push(new TEQ('DevOps',[TEQ_subjectsDevOps]))
      console.log(TEQs,TEQ_subjects);
      localStorage.setItem('TEQ_domains',JSON.stringify(TEQ_domains));
      localStorage.setItem('TEQs',JSON.stringify(TEQs));

    }

  }) 

  ;

  