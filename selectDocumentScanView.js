app.selectDocumentScan = {
  ready: function() {
    $("#zoomRange").slider({});
     var slidePreVal = 0;
    $('#zoomRange').on('slide', function(slideEvt) {
      var slideVal = slideEvt.value;
      if (slideVal > slidePreVal) {
          photoUtil.zoomUp(slideVal);
          slidePreVal = slideVal;
      } else if (slideVal < slidePreVal) {
          photoUtil.zoomDown(slideVal);
          slidePreVal = slideVal;
      }
      $("#zoomValue").text(slideEvt.value);    
    });

    //Range Slider zoom Hide And Show
    $(".btn-zoom-box").click(function(){
      $('.range-slider-zoom').toggle();
      $('.range-slider-rotate').hide();
    });

    //Range Slider close
    $(".zoom-close").click(function(){
      $(".range-slider-zoom").fadeOut('slow');
    });

    //Range Slider Zoom Out
    $("#btnPlus").on("click",function(){
        var value =$('#zoomRange').data('slider').getValue();
        $("#zoomRange").slider('setValue', value+1, true);
        //photoUtil.zoomUp();
    });

    //Range Slider Zoom In 
    $("#btnMinus").on("click",function(){
      var value = $('#zoomRange').data('slider').getValue();
      $("#zoomRange").slider('setValue', value-1, true);
     // photoUtil.zoomDown();
    });

    //Slider change Zoom in/out
    // $("#zoomRange").on('change' ,function(e){
    //     if (photoUtil.cropper.canvasData.naturalWidth < 860 || photoUtil.cropper.canvasData.naturalHeight < 400) {
    //         event.preventDefault();
    //     } else {
    //         var currentValue = parseFloat(e.target.value);
    //         photoUtil.cropper.zoomTo(currentValue / 100); 
    //     }
    // });

    var rotatePreVal = 0;
    $('#rotate').slider();
    $('#rotate').on('slide', function(slideEvt) {
      var rotateVal = slideEvt.value;
      if (rotateVal > rotatePreVal) {
          photoUtil.rotateRight(rotateVal);
          rotatePreVal = rotateVal;
      } else if (rotateVal < rotatePreVal) {
          photoUtil.rotateLeft(rotateVal);
          rotatePreVal = rotateVal;
      }
      $("#rotateValue").text(slideEvt.value);
    });

    //Range Slider rotate Hide And Show
    $(".btn-rotate-box").click(function(){
       $('.range-slider-rotate').toggle();
       $('.range-slider-zoom').hide();
    });

    //Range Slider Rotate Out
    $("#btnPlusRot").on("click",function(){
        var value =$('#rotate').data('slider').getValue();
        $("#rotate").slider('setValue', value+1, true);
        //photoUtil.rotateRight();
    });

    //Range Slider Rotate In 
    $("#btnMinusRot").on("click",function(){
      var value = $('#rotate').data('slider').getValue();
      $("#rotate").slider('setValue', value-1, true);
      //photoUtil.rotateLeft();
    });

    //Slider change rotate in/out
    // $("#rotate").on('change' ,function(e){
    //     var currentValue = parseFloat(e.target.value);
    //     photoUtil.cropper.rotateTo(currentValue); 
    // });

    $('#selectDocumentScanView').modal('show');
    $('.toolbar-range .slider-track').on('mousedown',function(){
      return false;
    });

    //Active Class
    $('.tool-item li').click(function(){
      $('li').removeClass("active");
      $(this).addClass("active");
      if ($(".btn-zoom-box").parents('.active').length == 0) {
        $(".range-slider-zoom").fadeOut('slow');
      }
      if ($(".btn-rotate-box").parents('.active').length == 0) {
        $(".range-slider-rotate").fadeOut('slow');
      }
    });



  },

};

$('.add-doc').click(function (e) {
    $("input[type='file']").trigger('click');
     photoUtil.changeImage();
})


appUtils.onDocReady(app.selectDocumentScan.ready);




