/*!
 * Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
// 

window.addEventListener("DOMContentLoaded", event => {
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector("#sideNav");
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#sideNav",
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll("#navbarResponsive .nav-link")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }
        });
    });

    /** Logic for the modal */

    var openModalLinks = document.querySelectorAll(".open-modal-link");
    var closeModalBtns = document.querySelectorAll(".close-modal");

    // Open Modal on clicking '.open-modal-link'
    openModalLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(".modal-container").style.display = "block";
        });
    });

    // Close Modal on clicking '.close-modal'
    closeModalBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(".modal-container").style.display = "none";
        });
    });
});