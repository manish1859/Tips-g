window.addEventListener("load", function () {
  document.getElementById("loading").style.display = "none";
});

function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  
  const sec = document.getElementById(id);
  if (sec) {
    sec.style.display = "block";
    localStorage.setItem("activeSection", id);
  }

  window.scrollTo(0, 0);
}

window.addEventListener("load", function () {
  document.getElementById("loading").style.display = "none";

  let hash = window.location.hash.replace("#", "");  // URL hash read karo
  let lastSection = localStorage.getItem("activeSection");

  if (hash) {
    showSection(hash);  // if URL has #Blog → Blog show
  } 
  else if (lastSection) {
    showSection(lastSection); // last visited section load
  } 
  else {
    showSection("home"); // default
  }

  // Active nav-link set karo
  document.querySelectorAll(".nav-link").forEach(link => {
    let id = link.getAttribute("onclick")?.match(/'(.*?)'/)?.[1];
    link.classList.toggle("active", id === hash || id === lastSection);
  });
});

function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  const target = document.getElementById(id);
  if (target) target.style.display = "block";
}

function setActive(el, section) {
  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
  el.classList.add("active");
  showSection(section);

  // section yaad rakho
  localStorage.setItem("activeSection", section);

  // offcanvas close logic
  const offcanvasElement = document.querySelector('.offcanvas.show');
  if (offcanvasElement) {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) {
      offcanvasInstance.hide();

      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) backdrop.remove();

      document.body.style.overflow = 'auto';
      document.body.classList.remove('offcanvas-backdrop', 'show');
    }
  }

  // scroll top par le jao
  window.scrollTo(0, 0);
}

AOS.init();

// Home section animation
const homeanimat = document.querySelectorAll('.home-anim');

function animateHomeCards() {
  homeanimat.forEach((card, index) => {
    const pos = card.getBoundingClientRect().top;
    const winHeight = window.innerHeight;

    if (pos < winHeight - 100) {
      setTimeout(() => {
        card.classList.add('active');
      }, index * 300);
    }
  });

  setTimeout(() => {
    homeanimat.forEach((card) => {
      card.classList.add('up');
    });
  }, 2000);
}

window.addEventListener('scroll', animateHomeCards);
window.addEventListener('load', animateHomeCards);

// Intersection animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.animate-left, .animate-right, .aboutcardbody, .aboutTipscard, .Eventcontainer, .concontainer, .gallery-header-container'
).forEach(el => {
  observer.observe(el);
});

// Stats section animation
const cards = document.querySelectorAll('.stats-card');

const bottom = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      bottom.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => bottom.observe(card));

// Tips section animation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

// Founder section animations
const companyCardsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const cards = entry.target.querySelectorAll('.company-card');

    if (entry.isIntersecting) {
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate');
        }, index * 150);
      });
    } else {
      cards.forEach(card => {
        card.classList.remove('animate');
        card.style.opacity = '0';
        card.style.transform = 'translateX(-60px)';
      });
    }
  });
}, { threshold: 0.3 });

const fadeElements = document.querySelectorAll('.fade-up');
const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -30px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

fadeElements.forEach(el => {
  appearOnScroll.observe(el);
});

const companyRow = document.querySelector('.company-row');
if (companyRow) companyCardsObserver.observe(companyRow);

document.addEventListener("DOMContentLoaded", function () {
  const defaultTab = document.querySelector('#cousetab-all-tab');
  const defaultPane = document.querySelector('#cousetab-all');

  if (defaultTab && defaultPane) {
    defaultTab.classList.add('active');
    defaultPane.classList.add('show', 'active');
  }

  const tabButtons = document.querySelectorAll('.cousetab-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('show', 'active'));
      button.classList.add('active');
      const targetId = button.getAttribute('data-bs-target');
      const targetPane = document.querySelector(targetId);
      if (targetPane) targetPane.classList.add('show', 'active');
    });
  });
});

// Scroll to top button

const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});

topBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ourteam
const teamMembers = [
  { name: "Emily Kim", role: "Founder", img: "https://img.freepik.com/free-photo/portrait-attractive-young-african-american-man-laughing_176420-13725.jpg?w=740", insta: "#", fb: "#", email: "emily@example.com", linkedin: "#" },
  { name: "Michael Steward", role: "Creative Director", img: "https://img.freepik.com/free-photo/young-pretty-woman-casual-outfit-posing-against-white-wall_231208-10022.jpg?w=740", insta: "#", fb: "#", email: "michael@example.com", linkedin: "#" },
  { name: "Emma Rodriguez", role: "Lead Developer", img: "https://img.freepik.com/free-photo/portrait-young-man-with-dark-hair_1262-18451.jpg?w=740", insta: "#", fb: "#", email: "emma@example.com", linkedin: "#" },
  { name: "Julia Gimmel", role: "UX Designer", img: "https://img.freepik.com/free-photo/portrait-young-woman-with-brown-long-hair_1262-18751.jpg?w=740", insta: "#", fb: "#", email: "julia@example.com", linkedin: "#" },
  { name: "Lisa Anderson", role: "Marketing Manager", img: "https://img.freepik.com/free-photo/young-man-with-dark-hair-beard_1262-18451.jpg?w=740", insta: "#", fb: "#", email: "lisa@example.com", linkedin: "#" },
  { name: "James Wilson", role: "Product Manager", img: "https://img.freepik.com/free-photo/cute-young-girl_23-2149179979.jpg?w=740", insta: "#", fb: "#", email: "james@example.com", linkedin: "#" }
];

const cards1 = document.querySelectorAll(".team-card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;

// === Update Card Content ===
function updateCardContent(card, memberData) {
  card.querySelector('img').src = memberData.img;
  card.querySelector('img').alt = memberData.name;

  card.querySelector('.overlay-name').textContent = memberData.name;
  card.querySelector('.overlay-role').textContent = memberData.role;

  const links = card.querySelectorAll('.social-links a');
  if (links.length >= 4) {
    links[0].href = memberData.insta;
    links[1].href = memberData.fb;
    links[2].href = `mailto:${memberData.email}`;
    links[3].href = memberData.linkedin;
  }
}

// === Update Carousel ===
function updateCarousel(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (newIndex + cards1.length) % cards1.length;

  cards1.forEach((card, i) => {
    const offset = (i - currentIndex + cards1.length) % cards1.length;
    const memberData = teamMembers[i];
    updateCardContent(card, memberData);

    card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

    if (offset === 0) card.classList.add("center");
    else if (offset === 1) card.classList.add("right-1");
    else if (offset === 2) card.classList.add("right-2");
    else if (offset === cards1.length - 1) card.classList.add("left-1");
    else if (offset === cards1.length - 2) card.classList.add("left-2");
    else card.classList.add("hidden");
  });

  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));

  memberName.style.opacity = "0";

  setTimeout(() => {
    memberName.textContent = teamMembers[currentIndex].name;
    memberName.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

// === Manual Controls ===
leftArrow.addEventListener("click", () => {
  updateCarousel(currentIndex - 1);
  resetAutoSlide();
});

rightArrow.addEventListener("click", () => {
  updateCarousel(currentIndex + 1);
  resetAutoSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    updateCarousel(i);
    resetAutoSlide();
  });
});

cards1.forEach((card, i) => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("center")) {
      updateCarousel(i);
      resetAutoSlide();
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    updateCarousel(currentIndex - 1);
    resetAutoSlide();
  } else if (e.key === "ArrowRight") {
    updateCarousel(currentIndex + 1);
    resetAutoSlide();
  }
});

// === Swipe Control ===
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
  stopAutoSlide();
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  startAutoSlide();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) updateCarousel(currentIndex + 1);
    else updateCarousel(currentIndex - 1);
  }
}

// === Auto Slide ===
let autoSlideInterval;

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    updateCarousel(currentIndex + 1);
  }, 2000); // every 4 seconds
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

const carouselContainer = document.querySelector(".carousel-container");
if (carouselContainer) {
  carouselContainer.addEventListener("mouseenter", stopAutoSlide);
  carouselContainer.addEventListener("mouseleave", startAutoSlide);
}

updateCarousel(0);
startAutoSlide();

