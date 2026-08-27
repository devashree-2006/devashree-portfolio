/* =========================================================
   DEVASHREE PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================
   ELEMENTS
   ========================= */

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const portfolio = document.getElementById("portfolio");

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll("#navMenu a");


/* =========================================================
   PAGE LOCK
   Keep the portfolio from scrolling while intro is visible
   ========================================================= */

document.body.classList.add("lock-scroll");


/* =========================================================
   ENTER BUTTON
   ========================================================= */

enterBtn.addEventListener("click", () => {

    /* Prevent multiple clicks */
    enterBtn.disabled = true;

    /* Start door animation */
    intro.classList.add("open");

    /*
        Wait until the door animation is mostly complete
        before showing the actual portfolio.
    */

    setTimeout(() => {

        portfolio.classList.add("visible");

    }, 900);


    /*
        Completely remove intro after animation.
    */

    setTimeout(() => {

        intro.classList.add("hidden");

        document.body.classList.remove("lock-scroll");

        /*
            Remove intro from interaction after animation.
        */

        intro.style.visibility = "hidden";

    }, 1900);

});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    /*
        Change hamburger icon
    */

    if (navMenu.classList.contains("active")) {

        menuBtn.textContent = "✕";

    } else {

        menuBtn.textContent = "☰";

    }

});


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
   ========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

/*
    Add reveal animation automatically to important elements.
*/

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-container, " +
    ".skill-card, " +
    ".project-card, " +
    ".timeline-item, " +
    ".certificate-card, " +
    ".contact-content, " +
    ".contact-details"
);


/*
    Add the reveal class.
*/

revealElements.forEach(element => {

    element.classList.add("reveal");

});


/*
    Intersection Observer watches when elements
    enter the viewport.
*/

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                /*
                    Stop observing once the animation
                    has happened.
                */

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    }
);


/*
    Start observing all reveal elements.
*/

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   STAGGERED CARD ANIMATIONS
   ========================================================= */


/*
    Skills
*/

document.querySelectorAll(".skill-card").forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 0.07}s`;

    }
);


/*
    Projects
*/

document.querySelectorAll(".project-card").forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 0.1}s`;

    }
);


/*
    Certificates
*/

document.querySelectorAll(".certificate-card").forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    }
);


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentSection =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove("current");

                    const linkTarget =
                        link.getAttribute("href");


                    if (linkTarget === `#${currentSection}`) {

                        link.classList.add("current");

                    }

                });

            }

        });

    }, {
        threshold: 0.4
    }
);


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar = document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 10px 35px rgba(41, 34, 34, 0.06)";

        } else {

            navbar.style.boxShadow = "none";

        }

    }, {
        passive: true
    }
);


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

/*
    If a project image hasn't been added yet,
    don't show a broken-image icon.
*/

const images = document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        /*
            Give the project/image container
            a clean fallback appearance.
        */

        const container =
            image.closest(
                ".project-image, .image-frame"
            );


        if (container) {

            container.classList.add("image-missing");

        }

    });

});


/* =========================================================
   SMOOTH SCROLL OFFSET
   ========================================================= */

/*
    The navbar is fixed, so prevent headings
    from hiding underneath it.
*/

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (!targetId.startsWith("#")) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }


        event.preventDefault();


        const navbarHeight =
            navbar.offsetHeight;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "✨ Welcome to Devashree's Portfolio."
);