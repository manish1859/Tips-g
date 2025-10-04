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