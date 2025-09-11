// Welcome message

const welcomeOverlay = document.querySelector(".welcome-overlay");

setTimeout(() => {
    welcomeOverlay.classList.add("hidden");
}, 4000);

//=====================================================================================================================================================================

// Image Gallery

function openLightbox(src) {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  lightboxImage.src = src;
  lightbox.style.display = 'flex';
}

function closeLightbox(event) {
  event.stopPropagation(); // prevent clicking on img from closing immediately
  document.getElementById('imageLightbox').style.display = 'none';
}

//=====================================================================================================================================================================

// Media Queries for Team Carousel Section

document.addEventListener('DOMContentLoaded', function() {
    const teamCarousel = document.getElementById('teamCarousel');
            
    // Store original HTML structure
    const inner = teamCarousel.querySelector('.carousel-inner');
    inner.dataset.originalHtml = inner.innerHTML;
            
    function adjustTeamCarousel() {
        const screenWidth = window.innerWidth;
                
        // Restore original structure
        inner.innerHTML = inner.dataset.originalHtml;
                
        // If on large screen, keep original varying card layout
        if (screenWidth >= 992) {
            return;
        }
                
        // For smaller screens, reorganize into consistent slides
        const cards = Array.from(inner.querySelectorAll('.member-card'));
        inner.innerHTML = '';
                
        // Determine cards per slide based on screen width
        let cardsPerSlide = 1;
        if (screenWidth >= 768) {
            cardsPerSlide = 2;
        }
                
        // Create new slides with consistent card numbers
        const newSlides = [];

        for (let i = 0; i < cards.length; i += cardsPerSlide) {
            const item = document.createElement('div');
            item.classList.add('carousel-item');

            if (i === 0) item.classList.add('active');
                    
            const row = document.createElement('div');
            row.classList.add('row', 'g-4', 'justify-content-center');
                    
            for (let j = i; j < i + cardsPerSlide && j < cards.length; j++) {
                const col = document.createElement('div');
                col.classList.add('col-md-6');

                if (cardsPerSlide === 1) {
                    col.classList.add('col-lg-5'); //single card
                }
                        
                // Clone the card and add to column
                col.appendChild(cards[j].cloneNode(true));
                row.appendChild(col);
            }
                    
            item.appendChild(row);
            newSlides.push(item);
        }
                
        // Add new slides to carousel
        newSlides.forEach(slide => inner.appendChild(slide));
    }
            
    // Initial adjustment
    adjustTeamCarousel();
            
    // Adjust on window resize
    window.addEventListener('resize', adjustTeamCarousel);
});

//=====================================================================================================================================================================

// Media Queries for Menu Carousels Section

document.addEventListener('DOMContentLoaded', function () {
    // Get only the menu section carousels by their IDs
    const menuCarouselIds = [
        'juiceCarousel',
        'milkshakeCarousel', 
        'smoothiesCarousel',
        'icedCoffeeCarousel',
        'hotDrinksCarousel',
        'dessertCarousel'
    ];
    
    const menuCarousels = menuCarouselIds.map(id => document.getElementById(id)).filter(carousel => carousel);

    function adjustMenuCarouselItems() {
        menuCarousels.forEach(carousel => {
            const inner = carousel.querySelector('.carousel-inner');
            const cards = Array.from(inner.querySelectorAll('.col-lg-4, .col-md-6'));

            // Remove previously generated slides
            if (inner.dataset.originalHtml) {
                inner.innerHTML = inner.dataset.originalHtml;
            } else {
                inner.dataset.originalHtml = inner.innerHTML;
            }

            // Determine how many cards per slide based on screen width
            let cardsPerSlide = 3;
            if (window.innerWidth <= 768) {
                cardsPerSlide = 1;
            } else if (window.innerWidth <= 992) {
                cardsPerSlide = 2;
            }

            const newSlides = [];
            for (let i = 0; i < cards.length; i += cardsPerSlide) {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                if (i === 0) item.classList.add('active');

                const row = document.createElement('div');
                row.classList.add('row', 'g-4', 'justify-content-center');

                for (let j = i; j < i + cardsPerSlide && j < cards.length; j++) {
                    row.appendChild(cards[j].cloneNode(true));
                }

                item.appendChild(row);
                newSlides.push(item);
            }

            inner.innerHTML = '';
            newSlides.forEach(slide => inner.appendChild(slide));
        });
    }

    // Apply on load and resize
    if (menuCarousels.length > 0) {
        adjustMenuCarouselItems();
        window.addEventListener('resize', adjustMenuCarouselItems);
    }
});

