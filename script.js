// Initialize Typed.js
document.addEventListener('DOMContentLoaded', function() {
  // Typing animation
  new Typed('.type', {
    strings: ['Tailored.', 'Automatic.', 'Accessible.', 'Taxedo.'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: false
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Form submission handling
  const form = document.querySelector('.signup-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('.signup-button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    // Get form data
    const formData = {
      name: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      state: form.querySelector('select').value,
      timestamp: new Date().toISOString()
    };

    try {
      // First, make the fetch request
      const response = await fetch('https://script.google.com/macros/s/AKfycbzr442pG3NUKzN4vEqMRQd1JpJuzkFqatZc-AhaCncdIG4P9vlRJoOH4hTqgegzURpV/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Since 'no-cors' mode will always return "opaque" response
      // we'll assume success if we get here without an error
      form.innerHTML = '<p style="color: var(--accent-gold-light); font-size: 1.2rem;">Thank you for signing up! We\'ll be in touch soon.</p>';
      
    } catch (error) {
      console.error('Error:', error);
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      alert('Sorry, there was an error submitting the form. Please try again.');
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-out');
  observer.observe(section);
}); 