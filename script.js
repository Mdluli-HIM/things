document.addEventListener("DOMContentLoaded", () => {
  // Intro Animations with refined transitions
  const introHeader = document.querySelector(".intro h1");
  const introImage = document.querySelector(".intro-image img");

  // Initial styles for the intro elements
  introHeader.style.opacity = "0";
  introHeader.style.transform = "translateY(-40px)";
  introImage.style.opacity = "0";
  introImage.style.transform = "translateY(40px)";

  // Animating intro elements with ease-in-out transitions
  setTimeout(() => {
    introHeader.style.transition = "opacity 1s ease, transform 1s ease-in-out";
    introImage.style.transition = "opacity 1s ease, transform 1s ease-in-out";
    introHeader.style.opacity = "1";
    introHeader.style.transform = "translateY(0)";
    introImage.style.opacity = "1";
    introImage.style.transform = "translateY(0)";
  }, 300);

  // Image Slider with enhanced animations and smoother transitions
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentSlide = 0;
  let slideInterval;

  // Dynamically create navigation dots with active states
  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
      dotsContainer.appendChild(dot);
    });

    // Slide switching logic with smooth transition
    function showSlide(index) {
      slides[currentSlide].classList.remove("active");
      dotsContainer.children[currentSlide].classList.remove("active");

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add("active");
      dotsContainer.children[currentSlide].classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Auto-slide initialization with a smooth transition
    slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide on hover for better user control
    const slider = document.querySelector(".slides-container");
    slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
    slider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }

  // Gallery Reveal Animation with staggered effects
  const gallerySection = document.querySelector(".gallery");
  const galleryItems = document.querySelectorAll(".gallery-item");
  let hasScrolled = false;

  function revealGallery() {
    const sectionPosition = gallerySection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition && !hasScrolled) {
      hasScrolled = true;
      gallerySection.classList.add("visible");
      galleryItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, index * 300);
      });
    }
  }

  window.addEventListener("scroll", revealGallery);
  revealGallery();

  // Intersection Observer for fade-in effect
  const fadeElements = document.querySelectorAll(".fade-in");
  const staggeredSections = document.querySelectorAll(".staggered-fade");
  const parallaxImage = document.querySelector(".parallax");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => observer.observe(el));
  staggeredSections.forEach((el) => observer.observe(el));

  // Parallax effect with enhanced scroll responsiveness
  window.addEventListener("scroll", () => {
    if (parallaxImage) {
      let scrollY = window.scrollY;
      parallaxImage.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
  });

  // Dynamic Background Words Animation
  const backgroundWords = document.getElementById("background-words");
  const words = [
    "Empowerment",
    "Community",
    "Hope",
    "Support",
    "Change",
    "Growth",
    "Unity",
    "Care",
    "Opportunity",
    "Impact",
    "Kindness",
    "Future",
    "Education",
    "Nutrition",
    "Development",
    "Collaboration",
    "Love",
    "Inspiration",
    "Solidarity",
    "Strength",
    "Healing",
    "Courage",
    "Justice",
    "Equality",
    "Compassion",
    "Dignity",
    "Integrity",
    "Resilience",
    "Sustainability",
    "Progress",
    "Well-being",
    "Connection",
    "Partnership",
    "Trust",
    "Wisdom",
    "Transformation",
    "Vision",
    "Innovation",
    "Rehabilitation",
    "Faith",
    "Commitment",
    "Leadership",
    "Advocacy",
    "Action",
    "Solidarity",
    "Refuge",
    "Rejuvenation",
    "Motivation",
    "Sincerity",
    "Charity",
    "Prosperity",
    "Recovery",
    "Harmony",
    "Gratitude",
    "Conservation",
    "Togetherness",
    "Accountability",
  ];

  const maxWords = 12;
  let currentIndex = 0;

  function createWord() {
    if (backgroundWords.childElementCount < maxWords) {
      const word = document.createElement("div");
      word.classList.add("word");
      word.textContent = words[currentIndex];
      word.style.left = `${Math.random() * 100}vw`;
      word.style.top = `${Math.random() * 100}vh`;
      word.style.animationDuration = `${Math.random() * 6 + 10}s`;
      word.style.fontSize = `${Math.random() * 0.7 + 1}em`;
      backgroundWords.appendChild(word);

      word.addEventListener("animationend", () => {
        word.remove();
      });

      currentIndex = (currentIndex + 1) % words.length;
    }
  }

  setInterval(createWord, 1200);

  // Smooth Scrolling for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Loading Screen Animation for Corporate Elegance
  const letters = document.querySelectorAll(".circle-text span");
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.opacity = "1";
      letter.style.transform = `translateY(0) rotate(${
        index % 2 === 0 ? "10deg" : "-10deg"
      })`;
    }, index * 100);
  });

  setTimeout(() => {
    const loadingScreen = document.querySelector(".loading-screen");

    // Apply zoom-in effect before fading out
    loadingScreen.style.transform = "scale(1.1)";

    setTimeout(() => {
      // Fade out smoothly
      loadingScreen.style.opacity = "0";
      loadingScreen.style.transform = "scale(1)"; // Return to normal size

      setTimeout(() => {
        loadingScreen.style.display = "none"; // Hide after fade out
      }, 1200); // Matches the CSS transition duration
    }, 500); // Slight delay before fading out to allow zoom effect
  }, letters.length * 100 + 1500);

  // Smooth transition for specific content sections
  const programs = document.querySelectorAll(".program");
  programs.forEach((program) => {
    program.addEventListener("click", () => {
      programs.forEach((p) => {
        if (p !== program) {
          p.classList.remove("active");
        }
      });
      program.classList.toggle("active");
    });
  });

  const learnMoreButton = document.querySelector(".learn-more");
  const visionInfo = document.querySelector(".vision-info");

  learnMoreButton.addEventListener("click", () => {
    learnMoreButton.classList.toggle("active");

    if (learnMoreButton.classList.contains("active")) {
      visionInfo.style.display = "block";
      visionInfo.style.opacity = "1";
      visionInfo.style.maxHeight = "500px";
    } else {
      visionInfo.style.display = "none";
      visionInfo.style.opacity = "0";
      visionInfo.style.maxHeight = "0";
    }
  });

  const contactBtn = document.querySelector(".contact-btn");
  contactBtn.addEventListener("click", () => {
    document
      .querySelector("#contact-form")
      .scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("scroll", () => {
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

document.getElementById("scroll-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const parallaxElements = document.querySelectorAll(".parallax-effect");

window.addEventListener("scroll", () => {
  parallaxElements.forEach((el) => {
    const speed = el.dataset.speed || 0.2;
    el.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("focus", () => {
    button.style.outline = "2px solid blue";
  });
  button.addEventListener("blur", () => {
    button.style.outline = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    const x = e.pageX;
    const y = e.pageY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  });

  // Adding interaction effect to expand the cursor when hovering over buttons or interactive elements
  const interactiveElements = document.querySelectorAll(
    ".button, .interactive-element"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("expand");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("expand");
    });
  });
});
const fadeInElements = document.querySelectorAll(".fade-in-on-scroll");

const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  { threshold: 0.2 }
);

fadeInElements.forEach((el) => fadeInObserver.observe(el));
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollPosition / documentHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

document.addEventListener("DOMContentLoaded", function () {
  let colors = ["#3b4c6a", "#1e3c72", "#2a5298", "#6a11cb", "#2575fc"];
  let index = 0;

  function changeBackground() {
    document.querySelector(
      ".events"
    ).style.background = `linear-gradient(45deg, ${colors[index]}, ${
      colors[(index + 1) % colors.length]
    })`;
    index = (index + 1) % colors.length;
  }

  setInterval(changeBackground, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  const introImage = document.querySelector(".intro-image");

  introImage.addEventListener("click", (event) => {
    // Add zoom and rotation effect
    introImage.classList.add("clicked");

    // Create ripple effect
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");
    const rect = introImage.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left - 50}px`;
    ripple.style.top = `${event.clientY - rect.top - 50}px`;
    introImage.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Reset image after effect
    setTimeout(() => {
      introImage.classList.remove("clicked");
    }, 1000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const introImage = document.querySelector(".intro-image");

  introImage.addEventListener("click", (event) => {
    // Add zoom and rotation effect
    introImage.classList.add("clicked");

    // Create ripple effect
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");
    const rect = introImage.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left - 50}px`;
    ripple.style.top = `${event.clientY - rect.top - 50}px`;
    introImage.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Reset image after effect
    setTimeout(() => {
      introImage.classList.remove("clicked");
    }, 1000);
  });
});

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    link.classList.add("active");
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

        // Remove active class from all links
        navLinks.forEach((nav) => nav.classList.remove("active"));

        // Add active class to clicked link
        link.classList.add("active");
      }
    });
  });
});

// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Add a click event to each gallery item
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Toggle the visibility of the clicked image
      item.classList.toggle("zoomed");

      // Optionally: Do something when the image is clicked (like show more details)
      if (item.classList.contains("zoomed")) {
        item.querySelector("img").style.transform = "scale(1.2)";
      } else {
        item.querySelector("img").style.transform = "scale(1)";
      }
    });
  });

  // Wait for the gallery to become visible and add the class 'visible' to animate
  const gallery = document.querySelector(".gallery");
  gallery.classList.add("visible");
});
