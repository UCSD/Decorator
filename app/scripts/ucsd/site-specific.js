$(function() {
    // this should work for 'n' permanent info sections
    // where n is the number of sections added/copied unto the page
    $('[id^="perm-desc-link-"]').on('click', function() { // id's and selects the permanent information section

        var id = this.id; // stores the id of the section clicked
        var num = id.charAt(id.length-1); // extracts the section number which was clicked on
        $('#perm-desc-detail-'+num).toggleClass('hidden');  // selects the section + the section number and toggles the show/hide
        return false;
    });
});