document.addEventListener("DOMContentLoaded", () => {
  // Centralized animation utility functions
  const animationUtils = {
    fadeIn: (element, delay = 0, duration = 1000) => {
      if (!element) return;
      element.style.opacity = "0";
      setTimeout(() => {
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease-in-out`;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, delay);
    },
    
    createObserver: (threshold = 0.2) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold }
      );
    }
  };

  // Intro Animations with refined transitions
  const introHeader = document.querySelector(".intro h1");
  const introImage = document.querySelector(".intro-image img");

  if (introHeader && introImage) {
    // Initial styles for the intro elements
    introHeader.style.opacity = "0";
    introHeader.style.transform = "translateY(-40px)";
    introImage.style.opacity = "0";
    introImage.style.transform = "translateY(40px)";

    // Animating intro elements with ease-in-out transitions
    animationUtils.fadeIn(introHeader, 300);
    animationUtils.fadeIn(introImage, 300);
  }

  // Image Slider with enhanced animations and smoother transitions
  const slider = document.querySelector(".slides-container");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentSlide = 0;
  let slideInterval;

  // Slider functionality
  if (slides.length > 0 && dotsContainer) {
    // Dynamically create navigation dots with active states
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        showSlide(index);
        startSlideInterval();
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

    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    // Auto-slide initialization with a smooth transition
    startSlideInterval();

    // Pause auto-slide on hover for better user control
    if (slider) {
      slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
      slider.addEventListener("mouseleave", startSlideInterval);
    }
  }

  // Gallery Reveal Animation with staggered effects
  const gallerySection = document.querySelector(".gallery");
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  if (gallerySection && galleryItems.length > 0) {
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
          }, index * 200); // Reduced from 300ms to 200ms for faster animation
        });
      }
    }

    window.addEventListener("scroll", revealGallery);
    // Initial check in case gallery is already in view
    revealGallery();
    
  }

  // Intersection Observer for fade-in effect
  const fadeElements = document.querySelectorAll(".fade-in");
  const staggeredSections = document.querySelectorAll(".staggered-fade");
  const fadeInElements = document.querySelectorAll(".fade-in-on-scroll");
  
  const observer = animationUtils.createObserver();
  
  fadeElements.forEach((el) => observer.observe(el));
  staggeredSections.forEach((el) => observer.observe(el));
  fadeInElements.forEach((el) => observer.observe(el));

  // Parallax effect with enhanced scroll responsiveness
  const parallaxImage = document.querySelector(".parallax");
  const parallaxElements = document.querySelectorAll(".parallax-effect");
  
  function updateParallax() {
    const scrollY = window.scrollY;
    
    if (parallaxImage) {
      parallaxImage.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
    
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0.2;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
  
  window.addEventListener("scroll", updateParallax);

  // Dynamic Background Words Animation - optimized with requestAnimationFrame
  const backgroundWords = document.getElementById("background-words");
  if (backgroundWords) {
    const words = [
      "Empowerment", "Community", "Hope", "Support", "Change", "Growth",
      "Unity", "Care", "Opportunity", "Impact", "Kindness", "Future",
      "Education", "Nutrition", "Development", "Collaboration", "Love",
      "Inspiration", "Solidarity", "Strength", "Healing", "Courage",
      "Justice", "Equality", "Compassion", "Dignity", "Integrity",
      "Resilience", "Sustainability", "Progress", "Well-being", "Connection",
      "Partnership", "Trust", "Wisdom", "Transformation", "Vision",
      "Innovation", "Rehabilitation", "Faith", "Commitment", "Leadership",
      "Advocacy", "Action", "Refuge", "Rejuvenation", "Motivation",
      "Sincerity", "Charity", "Prosperity", "Recovery", "Harmony",
      "Gratitude", "Conservation", "Togetherness", "Accountability"
    ];

    const maxWords = 12;
    let currentIndex = 0;
    let lastWordTime = 0;
    const wordInterval = 1200; // Time between new words in ms

    function createWord(timestamp) {
      if (timestamp - lastWordTime > wordInterval && backgroundWords.childElementCount < maxWords) {
        lastWordTime = timestamp;
        
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
      
      requestAnimationFrame(createWord);
    }

    requestAnimationFrame(createWord);
  }

  // Smooth Scrolling for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Loading Screen Animation
  const loadingScreen = document.querySelector(".loading-screen");
  if (loadingScreen) {
    const letters = document.querySelectorAll(".circle-text span");
    
    if (letters.length > 0) {
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.style.opacity = "1";
          letter.style.transform = `translateY(0) rotate(${
            index % 2 === 0 ? "10deg" : "-10deg"
          })`;
        }, index * 100);
      });

      setTimeout(() => {
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
    } else {
      // If no letters, just fade out loading screen after a delay
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 2000);
      }, 2000);
    }
  }

  // Programs section interaction
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

  // Learn More button interaction
  const learnMoreButton = document.querySelector(".learn-more");
  const visionInfo = document.querySelector(".vision-info");
  
  if (learnMoreButton && visionInfo) {
    learnMoreButton.addEventListener("click", () => {
      learnMoreButton.classList.toggle("active");

      if (learnMoreButton.classList.contains("active")) {
        visionInfo.style.display = "block";
        // Use requestAnimationFrame to ensure display change happens before opacity
        requestAnimationFrame(() => {
          visionInfo.style.opacity = "1";
          visionInfo.style.maxHeight = "500px";
        });
      } else {
        visionInfo.style.opacity = "0";
        visionInfo.style.maxHeight = "0";
        
        // Remove display after transition
        setTimeout(() => {
          visionInfo.style.display = "none";
        }, 500); // Match transition time in CSS
      }
    });
  }

  // Contact button scroll
  const contactBtn = document.querySelector(".contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const contactForm = document.querySelector("#contact-form");
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Navigation active state management
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          event.preventDefault();
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

          // Remove active class from all links
          navLinks.forEach((nav) => nav.classList.remove("active"));

          // Add active class to clicked link
          link.classList.add("active");
        }
      }
    });
  });

  // Custom cursor implementation
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  // Use throttled event handling for cursor movement
  let cursorTimeout;
  document.addEventListener("mousemove", (e) => {
    if (!cursorTimeout) {
      cursorTimeout = setTimeout(() => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
        cursorTimeout = null;
      }, 10); // 10ms throttle
    }
  });

  // Adding interaction effect to expand the cursor when hovering over buttons or interactive elements
  const interactiveElements = document.querySelectorAll(
    "button, .button, .interactive-element, a, .gallery-item"
  );
  
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("expand");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("expand");
    });
  });

  // Image click effects
  const introImageContainer = document.querySelector(".intro-image");
  if (introImageContainer) {
    introImageContainer.addEventListener("click", (event) => {
      // Add zoom and rotation effect
      introImageContainer.classList.add("clicked");

      // Create ripple effect
      const ripple = document.createElement("div");
      ripple.classList.add("ripple");
      const rect = introImageContainer.getBoundingClientRect();
      ripple.style.left = `${event.clientX - rect.left - 50}px`;
      ripple.style.top = `${event.clientY - rect.top - 50}px`;
      introImageContainer.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Reset image after effect
      setTimeout(() => {
        introImageContainer.classList.remove("clicked");
      }, 1000);
    });
  }
});

// Scroll to top button
window.addEventListener("scroll", () => {
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  if (scrollToTopBtn) {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  }
  
  // Update progress bar
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollPosition / documentHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }
});

// Add event listener for scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  
  // Events section background color changing
  const eventsSection = document.querySelector(".events");
  if (eventsSection) {
    let colors = ["#3b4c6a", "#1e3c72", "#2a5298", "#6a11cb", "#2575fc"];
    let index = 0;

    function changeBackground() {
      eventsSection.style.background = `linear-gradient(45deg, ${colors[index]}, ${
        colors[(index + 1) % colors.length]
      })`;
      index = (index + 1) % colors.length;
    }

    setInterval(changeBackground, 3000);
  }
  
  // Accessibility focus styles for buttons
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("focus", () => {
      button.style.outline = "2px solid blue";
    });
    button.addEventListener("blur", () => {
      button.style.outline = "none";
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header ul');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
});

// JavaScript for mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
