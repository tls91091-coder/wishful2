/* scripts/main.js
   - Mobile nav toggle
   - Basic client-side form validation for sign-in & suggestion/contact forms
   - Gallery lightbox modal
*/

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle (shared behavior)
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      const isHidden = mainNav.getAttribute('aria-hidden') === 'false';
      mainNav.setAttribute('aria-hidden', String(!isHidden));
    });
    // initialize attributes
    mainNav.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  // Basic sign-in form validation
  const signin = document.getElementById('signin-form');
  if (signin) {
    signin.addEventListener('submit', function (e) {
      const email = signin.querySelector('#email');
      const password = signin.querySelector('#password');
      if (!email.value || !password.value) {
        e.preventDefault();
        alert('Please enter an email and password.');
        email.focus();
      }
    });
  }

  // Suggestions form: basic required check
  const suggestionForm = document.getElementById('suggestion-form');
  if (suggestionForm) {
    suggestionForm.addEventListener('submit', function (e) {
      const textarea = suggestionForm.querySelector('#suggestion');
      if (!textarea.value.trim()) {
        e.preventDefault();
        alert('Please write a suggestion before sending.');
        textarea.focus();
      } else {
        e.preventDefault();
        alert('Thanks — your suggestion has been noted (demo).');
        textarea.value = '';
      }
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const name = contactForm.querySelector('#contact-name');
      const email = contactForm.querySelector('#contact-email');
      const message = contactForm.querySelector('#contact-message');
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        e.preventDefault();
        alert('Please complete all fields before sending.');
        (name.value.trim() ? email : name).focus();
      } else {
        e.preventDefault();
        alert('Thanks — your message has been noted (demo).');
        contactForm.reset();
      }
    });
  }

  // Gallery: lightbox modal
  const galleryImages = document.querySelectorAll('.gallery-image');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  if (galleryImages.length && lightbox) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
    });
  }
});
