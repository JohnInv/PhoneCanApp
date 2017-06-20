(function(){
  'use strict';

  var app = angular.module('phonecatApp', ['ngRoute' , 'ngAnimate']);

  app.config(['$routeProvider' , function($routeProvider){
      $routeProvider
        .when('/',{
          templateUrl : 'template/home.html',
          controllerAs : 'PhoneListCtrl'
        })
        .when('/phones/:phoneId',{
          templateUrl : 'template/phone-detail.html',
          controller : 'PhoneDetailCtrl'
        })
        .otherwise({
          redirectTo : '/'
        })
  }])

  app.directive('phoneList' , function(){
    return {
      restrict : 'E',
      templateUrl: 'template/phone-list.html',
      controller : function($scope , $http){
        $scope.phones = [];

      $http.get('phones/phones.json').success(function(data){
        $scope.phones = data;
      });

      $scope.filterCheck = function(phone ){
        return phone.name && phone.imageUrl;
      };

      },
      controllerAs : 'PhoneListCtrl'
    };
  });


  app.controller('PhoneDetailCtrl' , ['$scope' , '$http' , '$location' , '$routeParams' , function($scope , $http , $location , $routeParams){
    $scope.phoneId = $routeParams.phoneId;
    var url = 'phones/' + $routeParams.phoneId + '.json';

    $http.get(url).success(function(data){
      $scope.phone = data;
      $scope.mainImage = $scope.phone.images[0];
    });

    $scope.setImage = function(img){
      $scope.mainImage = img;
    }

  }])


  app.filter('checkStatus' , function(){
    return function(input){
      return input ? 'Yes' : 'No';
    }
  })

})();
