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