  window.addEventListener("load", function () {
    document.getElementById("loading").style.display = "none";
  });

  function showSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";

    // Jab section show ho to top pe scroll ho
    window.scrollTo(0, 0);
  }

function setActive(el, section) {
  // Remove "active" from all nav links
  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));

  // Add "active" to the clicked one
  el.classList.add("active");

  // Show the target section
  showSection(section);

  // ===== Instantly Close Bootstrap Offcanvas =====
  const offcanvasElement = document.querySelector('.offcanvas.show');
  if (offcanvasElement) {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) {
      offcanvasInstance.hide();

      // Remove backdrop instantly (Bootstrap sometimes keeps it for a moment)
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) backdrop.remove();

      // Restore body scroll immediately
      document.body.style.overflow = 'auto';
      document.body.classList.remove('offcanvas-backdrop', 'show');
    }
  }
}




AOS.init();






  const homeanimat = document.querySelectorAll('.home-anim');

  function animateHomeCards() {
    homeanimat.forEach((card, index) => {
      const pos = card.getBoundingClientRect().top;
      const winHeight = window.innerHeight;

      if (pos < winHeight - 100) {
        // Left to right animation staggered
        setTimeout(() => {
          card.classList.add('active');
        }, index * 300); // one by one from left
      }
    });

    // After all have appeared, trigger rise-up animation
    setTimeout(() => {
      homeanimat.forEach((card) => {
        card.classList.add('up');
      });
    }, 2000); // 2 seconds after initial animation
  }


  window.addEventListener('scroll', animateHomeCards);
  window.addEventListener('load', animateHomeCards);

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


//home js//
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".home-card-track");
  const cards = track.children; // live HTMLCollection

  const cardWidth = cards[0].offsetWidth;

  track.style.display = "flex"; // ensure horizontal layout
  track.style.transition = "transform 0.8s ease-in-out";

  let index = 0;

  setInterval(() => {
    index++;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // After transition, move the first card to the end
    setTimeout(() => {
      track.style.transition = "none"; // remove transition
      track.appendChild(track.firstElementChild); // move first card to end
      track.style.transform = `translateX(-${(index - 1) * cardWidth}px)`; // reset position
      track.offsetHeight; // force reflow
      track.style.transition = "transform 0.8s ease-in-out"; // restore transition
      index--; // adjust index
    }, 800); // match transition duration
  }, 3000);
});


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

//tipsg//
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150); // Ek ek karke delay
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});

//home end js//
const companyCardsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const cards = entry.target.querySelectorAll('.company-card');

    if (entry.isIntersecting) {
      // Add staggered animation
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate');
        }, index * 150);
      });
    } else {
      // Reset animation when cards go out of view
      cards.forEach(card => {
        card.classList.remove('animate');
        card.style.opacity = '0';
        card.style.transform = 'translateX(-60px)';
      });
    }
  });
}, { threshold: 0.3 });

// Founder
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

// Observe the parent container
const companyRow = document.querySelector('.company-row');
if (companyRow) companyCardsObserver.observe(companyRow);



// corses
document.addEventListener("DOMContentLoaded", function () {
  // Default tab
  const defaultTab = document.querySelector('#cousetab-all-tab');
  const defaultPane = document.querySelector('#cousetab-all');

  if (defaultTab && defaultPane) {
    defaultTab.classList.add('active');
    defaultPane.classList.add('show', 'active');
  }

  // Handle manual tab clicks
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

// Scroll
    const topBtn = document.getElementById('topBtn');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        topBtn.classList.add('show');
      } else {
        topBtn.classList.remove('show');
      }
    });

    // Optional: smooth scroll to top
    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
