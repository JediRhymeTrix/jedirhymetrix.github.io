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

    /* Logic for the mobile text */

    const h1Element = document.querySelector("h1 > span.text-");
    const mobileText = document.querySelector(
        ".d-block.d-lg-none.text-primary"
    );

    // Scroll through text to simulate a bootup sequence in a console
    const bootupSequence = [
        "Booting up...",
        "Loading modules...",
        "Initializing systems...",
        "Starting services...",
        "Ready.",
    ];

    function simulateBootup() {
        let index = 0;
        const normalDelay = 200;
        const finalDelay = normalDelay * 2; // Last step lasts twice as long
        mobileText.classList.remove("visible");
        originalText = mobileText.textContent;

        function showNext() {
            if (index < bootupSequence.length) {
                mobileText.textContent = bootupSequence[index];
                mobileText.classList.add("visible");

                let delay =
                    index === bootupSequence.length - 1
                        ? finalDelay
                        : normalDelay;
                index++;
                setTimeout(showNext, delay);
            } else {
                // When the sequence ends, always replace the text with the original
                mobileText.classList.remove("visible");
                mobileText.textContent = originalText;
            }
        }

        setTimeout(showNext, 500);
    }

    // Call the function to simulate the bootup sequence
    simulateBootup();

    // Show header text only after the navbar covers the h1 element and hide it when h1 is back in view
    window.addEventListener("scroll", () => {
        const h1Midpoint =
            h1Element.getBoundingClientRect().top +
            h1Element.getBoundingClientRect().height / 2;
        const navHeight = document.querySelector(".navbar").offsetHeight;

        if (h1Midpoint <= navHeight) {
            mobileText.classList.add("visible");
        } else {
            mobileText.classList.remove("visible");
        }
    });

    setTimeout(function () {
        const imgProfile = document.querySelector(
            "#sideNav .navbar-brand .img-profile"
        );
        if (imgProfile) {
            imgProfile.classList.add("initial-shadow");
        }
    }, 1000); // Delay in milliseconds (1 second)
});