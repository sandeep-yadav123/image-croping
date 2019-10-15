(function () {
    var photoUtil = {};
    window.photoUtil = photoUtil;
    var URL = window.URL || window.webkitURL;
    var _sourceId = "document_img";
    var cropperRef = null;
    var image = null;
    var _originalImageSrc = null;
    var cropper = null;
    var currentZoom = 0;
    var maxZoom = 0.5;
    var zoomStep = maxZoom / 100;
    var currentRotation = 0;
    var maxRotation = 360;
    var rotationStep = 1;

    var uploadedImageType = 'image/jpeg';
    var uploadedImageName = 'cropped.jpg';
    var uploadedImageURL="";
  var options = {
    aspectRatio: 16 / 9,
    preview: '.img-preview',
    ready: function (e) {
      console.log(e.type);
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      var data = e.detail;
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    }
  };
    photoUtil.init = function (imageid) {
        
        const defSourceId = _sourceId;
        _sourceId = imageid || _sourceId;
        // is element present 
        image = document.getElementById(_sourceId);

        if (!image) {
            throw new Error("Image source not found. Check the ID provided");
        }

        _originalImageSrc = image.getAttribute("src");
        console.log(_originalImageSrc);
        // 
        cropper = new Cropper(image, {
             aspectRatio: 1 / 1,
            minCropBoxWidth: 30,
            minCropBoxHeight: 30,
            viewMode: 0,
            responsive: true,
            dragMode: "move",
            modal: false,
            minContainerWidth: 860,   //decides the size of image
            minContainerHeight: 400,  //decides the size of image
            //autoCropArea: 1,
            toggleDragModeOnDblclick: true,
            preview:'.img-preview',
            crop: function(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
            },
            ready: function (event) {
                photoUtil.disableCrop();
                photoUtil.cropper = cropper;

                //Add Max and Min
                var imageData = photoUtil.cropper.getImageData();
                var minSliderZoom = imageData.width / imageData.naturalWidth;
                $("#zoomRange").slider('option','max',100);
                $("#zoomRange").slider('option','min', minSliderZoom.toFixed(1));
                $("#zoomRange").slider("setValue",parseFloat(minSliderZoom.toFixed(1)));
            }
        });
    };

    photoUtil.enableCrop = function () {
        // cropper.dragBox.hidden = false
        cropper.cropBox.hidden = true;
    };
    photoUtil.disableCrop = function () {
        // cropper.dragBox.hidden = true
        cropper.cropBox.hidden = false
    };
    photoUtil.zoomUp = function (val) {
        var newZoom = currentZoom + zoomStep / val;
        console.log("zoomUp" +newZoom.toFixed(4));
      //  console.log("maxZoom" +zoomStep);
        if (zoomStep < maxZoom) {
            cropper.zoom(newZoom.toFixed(4));
            currentZoom = newZoom;
        }
    };
    photoUtil.zoomDown = function (val) {
        var newZoom = currentZoom - zoomStep / val;
        console.log("zoomDown" +newZoom.toFixed(4));
        if (newZoom >= 0) {
            cropper.zoom("-"+newZoom.toFixed(4));
            currentZoom = newZoom;
        }
    };
    photoUtil.currentZoom = currentZoom;
    photoUtil.rotateRight = function (val) {
        currentRotation = (val + rotationStep) % 360;
        cropper.rotate(currentRotation);
    };
    photoUtil.rotateLeft = function (val) {
        currentRotation = (val - rotationStep) % 360;
        cropper.rotate(currentRotation);
    };
    photoUtil.changeImage = function(){
        var inputImage = document.getElementById('inputImage');
        if (URL){
        inputImage.onchange = function () {
            var files = this.files;
            var file;
            if (cropper && files && files.length) {
                file = files[0];
                if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;
                    uploadedImageName = file.name;
                    if (uploadedImageURL) {
                      URL.revokeObjectURL(uploadedImageURL);
                    }
                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                }else {
                    window.alert('Please choose an image file.');
                }
            }
        };
        } else {
            inputImage.disabled = true;
            inputImage.parentNode.className += ' disabled';
        }
    };
})();

window.onload = function () {
    photoUtil.init(); 
}




