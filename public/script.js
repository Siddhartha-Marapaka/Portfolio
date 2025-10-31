document.addEventListener("DOMContentLoaded", function () {
  // Active nav link based on location
  const links = document.querySelectorAll("nav ul li a");
  links.forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname) {
      link.classList.add("active");
    }
  });

  // Hamburger toggle
  const ham = document.querySelector(".hamburger");
  const navUl = document.querySelector("nav ul");
  if (ham && navUl) {
    ham.addEventListener("click", () => {
      navUl.classList.toggle("open");
      const expanded = navUl.classList.contains("open");
      ham.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  // Close mobile menu when link is clicked
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navUl.classList.remove("open");
      ham.setAttribute("aria-expanded", "false");
    });
  });
});

// Skill bar animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('.skill');
  const skillLevels = document.querySelectorAll('.skill-level');
  let animated = false;

  function animateSkills() {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (sectionTop < screenPosition && !animated) {
      skillLevels.forEach(level => {
        level.style.width = level.dataset.level;
      });
      animated = true; // animate only once
    }
  }

  window.addEventListener('scroll', animateSkills);
  animateSkills(); // in case already in view
});
