// Main JavaScript file for portfolio site

// Additional fullPage.js customizations
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements when they come into view
  const animateOnScroll = function() {
      const sections = document.querySelectorAll('.section');
      
      sections.forEach(section => {
          // Add animation classes to elements within active sections
          if (section.classList.contains('active')) {
              const animatedElements = section.querySelectorAll('.animate-on-scroll');
              animatedElements.forEach(el => {
                  el.classList.add('animated');
              });
          }
      });
  };

  // Run on page load
  animateOnScroll();
  
  // Add to fullPage.js afterLoad callback
  if (typeof fullpage_api !== 'undefined') {
      fullpage_api.setAllowScrolling(true);
      
      // Add custom event for fullPage.js
      document.addEventListener('fullpage_api_afterLoad', animateOnScroll);
  }
  
  // Handle form submissions with feedback
  const contactForm = document.querySelector('form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          // Form validation could be added here
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;
          
          if (!email || !message) {
              e.preventDefault();
              alert('Please fill out all fields');
              return false;
          }
          
          // If using AJAX form submission, you could add that here
      });
  }
});

// Project Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slideWrapper = document.querySelector('.project-slide-wrapper');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    const dots = document.querySelectorAll('.project-dots button');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Initialize
    updateSlider();
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    });
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Update slider position and active dot
    function updateSlider() {
        // Update slide position
        slideWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-red-600');
            } else {
                dot.classList.remove('bg-red-600');
                dot.classList.add('bg-gray-300');
            }
        });
        
        // Show/hide navigation buttons if needed
        if (slideCount <= 1) {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        }
    }
    
    // Auto-slide (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide
    if (slideCount > 1) {
        startAutoSlide();
        
        // Stop auto-slide on hover
        document.querySelector('.project-slider').addEventListener('mouseenter', stopAutoSlide);
        document.querySelector('.project-slider').addEventListener('mouseleave', startAutoSlide);
    }
});
