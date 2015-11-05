/* initialize copyright year */
function initCopyright() {
	var today = new Date();
	copyrightYear = today.getFullYear();
	$("#tdr_copyright_year").empty();
	$("#tdr_copyright_year").append(copyrightYear);
};