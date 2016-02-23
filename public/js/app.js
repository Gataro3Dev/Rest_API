var app = angular.module('miApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'mainCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'authCtrl'
  })
  .when('/registro', {
    templateUrl: 'views/registro.html',
    controller: 'authCtrl'
  })

  .otherwise({ redirectTo: '/' })

  $locationProvider.html5Mode(true);
});

app.controller('mainCtrl', function($scope){
  $scope.posts = [];
  $scope.newPost = {creado_por: '', texto:'', creado_el:''};

  $scope.post = function(){
    $scope.newPost.creado_el = Date.now();
    $scope.posts.push($scope.newPost);
    $scope.newPost = {creado_por:'', texto:'', creado_el:''}
  };
})
