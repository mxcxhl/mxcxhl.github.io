
/* =====================================
   1. INITIAL SETUP
===================================== */

document.documentElement.classList.add("js-ready");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =====================================
   2. FOOTER YEAR
===================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =====================================
   3. TYPING EFFECT
===================================== */

const typedText = document.getElementById("typed-text");

const roles = [
    "Cybersecurity Student",
    "Computer Science Enthusiast",
    "Continuous Learner",
    "Public Speaking Enthusiast"
];

if (typedText) {

    if (prefersReducedMotion) {
        typedText.textContent = roles[0];
    } else {

        let roleIndex = 0;
        let characterIndex = roles[0].length;
        let deleting = true;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typedText.textContent = currentRole.substring(
                0,
                characterIndex
            );

            let delay = deleting ? 45 : 75;

            if (!deleting && characterIndex === currentRole.length) {

                deleting = true;
                delay = 1500;

            } else if (deleting && characterIndex === 0) {

                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 400;

            }

            setTimeout(typeEffect, delay);
        }

        setTimeout(typeEffect, 1800);
    }
}


/* =====================================
   4. MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {

    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");
}

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        document.body.classList.toggle("menu-open", isOpen);
    });

    navItems.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            closeMenu();
        }

    });
}


/* =====================================
   5. SCROLL REVEAL ANIMATIONS
===================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .interest-card, " +
    ".project-card, .learning-intro, .learning-item, " +
    ".contact-content, .contact-decoration"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

if (prefersReducedMotion) {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

} else if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =====================================
   6. ACTIVE NAVIGATION LINK
===================================== */

const sections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const sectionId = entry.target.id;

                    navItems.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === "#" + sectionId;

                        link.classList.toggle("active", isActive);
                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =====================================
   7. BACK TO TOP BUTTON
===================================== */

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    function updateBackToTop() {

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 450
        );

    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });

    });

}


/* =====================================
   8. CONTACT PROFILE LINKS
===================================== */

// Replace these values with your actual profile URLs.

const profileLinks = {
    linkedin: "",
    github: ""
};

const linkedinLink = document.getElementById("linkedin-link");
const githubLink = document.getElementById("github-link");

function configureProfileLink(element, url) {

    if (!element) return;

    if (url && /^https:\/\/(www\.)?(linkedin\.com|github\.com)\//i.test(url)) {

        element.href = url;
        element.hidden = false;

    } else {

        // Prevent placeholder links from jumping to the top.
        element.hidden = true;

    }

}

configureProfileLink(linkedinLink, profileLinks.linkedin);
configureProfileLink(githubLink, profileLinks.github);


/* =====================================
   9. CONSOLE MESSAGE
===================================== */

console.log(
    "%cSYSTEM ONLINE // WELCOME TO MICAH'S CYBERSPACE",
    "color: #00f5ff; background: #070710; padding: 10px; font-weight: bold;"
);
