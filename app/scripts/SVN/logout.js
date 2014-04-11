/* initialize login links */
function initLogout(logoutUrl) {
	var url = "https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?";
	$.getJSON(url, function(data) {
		if (data.eduUcsdActLoggedin) {
			var url = "<div id=\"tdr_login_content\">You are logged in | <a href=\"/security/logout?url=";
			url += logoutUrl;
			url += "\">Log Out</a></div>";
			$("div#tdr_login").empty();
			$("div#tdr_login").append(url);
		}
	});
};