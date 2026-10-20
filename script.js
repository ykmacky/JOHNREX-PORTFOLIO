document.addEventListener("DOMContentLoaded", function () {
    // ========================================
    // 1. DARK / LIGHT MODE
    // ========================================
    const themeBtn = document.querySelector(".theme-btn");
    function applyTheme(theme) {
        document.body.classList.toggle(
            "light-mode",
            theme === "light"
        );
        localStorage.setItem("theme", theme);
        if (themeBtn) {
            themeBtn.textContent =
                theme === "light" ? "☀️" : "🌙";
            themeBtn.setAttribute(
                "aria-label",
                theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );
        }
    }
    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme === "light" ? "light" : "dark");
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            const isLight =
                document.body.classList.contains("light-mode");
            applyTheme(isLight ? "dark" : "light");
        });
    }
    // ========================================
    // 2. BACK TO TOP
    // ========================================
    const topBtn = document.querySelector(".top-btn");
    function updateTopButton() {
        if (topBtn) {
            topBtn.classList.toggle(
                "show",
                window.scrollY > 300
            );
        }
    }
    if (topBtn) {
        updateTopButton();
        window.addEventListener("scroll", updateTopButton);
        topBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    // ========================================
    // 3. ABOUT ME SLIDESHOW
    // Supports .about-slide and .slideshow .slide
    // ========================================
    const aboutSlides = document.querySelectorAll(".about-slide");
    const regularSlides = document.querySelectorAll(".slideshow .slide");
    const slides = aboutSlides.length > 0
        ? aboutSlides
        : regularSlides;
    const dots = document.querySelectorAll(".about-dot");
    let currentSlide = 0;
    let slideshowTimer = null;
    function showSlide(index) {
        if (slides.length === 0) return;
        currentSlide =
            (index + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
            slide.classList.toggle(
                "active",
                i === currentSlide
            );
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle(
                "active",
                i === currentSlide
            );
        });
    }
    function startSlideshow() {
        clearInterval(slideshowTimer);
        if (slides.length > 1) {
            slideshowTimer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 5000);
        }
    }
    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            startSlideshow();
        });
    });
    // Previous and next buttons
    document.querySelectorAll(
        ".about-prev, .slide-prev, .prev-btn"
    ).forEach(function (button) {
        button.addEventListener("click", function () {
            showSlide(currentSlide - 1);
            startSlideshow();
        });
    });
    document.querySelectorAll(
        ".about-next, .slide-next, .next-slide"
    ).forEach(function (button) {
        button.addEventListener("click", function () {
            showSlide(currentSlide + 1);
            startSlideshow();
        });
    });
    // Keep compatibility with existing HTML onclick functions
    window.showAboutSlide = function (index) {
        showSlide(index);
        startSlideshow();
    };

    window.changeAboutSlide = function (index) {
        showSlide(index);
        startSlideshow();
    };
    window.changeSlide = function (direction) {
        showSlide(currentSlide + direction);
        startSlideshow();
    };
    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();
    }
    // ========================================
    // 4. WELCOME BUTTON
    // ========================================
    const welcomeButton = document.querySelector(
        "#welcomeButton, #welcome-btn, .welcome-button"
    );
    if (welcomeButton) {
        welcomeButton.addEventListener("click", function () {
            alert("Welcome to my portfolio! Thank you for visiting.");
        });
    }
    // ========================================
    // 5. READ MORE / READ LESS
    // ========================================
    const readMoreButton = document.querySelector(
        "#readMoreButton, #read-more, .read-more-button"
    );
    const moreContent = document.querySelector(
        "#moreContent, #more-content, .more-content"
    );
    if (readMoreButton && moreContent) {
        readMoreButton.addEventListener("click", function () {
            const isHidden =
                window.getComputedStyle(moreContent).display === "none";
            if (isHidden) {
                moreContent.style.display = "block";
                readMoreButton.textContent = "Read Less";
            } else {
                moreContent.style.display = "none";
                readMoreButton.textContent = "Read More";
            }
        });
    }
    // ========================================
    // 6. DATE AND TIME
    // ========================================
    const dateTimeElement = document.querySelector(
        "#dateTime, #date-time, .date-time"
    );
    function updateDateTime() {
        if (!dateTimeElement) return;
        dateTimeElement.textContent = new Date().toLocaleString(
            "en-PH",
            {
                dateStyle: "medium",
                timeStyle: "medium"
            }
        );
    }
    if (dateTimeElement) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
    // ========================================
    // ANIMATED GALAXY BACKGROUND REMOVED
    // No star generation or shooting-star code.
    // ========================================
});
