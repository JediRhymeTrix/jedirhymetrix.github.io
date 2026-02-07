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
    document.querySelectorAll("#navbarResponsive .nav-link"),
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
  const mobileText = document.querySelector(".d-block.d-lg-none.text-primary");

  // Animate bootup sequence for mobile text (only on mobile, where viewport < 992px)
  // Using media query is more reliable than checking computed styles
  const isMobile = !window.matchMedia(BREAKPOINTS.lg).matches;

  if (isMobile) {
    const originalText = mobileText.textContent;

    // Remove visible class initially
    mobileText.classList.remove("visible");

    // Start animation with 500ms delay on mobile
    setTimeout(() => {
      animateBootupSequence(
        text => {
          mobileText.textContent = text;
          mobileText.classList.add("visible");
        },
        () => {
          // When sequence ends, restore original text
          mobileText.classList.remove("visible");
          mobileText.textContent = originalText;
        },
      );
    }, 500);
  }

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
      "#sideNav .navbar-brand .img-profile",
    );
    if (imgProfile) {
      imgProfile.classList.add("initial-shadow");

      // Track if anything is triggering a wink
      let isWinkActive = false;
      let isWinking = false;

      // Function to trigger a quick wink
      function doWink(duration = 250) {
        if (isWinking || isWinkActive) return; // Prevent overlapping winks and don't interrupt active wink
        isWinking = true;
        imgProfile.src = "assets/img/profile_alt.png";
        setTimeout(() => {
          imgProfile.src = "assets/img/profile.png";
          isWinking = false;
        }, duration);
      }

      // Function to start constant wink
      function startWink() {
        isWinkActive = true;
        imgProfile.src = "assets/img/profile_alt.png";
      }

      // Function to stop constant wink
      function stopWink() {
        isWinkActive = false;
        imgProfile.src = "assets/img/profile.png";
      }

      // Add image swap on hover over profile pic
      imgProfile.addEventListener("mouseenter", startWink);
      imgProfile.addEventListener("mouseleave", stopWink);

      // Add constant wink on hover for links and buttons (excluding navbar)
      const links = document.querySelectorAll("a:not(#sideNav a):not(nav a)");
      const buttons = document.querySelectorAll(
        "button:not(#sideNav button):not(nav button)",
      );

      links.forEach(el => {
        el.addEventListener("mouseenter", startWink);
        el.addEventListener("mouseleave", stopWink);
      });

      buttons.forEach(el => {
        el.addEventListener("mouseenter", startWink);
        el.addEventListener("mouseleave", stopWink);
      });

      // Automatic wink after blur fades out (1.3s) - 250ms duration
      setTimeout(() => {
        doWink(250);
      }, 300); // 300ms after this timeout (which is at 1s), so total 1.3s
    }
  }, 1000); // Delay in milliseconds (1 second)

  // Flicker control: pause animation on hover, touch, and scroll
  const h1Elements = document.querySelectorAll("h1, .h1");
  let scrollTimeout;
  let isScrolling = false;
  let isHovering = false;

  // Add power-up animation after initial blur finishes (1.3s fadeInBlur)
  h1Elements.forEach(el => el.classList.add("neon-powerup"));

  function pauseFlicker() {
    h1Elements.forEach(el => el.classList.add("flicker-paused"));
  }

  function resumeFlicker() {
    h1Elements.forEach(el => el.classList.remove("flicker-paused"));
  }

  // Hover events (desktop) - only trigger when cursor is over actual text
  h1Elements.forEach(h1 => {
    h1.addEventListener("mousemove", e => {
      // Get the text dimensions using range
      const range = document.createRange();
      range.selectNodeContents(h1);
      const textRect = range.getBoundingClientRect();

      // Check if cursor is within text bounds
      const isOverText =
        e.clientX >= textRect.left &&
        e.clientX <= textRect.right &&
        e.clientY >= textRect.top &&
        e.clientY <= textRect.bottom;

      if (isOverText && !isHovering) {
        isHovering = true;
        pauseFlicker();
      } else if (!isOverText && isHovering) {
        isHovering = false;
        if (!isScrolling) {
          resumeFlicker();
        }
      }
    });

    h1.addEventListener("mouseleave", () => {
      isHovering = false;
      if (!isScrolling) {
        resumeFlicker();
      }
    });

    // Touch events (mobile)
    h1.addEventListener("touchstart", pauseFlicker, { passive: true });
    h1.addEventListener(
      "touchend",
      () => {
        if (!isScrolling) {
          resumeFlicker();
        }
      },
      { passive: true },
    );
  });

  // Scroll event
  window.addEventListener(
    "scroll",
    () => {
      isScrolling = true;
      pauseFlicker();

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Resume after scrolling stops (150ms delay)
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        // Only resume if not hovering
        if (!isHovering) {
          resumeFlicker();
        }
      }, 150);
    },
    { passive: true },
  );
};);