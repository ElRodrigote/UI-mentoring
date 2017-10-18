'use strict';

// Define the `phonecatApp` module
var phonecatApp = angular.module('phonecatApp', ["ui.router"]);

//Define the router-ui configuration for states and views
phonecatApp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home",{
      url: "/",
      templateUrl: "partial-home.html"
    })

    .state("home.hotels",{
      url: "hotels",
      templateUrl: "partial-home-cards.html",
      controller: "HotelListController"
    })

    .state("home.hotel-selected", {
      url: "hotel-description",
      templateUrl: "partial-home-hotel.html",
      controller: "HotelListController"
    })
});

// Define the `PhoneListController` controller on the `phonecatApp` module
phonecatApp.controller('HotelListController', function HotelListController($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://192.168.5.106:3000/hotels/'
    }).then(function successCallback(response) {
      $scope.hotels = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });

    $scope.getElements = function(arg){
      return new Array(arg);
    }
});
