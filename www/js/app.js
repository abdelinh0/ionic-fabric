// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope) {

  var width = window.innerWidth;
  var height = window.innerHeight;

  $scope.width = width;
  $scope.height = height;

  var canvas = new fabric.Canvas('c');

  canvas.selection = false;
  fabric.Object.prototype.selectable = false;

  canvas.setHeight(height);
  canvas.setWidth(width);

  canvas.width = width;
  canvas.height = height;

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 6;

  $scope.colors = [
    {color: "#e74c3c"},
    {color: "#2980b9"},
  ]

  $scope.changeColor = function(color) {
    canvas.freeDrawingBrush.color = color;
  }

  $scope.undo = function() {
    var canvas_objects = canvas._objects;
    var last = canvas_objects[canvas_objects.length - 1];
    canvas.remove(last);
    canvas.renderAll();
  }

})
