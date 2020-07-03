$(document).ready(function(){
    resize();
});

function resize(){
    if($(window).width() < 960)
    {
        //Mobile
        $("#search").prependTo(".offcanvas");
        console.log("less than 960px");
        $("#search").css("display", "block").css("position","relative !important");
    }
    else if($(window).width() > 960)
    {
      //Mobile
      $("#search").appendTo(".search");
      console.log("less than 960px");
    }
    else
    {w
        //Desktop
        //Leave original layout
    }
}
