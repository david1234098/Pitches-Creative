"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNavigation = document.getElementById("mainNavigation");

    if (menuToggle && mainNavigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNavigation.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        const navLinks = mainNavigation.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNavigation.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });

        document.addEventListener("click", (event) => {

            if (
                !mainNavigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNavigation.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                mainNavigation.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });
    }


    /* =========================================
       2. HEADER SCROLL EFFECT
    ========================================= */

    const siteHeader = document.getElementById("siteHeader");

    if (siteHeader) {

        const updateHeader = () => {

            if (window.scrollY > 50) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }

        };

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();
    }


    /* =========================================
       3. CURRENT YEAR
    ========================================= */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =========================================
       4. SCROLL REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.15
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


    /* =========================================
       5. ANIMATED STATISTICS
    ========================================= */

    const statNumbers =
        document.querySelectorAll(
            ".stat-number[data-target]"
        );

    const animateCounter = (element) => {

        const target =
            Number(element.dataset.target);

        if (Number.isNaN(target)) {
            return;
        }

        const duration = 1800;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                Math.floor(
                    easedProgress * target
                );

            element.textContent = currentValue;

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    };


    if ("IntersectionObserver" in window) {

        const statsObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );

        statNumbers.forEach((number) => {

            statsObserver.observe(number);

        });

    } else {

        statNumbers.forEach((number) => {

            number.textContent =
                number.dataset.target;

        });
    }


    /* =========================================
       6. SMOOTH INTERNAL NAVIGATION
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const targetElement =
                    document.querySelector(targetId);

                if (targetElement) {

                    event.preventDefault();

                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            });

        });


    /* =========================================
       7. SERVICE CARD INTERACTION
    ========================================= */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );

    serviceCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add(
                "service-hover"
            );

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove(
                "service-hover"
            );

        });

    });


    /* =========================================
       8. ORBIT / FEATURE ANIMATION
    ========================================= */

    const featureVisual =
        document.querySelector(".feature-visual");

    if (featureVisual) {

        const nodes =
            featureVisual.querySelectorAll(
                ".feature-node"
            );

        let angle = 0;

        const animateOrbit = () => {

            angle += 0.003;

            nodes.forEach((node, index) => {

                const offset = index * 2.1;

                const y =
                    Math.sin(angle + offset) * 4;

                node.style.setProperty(
                    "--orbit-y",
                    `${y}px`
                );
            });

            requestAnimationFrame(
                animateOrbit
            );
        };

        animateOrbit();
    }


    /* =========================================
       9. BUTTON RIPPLE EFFECT
    ========================================= */

    const buttons =
        document.querySelectorAll(".btn");

    buttons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const ripple =
                document.createElement("span");

            ripple.classList.add(
                "button-ripple"
            );

            const rect =
                button.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =========================================
       10. CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        ".form-submit"
                    );

                const originalText =
                    submitButton.innerHTML;

                const name =
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const service =
                    document.getElementById("service");

                const message =
                    document.getElementById("message");

                if (
                    !name ||
                    !email ||
                    !service ||
                    !message ||
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    service.value === "" ||
                    message.value.trim() === ""
                ) {

                    alert(
                        "Please fill in all required fields."
                    );

                    return;
                }

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    email.focus();

                    return;
                }

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Sending...";

                try {

                    const formData =
                        new URLSearchParams(new FormData(contactForm));

            const response = await fetch("/send-message", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
    })
});
                

                    if (!response.ok) {

                        throw new Error(
                            "Message could not be sent."
                        );
                    }

                    await response.text();

                    alert(
                        `Thank you, ${name.value.trim()}! Your message has been sent.`
                    );

                    contactForm.reset();

                } catch (error) {

                    console.error(error);

                    alert(
                        "Sorry, your message could not be sent. Please try again."
                    );

                } finally {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalText;
                }
            }
        );
    }


    /* =========================================
       11. PRIVACY PAGE ANIMATION
    ========================================= */

    const privacyPage =
        document.querySelector(
            ".privacy-section"
        );

    if (
        privacyPage &&
        "IntersectionObserver" in window
    ) {

        const privacyBlocks =
            privacyPage.querySelectorAll(
                ".privacy-block"
            );

        privacyBlocks.forEach((block, index) => {

            block.style.opacity = "0";

            block.style.transform =
                "translateY(25px)";

            block.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            block.style.transitionDelay =
                `${index * 120}ms`;
        });

        const privacyObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

        privacyBlocks.forEach((block) => {

            privacyObserver.observe(block);

        });
    }


    /* =========================================
       12. TERMS PAGE ANIMATION
    ========================================= */

    const termsPage =
        document.querySelector(
            ".terms-section"
        );

    if (
        termsPage &&
        "IntersectionObserver" in window
    ) {

        const termsBlocks =
            termsPage.querySelectorAll(
                ".terms-block"
            );

        termsBlocks.forEach((block, index) => {

            block.style.opacity = "0";

            block.style.transform =
                "translateY(25px)";

            block.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

            block.style.transitionDelay =
                `${index * 120}ms`;
        });

        const termsObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

        termsBlocks.forEach((block) => {

            termsObserver.observe(block);

        });
    }


    /* =========================================
       13. REDUCED MOTION
    ========================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.style.scrollBehavior =
            "auto";

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

        statNumbers.forEach((number) => {

            number.textContent =
                number.dataset.target;

        });
    }


    /* =========================================
       14. WEBSITE LOADED
    ========================================= */

    console.log(
        "TechCreative website initialized successfully."
    );

});