document.addEventListener("DOMContentLoaded", function () {
    // SLIDER 
    let currentIndex = 0;
    let images = document.querySelectorAll('.slider-image');
    let totalImages = images.length;
    let slideInterval;
    let isPlaying = true;
  
  
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const pausePlayBtns = document.querySelectorAll('.pause-play-btn');
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateSlider();
    }
  
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateSlider();
    }
  
    function updateSlider() {
      const slider = document.querySelector('.slider');
      if (slider) {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        document.querySelectorAll('.slide').forEach((slide, i) => {
          slide.classList.toggle('active', i === currentIndex);
        });
      }
    }
  
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 3000);
    }
  
    function pauseAutoSlide() {
      clearInterval(slideInterval);
    }
  
    function resetAutoSlide() {
      pauseAutoSlide();
      startAutoSlide();
    }
  
    nextBtns.forEach(btn =>
      btn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      })
    );
    prevBtns.forEach(btn =>
      btn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      })
    );
    pausePlayBtns.forEach(btn =>
      btn.addEventListener('click', () => {
        if (isPlaying) {
          pauseAutoSlide();
          isPlaying = false;
          btn.textContent = 'Play';
        } else {
          startAutoSlide();
          isPlaying = true;
          btn.textContent = 'Pause';
        }
      })
    );
  
    startAutoSlide();
  
    //  FORM VALIDATION 
    const form = document.getElementById("contactForm");
    if (!form) return;
  
    function isOnlyLetters(str) {
      return /^[A-Za-z]+$/.test(str);
    }
  
    document.getElementById("title").addEventListener("focusout", function () {
      const error = document.getElementById("error-title");
      error.textContent = this.value === "" ? "Please choose a title." : "";
    });
  
    document.getElementById("firstName").addEventListener("focusout", function () {
      const val = this.value.trim();
      const error = document.getElementById("error-firstName");
      const isValid = val.length >= 4 && isOnlyLetters(val);
      error.textContent = isValid ? "" : "Only letters allowed, at least 4 characters.";
    });
  
    document.getElementById("lastName").addEventListener("focusout", function () {
      const val = this.value.trim();
      const error = document.getElementById("error-lastName");
      error.textContent = val.length >= 4 && isOnlyLetters(val) ? "" : "Only letters allowed, at least 4 characters.";
    });
  
    document.getElementById("address").addEventListener("focusout", function () {
      const val = this.value.trim();
      const error = document.getElementById("error-address");
      error.textContent = val.length >= 10 ? "" : "Address must be at least 10 characters.";
    });
  
    document.getElementById("zip").addEventListener("focusout", function () {
      const val = this.value.trim();
      const error = document.getElementById("error-zip");
      error.textContent = /^\d{5}$/.test(val) ? "" : "Enter a 5-digit ZIP code.";
    });
  
    document.getElementById("city").addEventListener("focusout", function () {
      const val = this.value.trim();
      const error = document.getElementById("error-city");
      error.textContent = isOnlyLetters(val) ? "" : "City must contain only letters.";
    });
  
    document.getElementById("email").addEventListener("focusout", function () {
      const val = this.value.trim();
      const error = document.getElementById("error-email");
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      error.textContent = pattern.test(val) ? "" : "Enter a valid email.";
    });
  
    document.getElementById("reason").addEventListener("focusout", function () {
      const val = this.value.trim();
      const error = document.getElementById("error-reason");
      error.textContent = val.length >= 10 ? "" : "Reason must be at least 10 characters.";
    });
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const errors = document.querySelectorAll(".error");
      const hasErrors = [...errors].some(err => err.textContent !== "");
      if (hasErrors) {
        alert("Please fix the errors before submitting.");
      } else {
        alert("Form submitted successfully!");
        form.reset();
      }
    });
  });
  
  
    //  NEWSLETTER EMAIL VALIDATION 
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("newsletterEmail");
        const error = document.getElementById("error-newsletter");
        const email = emailInput.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!pattern.test(email)) {
          error.textContent = "Enter a valid email address.";
        } else {
          error.textContent = "";
          alert("Thanks for subscribing!");
          newsletterForm.reset();
        }
      });
    }
  
    fetch('dummy.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('blog-container');
      data.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${post.img}" alt="${post.title}">
          <div class="card-content">
            <h2>${post.title}</h2>
            <p>${post.text.substring(0, 150)}...</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading blog:', err));