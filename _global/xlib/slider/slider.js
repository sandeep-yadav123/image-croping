(function($){
  $.fn.rkslider = function(options) {

  var defaults = {
    height: 150,
    duration: 100,
    hidearrows: true
  };
  var options = $.extend(defaults, options);

    return this.each(function() {
      var divobj = $(this);

      $(divobj).height(options.height);
      $(divobj).css('overflow', 'hidden');

      $('> .wrapper', divobj).height(options.height);
      $('> .wrapper', divobj).css('overflow', 'hidden');
      $('> .wrapper', divobj).css('float', 'left');

      $('> .wrapper > ul', divobj).height(options.height);
      $('> .wrapper > ul', divobj).css('float', 'left');
      $('> .wrapper > ul', divobj).css('margin', '0');
      $('> .wrapper > ul', divobj).css('padding', '0');
      $('> .wrapper > ul', divobj).css('display', 'block');

      $('> .wrapper > ul > li', divobj).height(options.height);
      $('> .wrapper > ul > li', divobj).css('display', 'block');
      $('> .wrapper > ul > li', divobj).css('float', 'left');
      //$('> .wrapper > ul > li a', divobj).attr("tabindex", "-1");
      $('.scroller .wrapper ul li a').attr("tabindex", "-1");

      var originalmarginright = parseInt($('> .wrapper > ul > li', divobj).css('marginRight'));
      var originalmarginleft = parseInt($('> .wrapper > ul > li', divobj).css('marginLeft'));
      var visiblelis = 0;
      var totallis = $('> .wrapper > ul > li', this).length;
      var currentposition = 0;
      var liwidth = $('> .wrapper > ul > li:first', divobj).outerWidth(true);
      var additionalmargin = 0;
      var totalwidth = liwidth + additionalmargin;

      $(window).resize(function(e){
        var divwidth = $(divobj).width();
        var availablewidth = (divwidth - $('> .previous', divobj).outerWidth(true) - $('> .next', divobj).outerWidth(true));

        previousvisiblelis = visiblelis;
        visiblelis = Math.floor((availablewidth / liwidth));

        if (visiblelis < totallis) {
          additionalmargin = Math.floor((availablewidth - (visiblelis * liwidth))/visiblelis);
        } else {
          additionalmargin = Math.floor((availablewidth - (totallis * liwidth))/totallis);
        }
        halfadditionalmargin = Math.floor(additionalmargin/2);
        totalwidth = liwidth + additionalmargin;

        $('> .wrapper > ul > li', divobj).css('marginRight', originalmarginright + halfadditionalmargin);
        $('> .wrapper > ul > li', divobj).css('marginLeft',originalmarginleft + halfadditionalmargin);

        if (visiblelis > previousvisiblelis  || totallis <= visiblelis) {
          currentposition -= (visiblelis-previousvisiblelis);
          if (currentposition < 0 || totallis <= visiblelis ) {
            currentposition = 0;
          }
        }
        $('> .wrapper > ul', divobj).css('marginLeft', -(currentposition * totalwidth));

        if (visiblelis >= totallis || ((divwidth >= (totallis * liwidth)) && options.hidearrows) ) {
          if (options.hidearrows) {
            $('> .previous', divobj).hide();
            $('> .next', divobj).hide();

            additionalmargin = Math.floor((divwidth - (totallis * liwidth))/totallis);
            halfadditionalmargin = Math.floor(additionalmargin/2);
            totalwidth = liwidth + additionalmargin;
            $('> .wrapper > ul > li', divobj).css('marginRight', originalmarginright + halfadditionalmargin);
            $('> .wrapper > ul > li', divobj).css('marginLeft', originalmarginleft + halfadditionalmargin);
          }
          $('> .wrapper', divobj).width(totallis * totalwidth);
          $('> ul', divobj).width(totallis * totalwidth);
          $('> .wrapper', divobj).css('marginLeft', 0);
          currentposition = 0;
        } else {
          $('> .previous', divobj).show();
          $('> .next', divobj).show();
          $('> .wrapper', divobj).width(visiblelis * totalwidth);
          $('> ul', divobj).width(visiblelis * totalwidth);
        }
      });

      $('> .next', divobj).click(function(){

        if (totallis <= visiblelis) {
          currentposition = 0;
        } else if ((currentposition + (visiblelis*2)) < totallis) {
          currentposition += visiblelis;
        } else if ((currentposition + (visiblelis*2)) >= totallis -1) {
          currentposition = totallis - visiblelis;
        }
        $('> .wrapper > ul', divobj).stop();
        $('> .wrapper > ul', divobj).animate({'marginLeft': -(currentposition * totalwidth)}, options.duration);
      });

      $('> .previous', divobj).click(function(){
        if ((currentposition - visiblelis) > 0) {
          currentposition -= visiblelis;
        } else if ((currentposition - (visiblelis*2)) <= 0) {
          currentposition = 0;
        }
        $('> .wrapper > ul', divobj).stop();
        $('> .wrapper > ul', divobj).animate({'marginLeft': -(currentposition * totalwidth)}, options.duration);
      });

      $('> .next', divobj).dblclick(function(e){
        e.preventDefault();
        clearSelection();
      });

      $('> .previous', divobj).dblclick(function(e){
        e.preventDefault();
        clearSelection();
      });

      function clearSelection() {
        if (document.selection && document.selection.empty) {
          document.selection.empty();
        } else if (window.getSelection) {
          var sel = window.getSelection();
          sel.removeAllRanges();
        }
      }

      $(window).resize();
    });


 };
})(jQuery);
