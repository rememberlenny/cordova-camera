var CameraApp = function(){
  var self = this;
  this.pictureSource;   // picture source
  this.destinationType; // sets the format of returned value

  // Wait for device API libraries to load
  document.addEventListener("deviceready", self.onDeviceReady,false);
};


// device APIs are available
//
CameraApp.prototype.onDeviceReady = function () {
    this.pictureSource    = navigator.camera.PictureSourceType;
    this.destinationType  = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
CameraApp.prototype.onPhotoDataSuccess = function(imageData) {
  // Uncomment to view the base64-encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
CameraApp.prototype.onPhotoURISuccess = function(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The in-line CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
CameraApp.prototype.capturePhoto = function() {
  var self = this;
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(self.onPhotoDataSuccess, self.onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
CameraApp.prototype.capturePhotoEdit = function() {
  var self = this;
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(self.onPhotoDataSuccess, self.onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
CameraApp.prototype.getPhoto = function(source) {
  var self = this;
  // Retrieve image file location from specified source
  navigator.camera.getPicture(self.onPhotoURISuccess, self.onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Called if something bad happens.
//
CameraApp.prototype.onFail = function(message) {
  setTimeout(function(){
    alert('Failed because: ' + message);
  }, 0);
}

