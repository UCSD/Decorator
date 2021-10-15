$(function() {
  /* Initialize Carousel */
  var paused = 0;
  $('.carousel').carousel({
    interval: 8000,
    pause: 0
  });

  /* Play trigger */
  $('#toggleCarousel,#toggleCarouselAria').click(function() {
    var state = (paused) ? 'cycle' : 'pause';
    paused = (paused) ? 0 : 1;
    $('.carousel').carousel(state);
    $(this).find('span').toggleClass('glyphicon-play glyphicon-pause');
    $('#toggleCarousel,#toggleCarouselAria').attr('aria-label',$(this).attr('aria-label')==='carousel is playing, click to pause'?'carousel is paused, click to play':'carousel is playing, click to pause' );
  });
});

$('.carousel').on('slid.bs.carousel', function () {
  var carouselData = $(this).data('bs.carousel');
            var currentIndex = carouselData.$element.find('.carousel-indicators li').removeAttr("aria-current");
           var currentIndex = carouselData.$element.find('.carousel-indicators li.active').attr("aria-current","true");
});