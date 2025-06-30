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
        }, 10000); // Change slide every 10 seconds
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

// Function to show full screen image with animation
function showFullScreenImage(img) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-0';
    modal.style.transition = 'background-opacity 0.3s ease';
    
    modal.innerHTML = `
        <div class="relative max-w-4xl w-full opacity-0" style="transition: opacity 0.4s ease, transform 0.4s ease; transform: translateY(20px);">
            <img src="${img.src}" alt="${img.alt}" class="w-full h-auto max-h-[90vh] object-contain shadow-2xl rounded-lg">
            <button class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300" onclick="closeModal(this)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal appearance
    requestAnimationFrame(() => {
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        const modalContent = modal.querySelector('div');
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Add ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Function to close modal with animation
function closeModal(element) {
    const modal = element.closest('.fixed');
    const modalContent = modal.querySelector('div');
    
    // Animate out
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    
    // Remove after animation completes
    setTimeout(() => {
        modal.remove();
    }, 400);
}

// Make functions available globally
window.showFullScreenImage = showFullScreenImage;
window.closeModal = closeModal;