document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const icon = toggle.querySelector('i');

  const setTheme = (theme) => {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  };

  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);

  toggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Smooth Scroll
  document.querySelectorAll('a.smooth-scroll').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Back to Top
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('d-none', window.scrollY < 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Form Submit
  const form = document.getElementById('contactForm');
  const toast = new bootstrap.Toast(document.getElementById('successToast'));

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.checkValidity()) {
      const data = {
        name: form[0].value,
        email: form[1].value,
        type: form[2].value,
        message: form[3].value
      };
      // Simulate POST
      console.log('Sending:', data);
      form.reset();
      toast.show();
    } else {
      form.reportValidity();
    }
  });

  // Animation Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  // Active Nav
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 150) current = sec.getAttribute('id');
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
});