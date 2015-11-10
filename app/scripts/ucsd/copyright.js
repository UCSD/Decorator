/* initialize copyright year */
function initCopyright() {
	var today = new Date();
	var footerCopyrightYear = '.footer-copyright-year';
	$(footerCopyrightYear).empty();
	$(footerCopyrightYear).append(today.getFullYear());
};