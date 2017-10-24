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
      Rooms.populateHotels($scope.hotels);
    }, function errorCallback(response) {
      console.log(response);
  });

  //Rooms.populateHotels($scope.hotels);

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

  $scope.updateHotelRoom = function(){
    if($scope.hotel.rooms > 0){
      $scope.hotel.rooms -= 1;
    }else{
      alert("¡No hay más habitaciones disponibles!");
    }
  }

  $scope.getElements = function(arg){
    return new Array(arg);
  }

});

uiMentoring.service("Hotel", function($http, $stateParams){
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


/*uiMentoring.service("Rooms", function Rooms($http, $stateParams){
  var hotelRooms = {};
  hotelRooms.rooms = [];
  
  hotelRooms.populateHotels = function(hotelArray){
    hotelArray.forEach(function(hotel){
      hotelRooms.rooms.push({id: hotel.id, roomCount:hotel.rooms});  
    })
  };
  
  hotelRooms.setRooms = function(arg){
    console.log(arg);
    var found = hotelRooms.rooms.findIndex(hotel => hotel.id === arg.id);
    if( found != -1){
      hotelRooms.rooms[found].roomCount = arg.roomCount;
    }
  };

  hotelRooms.getRooms = function(){
    return hotelRooms.rooms;
  };

  hotelRooms.fetchRooms = function(hotelId){
    var found = hotelRooms.rooms.findIndex(hotel => hotel.id === hotelId);

    if(found != -1){
      return hotelRooms.rooms[found];
    }else{
      alert(" !");
    }
  };

  return hotelRooms;
});*/

