(function(document) {
    var title = $(".title-header"),
        titleShort = $(".title-header-short"),
        titleWidth = title[0].offsetWidth,
        logoWidth = 229,
        menuWidth = 62,
        titleOverflow,
        titleWrapper;

    var removeLongTitle = function () {
        title.toggle( false );
        titleShort.toggle( true );
    };

    var showLongTitle = function () {
        title.toggle( true );
        titleShort.toggle( false );
    };

    var checkOverflow = function( titleOverflow, titleWrapper ) {
        if ( titleOverflow > titleWrapper ) {
            removeLongTitle();
        } else {
            showLongTitle();
        }
    };

    var checkTitleOverflow = function () {
        // titleWrapper initialized here to dynamically
        titleWrapper = $(".layout-title .layout-container")[0].offsetWidth;

        // NO hamburger menu & logo on right
        if ( titleWrapper >= 960 ) {
            titleOverflow =  titleWidth + logoWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on right
        else if( titleWrapper > 768 ) {
            titleOverflow = titleWidth + logoWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on left
        else if( titleWrapper <= 768 ) {
            titleOverflow = titleWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
    };

    // ToDo: function callback only registers twice
    $(window).resize( function () {
        checkTitleOverflow();
    });

    $(window).ready( function () {
        checkTitleOverflow();
    });
})(document);