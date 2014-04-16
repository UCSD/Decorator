jQuery(document).ready(function(){
    
    $('.accordion h2').click(function() { /* Drawer Toggle*/
        if($(this).hasClass('head_expanded')) {
            $(this).removeClass('head_expanded').next().hide();
        }
        else {
            $(this).addClass('head_expanded').next().show();
            window.location.hash = $(this).find('a').text().replace(/\s/g,'-').substring(0,31);
        };
        return false;
    })
    
    $('.expand_accordion').click(function() { /* Expand all/collapse all function */
        if ($(this).hasClass('accordion_expanded')) {
        $('.expand_accordion').each(function (i) {
                $(this).removeClass("accordion_expanded");
                $(this).html("Expand all");
                $('.accordion h2').removeClass('head_expanded').next().hide();
            });
        }
    
        else {
          $('.expand_accordion').each(function (i) {
                $(this).addClass("accordion_expanded");
                $(this).html("Collapse all");
                $('.accordion h2').addClass('head_expanded').next().show();
            });
        };
        window.location.hash = '';
        return false;
    });
    
    function expander() {
        $('.accordion_body').hide();
        var hashCheck = window.location.hash
        if (hashCheck) {
            $('.accordion h2').each(function(index) {
                if (hashCheck == '#'+ $(this).find('a').text().replace(/\s/g,'-').substring(0,31)) {
                    $(this).addClass('head_expanded').next().show();
                    var newPosition = $(this).offset();
                    setTimeout(function() {
                        window.scrollTo(0, newPosition.top);
                    }, 50);
                };
            }); 
        };
    };

    $('#tdr_content_content a[href*="#"]').click(function() {
        var targetURL = $(this).attr("href").split('#');
        if (String(targetURL[targetURL.length-2]).length == 0) { /* Ensure that the link goes to an anchor on the same page*/
            var targetLetter = targetURL[1].substring(0,31);
            var hashLetter = '- '+ targetLetter.replace(/\s/g,'').toUpperCase() + ' -';
            $('.accordion h2').each(function () {
                targetDrawer = $(this).find('a').text().replace(/\s/g, '-').substring(0,31);
                if ($(this).find('a').text() == hashLetter || targetDrawer == targetLetter) {
                    $('.accordion h2').removeClass('head_expanded').next().hide();
                    $(this).addClass('head_expanded').next().show();
                    var newPosition = $(this).offset();
                    window.scrollTo(newPosition.left,newPosition.top);
                };
            });
        };
    });
    
    $(window).bind('load', expander);

});

    