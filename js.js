function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}
  function setActive(el, section) {
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    el.classList.add("active");
    showSection(section); 
  }

AOS.init();
// Call setActive for default section on page load
document.addEventListener("DOMContentLoaded", function () {
  setActive(document.querySelector('.nav-link.active'), 'home');
});



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view'); // reset when out of view
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-left, .animate-right,.aboutcardbody,.aboutTipscard').forEach(el => {
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".home-choose-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const card = entry.target;
      const index = [...cards].indexOf(card);

      if (entry.isIntersecting) {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 200);
      } else {
        card.classList.remove("show");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});
document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('admissionForm');
            const formSection = document.getElementById('admissionFormSection');
            const successSection = document.getElementById('successMessageSection');
            const submitAnotherBtn = document.getElementById('submitAnotherApplication');

            function validateForm() {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');

                requiredFields.forEach(field => {
                    const errorElement = document.getElementById('error-' + field.id);
                    if (field.value.trim() === '' || (field.tagName === 'SELECT' && field.value === '')) {
                        errorElement.style.display = 'block';
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        errorElement.style.display = 'none';
                        field.classList.remove('is-invalid');
                    }
                });

                return isValid;
            }

            // Form submission handler
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent default submission
                
                if (!validateForm()) {
                    return; 
                }
                
                // Form ko Hide karke Success Message dikhana (Image 2)
                formSection.classList.add('d-none');
                successSection.classList.remove('d-none');
            });

            // Submit Another Application button click handler
            submitAnotherBtn.addEventListener('click', function() {
                // Form ko wapas lana
                successSection.classList.add('d-none');
                formSection.classList.remove('d-none');
                form.reset(); // Form fields ko clear karna
            });
        });

  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(
      ".about-img div, .about-content h4, .about-content p, .about-content h3"
    );

    function animateOnScroll() {
      elements.forEach((el, index) => {
        const position = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // jab element viewport me aaye
        if (position < windowHeight - 100) {
          // staggered delay (smooth ek ek karke aayenge)
          setTimeout(() => {
            el.classList.add("animate");
          }, index * 150);
        }
      });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // initial check
  });




document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector("#homeTeamCarousel .carousel-inner");

  function autoSlide() {
    const cards = carouselInner.querySelectorAll(".col-lg-3, .col-md-6, .col-sm-6");
    if (cards.length === 0) return;

    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth;

    // Smooth scroll effect
    carouselInner.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });

    // After scroll animation, move first card to end
    setTimeout(() => {
      carouselInner.appendChild(firstCard);
      carouselInner.scrollTo({ left: 0, behavior: "instant" }); // Reset scroll instantly
    }, 600); // 600ms = smooth scroll duration
  }

  // Auto move every 2 seconds
  setInterval(autoSlide, 2000);
});

