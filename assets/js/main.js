document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Set default to dark mode for cinematic feel
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    });
  }

  // RTL Toggle
  const rtlToggle = document.getElementById('rtl-toggle');
  const html = document.documentElement;

  if (localStorage.getItem('dir') === 'rtl') {
    html.setAttribute('dir', 'rtl');
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (html.getAttribute('dir') === 'rtl') {
        html.setAttribute('dir', 'ltr');
        localStorage.setItem('dir', 'ltr');
      } else {
        html.setAttribute('dir', 'rtl');
        localStorage.setItem('dir', 'rtl');
      }
    });
  }

  // Sticky Navbar
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        navbar.style.background = body.classList.contains('dark-mode') ? 'rgba(7, 7, 7, 0.95)' : 'rgba(248, 248, 248, 0.95)';
      } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
        navbar.style.background = body.classList.contains('dark-mode') ? 'rgba(7, 7, 7, 0.8)' : 'rgba(248, 248, 248, 0.8)';
      }
    });
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    const heroTl = gsap.timeline();
    heroTl.from(".hero-subtitle", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 })
          .from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
          .from(".hero-cta", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5");

    // Fade up sections
    gsap.utils.toArray('.fade-up').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }

  // Swiper Init (Gallery / Testimonials)
  if (typeof Swiper !== 'undefined') {
    const gallerySwiper = new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }
});
