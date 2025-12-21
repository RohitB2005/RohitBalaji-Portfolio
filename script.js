$(document).ready(function() {

    // --- Navbar Hamburger Logic ---
    $(".navTrigger").click(function () {
        $(this).toggleClass("active");
        console.log("Clicked menu");
        $("#mainListDiv").toggleClass("show_list");
        $("#mainListDiv").fadeIn();
    });

    // --- Sticky Navbar Logic ---
    $(window).scroll(function() {
        if ($(this).scrollTop() > 10) { 
            $('.nav').addClass('affix');
        } else {
            $('.nav').removeClass('affix');
        }
    });

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            $(themeToggle).removeClass('fa-moon').addClass('fa-sun');
        }
    }

    // Toggle click event
    $(themeToggle).on('click', function() {
        // 1. Add rotation animation class
        $(this).addClass('rotate-icon');
        
        // 2. Remove rotation class after 500ms so it can be triggered again
        setTimeout(() => {
            $(this).removeClass('rotate-icon');
        }, 500);

        // 3. Toggle the light-mode class on the body
        body.classList.toggle('light-mode');

        // 4. Switch Icon and Save Preference
        if (body.classList.contains('light-mode')) {
            $(this).removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('theme', 'light-mode');
        } else {
            $(this).removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

});