/* this is used by cms.  apps should use the versioned js */

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

/* initialize footer links */
function initFooter(feedbackUrl) {
	feedbackUrl = feedbackUrl + location.pathname;
	var feedback_url = "<a href=\"";
	feedback_url += feedbackUrl;
	feedback_url += "\" onclick=\"window.open('";
	feedback_url += feedbackUrl;
	feedback_url += "', 'DYGWYW', 'menubar=0,resizable=1,scrollbars=1,width=450,height=650');\" target=\"DYGWYW\">Feedback</a>";
	$("#tdr_footer_feedback").empty();
	$("#tdr_footer_feedback").append(feedback_url);
};

/* initialize copyright year  */
function initCopyright() {
	var today = new Date();
	copyrightYear = today.getFullYear();
	$(".copyright_year").empty();
	$(".copyright_year").append(copyrightYear);
};