//=====================================================================================================================================================================

// Reservation Form

document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date/time to current moment
    const dateInput = document.getElementById('bookingDate');
    const now = new Date();
    const minDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    dateInput.min = minDateTime;

    // Form elements
    const form = document.getElementById('bookTableForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const people = document.getElementById('people');

    // Validation functions
    function validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,14}$/;
        if (!nameRegex.test(name.value.trim())) {
            const errorField = document.getElementById(`${fieldName}Error`);
            errorField.textContent = 'Must start with capital, 3-15 letters, no numbers/special chars';
            name.classList.add('is-invalid');
            return false;
        }
        name.classList.remove('is-invalid');
        return true;
    }

    function validatePhone() {
        if (phone.value.length !== 11 || !/^\d+$/.test(phone.value)) {
            document.getElementById('phoneError').textContent = 'Phone must be exactly 11 digits';
            phone.classList.add('is-invalid');
            return false;
        }
        phone.classList.remove('is-invalid');
        return true;
    }

    function validatePeople() {
        if (people.value < 1 || people.value > 25) {
            document.getElementById('peopleError').textContent = 'Please enter between 1-25 people';
            people.classList.add('is-invalid');
            return false;
        }
        people.classList.remove('is-invalid');
        return true;
    }

    function validateDate() {
        const selectedDate = new Date(dateInput.value);
        if (selectedDate < now) {
            document.getElementById('dateError').textContent = 'Please select a future date and time';
            dateInput.classList.add('is-invalid');
            return false;
        }
        dateInput.classList.remove('is-invalid');
        return true;
    }

    // Event listeners for real-time validation
    firstName.addEventListener('blur', () => validateName(firstName, 'firstName'));
    lastName.addEventListener('blur', () => validateName(lastName, 'lastName'));
    phone.addEventListener('blur', validatePhone);
    people.addEventListener('blur', validatePeople);
    dateInput.addEventListener('change', validateDate);

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isFirstNameValid = validateName(firstName, 'firstName');
        const isLastNameValid = validateName(lastName, 'lastName');
        const isPhoneValid = validatePhone();
        const isPeopleValid = validatePeople();
        const isDateValid = validateDate();

        if (isFirstNameValid && isLastNameValid && isPhoneValid && isPeopleValid && isDateValid) {
            alert("Reservation is done successfully!");
            form.reset();
        } else {
            // Focus on first invalid field
            const invalidField = document.querySelector('.is-invalid');
            if (invalidField) {
                invalidField.focus();
            }
        }
    });

    // Phone number length restriction
    phone.addEventListener('input', function() {
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
    });
});

//=====================================================================================================================================================================

// Comments Form

const commentForm = document.querySelector('.comment-form');

if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const firstNameInput = this.querySelector('input[placeholder="First Name"]');
        const lastNameInput = this.querySelector('input[placeholder="Last Name"]');
        const commentText = this.querySelector('textarea');
        
        // Validation regex - first capital, rest lowercase, 3-15 letters
        const nameRegex = /^[A-Z][a-z]{2,14}$/;
        
        // Validate First Name
        if (!nameRegex.test(firstNameInput.value)) {
            alert('First name must:\n- Start with capital letter\n- All other letters lowercase\n- Contain only letters\n- Be 3-15 characters long');
            firstNameInput.focus();
            return;
        }
        
        // Validate Last Name
        if (!nameRegex.test(lastNameInput.value)) {
            alert('Last name must:\n- Start with capital letter\n- All other letters lowercase\n- Contain only letters\n- Be 3-15 characters long');
            lastNameInput.focus();
            return;
        }
        
        // Validate Comment
        if (commentText.value.trim().length < 10) {
            alert('Please provide a more detailed comment (at least 10 characters)');
            commentText.focus();
            return;
        }
        
        // If all validations pass
        this.submit();
        this.reset();
        alert('Thank you for your feedback!');
    });
}

//=====================================================================================================================================================================

/* Scroll to Top */

document.addEventListener('DOMContentLoaded', function() {
            const scrollTopBtn = document.getElementById("scrollTopBtn");

            // Show/Hide the button on scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 2000) { //
                    scrollTopBtn.style.display = "block";
                } else {
                    scrollTopBtn.style.display = "none";
                }
            });

            // Scroll to top after clicking on button
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
});