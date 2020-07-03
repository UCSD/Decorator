$(function() {
  /* Initialize Carousel */
  var paused = 0;
  $('.carousel').carousel({
    interval: 8000,
    pause: 0
  });

  /* Play trigger */
  $('#toggleCarousel').click(function() {
    var state = (paused) ? 'cycle' : 'pause';
    paused = (paused) ? 0 : 1;
    $('.carousel').carousel(state);
    $(this).find('span').toggleClass('glyphicon-play glyphicon-pause');
    $(this).attr('aria-label',$(this).attr('aria-label')==='Carousel Pause'?'Carousel Play':'Carousel Pause' );
  });
});
