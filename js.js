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
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    el.classList.add("active");
    showSection(section);
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

// Observe the parent container
const companyRow = document.querySelector('.company-row');
if (companyRow) companyCardsObserver.observe(companyRow);

