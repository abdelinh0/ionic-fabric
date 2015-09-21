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

.controller('MainCtrl', function($scope, $ionicPopover, $ionicPopup) {

  var width = window.innerWidth; // width of canvas
  var height = width * (4 / 3) // height of canvas

  var canvas = new fabric.Canvas('c');

  canvas.selection = false;
  fabric.Object.prototype.selectable = false; // prevent drawing objects to be draggable or clickable

  // sets canvas height and width
  canvas.setHeight(height);
  canvas.setWidth(width);
  // sets canvas height and width
  // *** having both canvas.setHeight and canvas.width prevents errors when saving
  canvas.width = width;
  canvas.height = height;

  canvas.isDrawingMode = false;
  canvas.freeDrawingBrush.width = 6; // size of the drawing brush
  $scope.brushcolor = '#000000'; // set brushcolor to black to begin

  // ** uncomment below to set a background image using a url **

  // canvas.setBackgroundImage('image-url-here', canvas.renderAll.bind(canvas), {
  //   height: height,
  //   width: width
  // });



  // drawing mode
  $scope.drawingMode = function() {
    // check if fabric is in drawing mode
    if (canvas.isDrawingMode == true) {
      // if fabric is in drawing mode, exit drawing mode
      $scope.showColorPaletteIcon = false; // hind color palette icon
      canvas.isDrawingMode = false;
    } else {
      // if fabric is not in drawing mode, enter drawing mode
      $scope.showColorPaletteIcon = true; // show color palette icon
      canvas.isDrawingMode = true;
    }
  }

  // color options popover
  $ionicPopover.fromTemplateUrl('views/colors.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openColorsPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closeColorsPopover = function() {
    $scope.popover.hide();
  };

  // list of colors
  $scope.colors = [
      {color: "#ecf0f1"},
      {color: "#95a5a6"},
      {color: "#bdc3c7"},
      {color: "#7f8c8d"},
      {color: "#000000"},
      {color: "#F1A9A0"},
      {color: "#D2527F"},
      {color: "#f1c40f"},
      {color: "#f39c12"},
      {color: "#e67e22"},
      {color: "#d35400"},
      {color: "#e74c3c"},
      {color: "#c0392b"},
      {color: "#6D4C41"},
      {color: "#3E2723"},
      {color: "#1abc9c"},
      {color: "#16a085"},
      {color: "#2ecc71"},
      {color: "#27ae60"},
      {color: "#3498db"},
      {color: "#2980b9"},
      {color: "#34495e"},
      {color: "#2c3e50"},
      {color: "#9b59b6"},
      {color: "#8e44ad"},
  ]

  $scope.changeBrushColor = function(color) {
    canvas.freeDrawingBrush.color = color;
    $scope.brushcolor = color; // used to change the color palatte icon's color
    $scope.popover.hide(); // hide popover
  }

  // undo last object, drawing or text
  $scope.undoLastObject = function() {
    var canvas_objects = canvas._objects;
    var last = canvas_objects[canvas_objects.length - 1];
    canvas.remove(last);
    canvas.renderAll();
  }

  $scope.addText = function() {
    // prevent user from being in drawing mode while adding text
    // this allows the user to manipulate the text object without drawing at the same time
    canvas.isDrawingMode = false; // exit drawing
    $scope.showColorPaletteIcon = false; // hide color palette icon

    $scope.data = {}

    // ionic popup used to prompt user to enter text
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.input">',
      title: 'Enter Text',
      subTitle: '',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Save</b>',
        type: 'button-stable',
        onTap: function(e) {
          if (!$scope.data.input) {
            e.preventDefault();
          } else {
            return $scope.data.input;
          }
        }
      }]
    });
    myPopup.then(function(input) {

      // fabric js
      var t = new fabric.Text(input, {
        left: (width / 3),
        top: 100,
        fontFamily: 'Helvetica',
        fill: $scope.brushcolor, // color
        selectable: true, // draggbale

      });
      canvas.add(t); // add text to fabric.js canvas

    });
  }

  $scope.saveDrawing = function() {
    // to save the drawing
    var drawing = canvas.toDataURL();

  }



})
