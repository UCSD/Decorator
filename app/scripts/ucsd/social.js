$('.social-list li').click(function(e) {
    window.location.href = $(this).find('a').attr('href');
});