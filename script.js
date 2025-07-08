$(document).ready(function() {

    $(".navTrigger").click(function () {
        $(this).toggleClass("active");
        console.log("Clicked menu");
        $("#mainListDiv").toggleClass("show_list");
        $("#mainListDiv").fadeIn();
    });

    // Code for the navbar background on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 10) { 
            // Add the .affix class to the nav
            $('.nav').addClass('affix');
        } else {
            $('.nav').removeClass('affix');
        }
    });

});