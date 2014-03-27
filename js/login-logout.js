(function($) {
    $(document).ready(function() {
        $.ajax({
            url: "https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?",
            dataType: 'jsonp',
            jsonpCallback: 'a4sso',
            success: function(data) {
                if (data.eduUcsdActLoggedin) {
                    var url = "<div id=\"tdr_login_content\">You are logged in | <a href=\"/security/logout?url=";
                    url += "http://www.ucsd.edu";
                    url += "\">Log Out</a></div>";
                    $("#tdr_login").empty();
                    $("#tdr_login").append(url);
                    $("#tdr_login").attr("style", "display:block");
                }
            },
            error: function(jqXHR, textStatus) {
                // could mean user is not logged in
            }
        });
    });
})(jQuery);