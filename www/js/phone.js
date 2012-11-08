
var pictureSource;   // picture source
var destinationType; // sets the format of returned value .

// Cordova is ready to be used!
//
function onDeviceReady() {
	console.log('device ready!');
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}



// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64 encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI 
  // console.log(imageURI);

  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  window.takeStashPicture(onPhotoDataSuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}

//  upload
function getImage() {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto, function(message) {
		alert('get picture failed');
	},{
		quality: 50, 
		destinationType: navigator.camera.DestinationType.FILE_URI,
		sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
	}
        );

    }

    function uploadPhoto(imageURI) {
        var options = new FileUploadOptions();
        options.fileKey = "displayImage";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        var params = new Object();
        params.origin = "app";

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://mustachemonitor.com/upload", win, fail, options);
    }

    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        alert(r.response);
    }

    function fail(error) {
        alert("An error has occurred: Code = " = error.code);
    }



function logoutUser() {

  $.ajax({
      url: 'http://mustachemonitor.com/user/logout',
      type: "GET", // TODO: POST
      cache: false,
      //data: '',
      //contentType: "application/json; charset=utf-8",
      //complete: function() {},
      success: function(data) {
          // Success

          // $('#screenName').val('');
          $('#password').val('');
          $.mobile.changePage( $('#loading-page') );

          return true;
      },
      error: function() {
              
        $('<div>').simpledialog2({
          mode: 'blank',
          headerText: 'Logout Error',
          headerClose: true,
          blankContent : 
            "<ul data-role='listview'><li>An error occurred while logging out.</li></ul>"+
            "<a rel='close' data-role='button' href='#'>OK</a>"
        });

        return false;
    }
  });

}
window.takeStashPicture = function(successCallback, errorCallback, options) {
    options = options || {};
    // successCallback required
    if (typeof successCallback != "function") {
        console.log("Camera Error: successCallback is not a function");
        return;
    }
    
    // errorCallback optional
    if (errorCallback && (typeof errorCallback != "function")) {
        console.log("Camera Error: errorCallback is not a function");
        return;
    }
    
    var quality = 50;
    if (typeof options.quality == "number") {
        quality = options.quality;
    } else if (typeof options.quality == "string") {
        var qlity = parseInt(options.quality, 10);
        if (isNaN(qlity) === false) {
            quality = qlity.valueOf();
        }
    }
    
    var destinationType = Camera.DestinationType.FILE_URI;
    if (typeof options.destinationType == "number") {
        destinationType = options.destinationType;
    }
    
    var sourceType = Camera.PictureSourceType.CAMERA;
    if (typeof options.sourceType == "number") {
        sourceType = options.sourceType;
    }
    
    var targetWidth = -1;
    if (typeof options.targetWidth == "number") {
        targetWidth = options.targetWidth;
    } else if (typeof options.targetWidth == "string") {
        var width = parseInt(options.targetWidth, 10);
        if (isNaN(width) === false) {
            targetWidth = width.valueOf();
        }
    }
    
    var targetHeight = -1;
    if (typeof options.targetHeight == "number") {
        targetHeight = options.targetHeight;
    } else if (typeof options.targetHeight == "string") {
        var height = parseInt(options.targetHeight, 10);
        if (isNaN(height) === false) {
            targetHeight = height.valueOf();
        }
    }
    
    var encodingType = Camera.EncodingType.JPEG;
    if (typeof options.encodingType == "number") {
        encodingType = options.encodingType;
    }
    
    var mediaType = Camera.MediaType.PICTURE;
    if (typeof options.mediaType == "number") {
        mediaType = options.mediaType;
    }
    var allowEdit = false;
    if (typeof options.allowEdit == "boolean") {
        allowEdit = options.allowEdit;
    } else if (typeof options.allowEdit == "number") {
        allowEdit = options.allowEdit <= 0 ? false : true;
    }
    var correctOrientation = false;
    if (typeof options.correctOrientation == "boolean") {
        correctOrientation = options.correctOrientation;
    } else if (typeof options.correctOrientation == "number") {
        correctOrientation = options.correctOrientation <=0 ? false : true;
    }
    var saveToPhotoAlbum = false;
    if (typeof options.saveToPhotoAlbum == "boolean") {
        saveToPhotoAlbum = options.saveToPhotoAlbum;
    } else if (typeof options.saveToPhotoAlbum == "number") {
        saveToPhotoAlbum = options.saveToPhotoAlbum <=0 ? false : true;
    }
    var popoverOptions = null;
    if (typeof options.popoverOptions == "object") {
        popoverOptions = options.popoverOptions;
    }
    
    var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
                mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, popoverOptions];
    
    cordova.exec(successCallback, errorCallback, "StacheCam", "takePicture", args);
};