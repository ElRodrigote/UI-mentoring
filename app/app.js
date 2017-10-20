'use strict';

// Define the `phonecatApp` module
var uiMentoring = angular.module('ui-mentoring', ["ui.router","ngDialog"]);

//Define the router-ui configuration for states and views
uiMentoring.config(function($stateProvider, $urlRouterProvider){
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
  });

// Define the `PhoneListController` controller on the `phonecatApp` module
uiMentoring.controller('HotelListController', function HotelListController($scope, $http, ngDialog, Hotel) {
  $http({
    method: 'GET',
    url: 'http://192.168.5.106:3000/hotels/'
    }).then(function successCallback(response) {
      $scope.hotels = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });

    $scope.hotelDialog = function(hotel){
      Hotel.setHotelId(hotel.id);
      ngDialog.open({
        template: "partial-home-hotel.html",
        className: "ngdialog-theme-default",
        closeByEscape: true,
        showClose: false
      });
    };

    $scope.getElements = function(arg){
      return new Array(arg);
    }
});

uiMentoring.controller("HotelModuleController", function ($scope, $http, Hotel){
  $http({
    method: 'GET',
    url: 'http://192.168.5.106:3000/hotels/' + Hotel.getHotelId()
    }).then(function successCallback(response) {
      $scope.hotel = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  });

uiMentoring.service("Hotel", function($http, $rootScope, $stateParams){
  var hotel = {};
  hotel.id = "";

  hotel.setHotelId = function(arg){
    hotel.id = arg;
  }

  hotel.getHotelId = function(){
    return hotel.id;
  }

  return hotel;
});

