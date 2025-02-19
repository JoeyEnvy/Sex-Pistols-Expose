document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.slide-button');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    const scrollProgress = document.querySelector('.scroll-progress');
    let currentIndex = 0;
    let autoScrollInterval;

    function showButton(index) {
        buttons.forEach(button => button.classList.remove('active', 'sliding'));
        buttons[index].classList.add('active', 'sliding');
        setTimeout(() => buttons[index].classList.remove('sliding'), 300);
    }

    function showNextButton() {
        currentIndex = (currentIndex + 1) % buttons.length;
        showButton(currentIndex);
    }

    function showPrevButton() {
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        showButton(currentIndex);
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(showNextButton, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    if (leftArrow) leftArrow.addEventListener('click', showPrevButton);
    if (rightArrow) rightArrow.addEventListener('click', showNextButton);

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Smooth scrolling for all navbar links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Combine scroll events and use requestAnimationFrame for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateScrollProgress();
                console.log('Page scrolled to:', window.scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateScrollProgress() {
        if (scrollProgress) {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            
            if (scrollableHeight > 0) {
                const progress = (scrolled / scrollableHeight) * 100;
                scrollProgress.style.width = `${progress}%`;
            }
        }
    }

    // Start auto-scroll on page load
    startAutoScroll();

    // Optional: Stop auto-scroll when user interacts with the page
    document.addEventListener('click', stopAutoScroll);
    document.addEventListener('scroll', stopAutoScroll);
});

window.addEventListener('load', function() {
    console.log('Page loaded');
    window.scrollTo(0, 0); // Ensure page starts at the top
});


//sex pistols top page quote slider 3 quotes 

document.addEventListener('DOMContentLoaded', function() {
    const quoteContainer = document.querySelector('.additional-title');
    const quotes = [
        "FORMERLY THE\nSEX PISTOLS EXPERIENCE",
        "TOUR INFORMATION BELOW\n2025", 
        "John Lydon:\n\"Good fucking luck with it\""
    ];
    let currentQuoteIndex = 0;

    function updateQuote() {
        // Fade out effect
        quoteContainer.style.opacity = 0;

        setTimeout(() => {
            // Update text content
            quoteContainer.textContent = quotes[currentQuoteIndex];
            // Fade in effect
            quoteContainer.style.opacity = 1;
            // Move to the next quote
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }, 500); // Match this delay with CSS transition time
    }

    // Initial display of the first quote
    quoteContainer.textContent = quotes[currentQuoteIndex];

    // Rotate quotes every 3 seconds
    setInterval(updateQuote, 3000);
});



//hamburger menu 

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});


//info section video 

document.addEventListener('DOMContentLoaded', function() {
    // Videos section
    const videos = [
        'videos/1.mp4',
        'videos/3.mp4',
        'videos/4.mp4',
        'videos/5.mp4',
        'videos/6.mp4',
        'videos/7.mp4'
    ];

    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const playPauseButton = document.getElementById('playPauseButton');
    const progressBar = document.getElementById('progressBar');
    const volumeControl = document.getElementById('volumeControl');
    const playbackSpeed = document.getElementById('playbackSpeed');
    const changeVideoButton = document.getElementById('changeVideoButton');

    function playRandomVideo() {
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        videoSource.src = randomVideo;
        videoPlayer.load();
        videoPlayer.addEventListener('loadedmetadata', function() {
            const randomStartTime = Math.random() * videoPlayer.duration;
            videoPlayer.currentTime = randomStartTime;
            videoPlayer.muted = true;
            videoPlayer.play().catch(e => console.error('Auto-play was prevented:', e));
        }, { once: true });
    }

    playPauseButton.addEventListener('click', function() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseButton.textContent = 'Pause';
        } else {
            videoPlayer.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    videoPlayer.addEventListener('timeupdate', function() {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener('input', function() {
        const time = (progressBar.value / 100) * videoPlayer.duration;
        videoPlayer.currentTime = time;
    });

    volumeControl.addEventListener('input', function() {
        videoPlayer.volume = this.value;
        videoPlayer.muted = (this.value === '0');
    });

    playbackSpeed.addEventListener('input', function() {
        videoPlayer.playbackRate = parseFloat(this.value);
    });

    changeVideoButton.addEventListener('click', playRandomVideo);

    // Initial setup
    videoPlayer.muted = true;
    volumeControl.value = 0;
    playRandomVideo();

    // Ensure video plays automatically when it becomes visible
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoPlayer.play().catch(e => console.error('Auto-play was prevented:', e));
            } else {
                videoPlayer.pause();
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(videoPlayer);

    // Lazy loading functionality for images
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});


//quote sllider between members and information 

// Quote slider



//shop sections




// Videos section
document.querySelectorAll('.video-preview').forEach(video => {
    video.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.muted = false;
        e.target.play();
    });

    video.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
        e.target.muted = true;
        e.target.pause();
    });

    video.addEventListener('click', (e) => {
        if (e.target.requestFullscreen) {
            e.target.requestFullscreen();
        } else if (e.target.webkitRequestFullscreen) { // Safari
            e.target.webkitRequestFullscreen();
        } else if (e.target.msRequestFullscreen) { // IE11
            e.target.msRequestFullscreen();
        }
    });
});

// Videos left column YouTube videos
const videoUrls = [
    'QMiCFUGKfJk',
    '7jSArFxkDJA',
    'n7_yuWR4MLU',
    '74buo35OgWY',
    'Z_2N7AyzhuU',
    'SFt_rNp_b90',
    'PDPRBhmiowk'
];

let currentVideoIndex = 0;

function changeVideo(index) {
    currentVideoIndex = index;
    const mainPlayer = document.getElementById('mainPlayer');
    mainPlayer.src = `https://www.youtube.com/embed/${videoUrls[currentVideoIndex]}?autoplay=1&mute=1`;
}

document.getElementById('changeVideo').onclick = () => {
    changeVideo((currentVideoIndex + 1) % videoUrls.length);
};

window.onload = () => {
    changeVideo(0);
};

// Add event listener to unmute video on click
document.getElementById('mainPlayer').addEventListener('click', function() {
    this.src = this.src.replace('mute=1', 'mute=0');
});

// Intersection Observer to load video when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const mainPlayer = document.getElementById('mainPlayer');
            if (!mainPlayer.src) {
                changeVideo(0);
            }
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.video-player-container'));

//gallery section 

document.addEventListener('DOMContentLoaded', function() {
    const leftColumn = document.querySelector('.gallery-left-column');
    const rightColumn = document.querySelector('.gallery-right-column');

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    console.log('Window width:', window.innerWidth);
    console.log('Is mobile:', isMobile);

    // Left column setup
    const largePreview = document.createElement('div');
    largePreview.className = 'large-preview';
    largePreview.innerHTML = '<img src="" alt="Large Preview">';
    
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button prev';
    prevButton.textContent = '◀';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button next';
    nextButton.textContent = '▶';

    leftColumn.appendChild(largePreview);
    leftColumn.appendChild(carousel);
    leftColumn.appendChild(prevButton);
    leftColumn.appendChild(nextButton);

    // Right column setup
    const wallImage = document.createElement('div');
    wallImage.className = 'right-column-wall';
    wallImage.innerHTML = '<img src="" alt="Wall Image">';

    const previews = document.createElement('div');
    previews.className = 'right-column-previews';
    previews.innerHTML = `
        <div class="preview-container">
            <img src="" alt="Preview 1" class="preview-image">
            <button class="preview-button prev">◀</button>
            <button class="preview-button next">▶</button>
        </div>
        <div class="preview-container">
            <img src="" alt="Preview 2" class="preview-image">
            <button class="preview-button prev">◀</button>
            <button class="preview-button next">▶</button>
        </div>
    `;

    rightColumn.appendChild(wallImage);
    rightColumn.appendChild(previews);

    const images = [];
    for (let i = 2; i <= 133; i++) {
        images.push(`images/gallery/${i}.jpeg`);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(images);

    let currentIndex = 0;

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    async function updateLargePreview() {
        try {
            const img = await loadImage(images[currentIndex]);
            largePreview.querySelector('img').src = img.src;
        } catch (error) {
            console.error('Failed to load image:', error);
            // Handle the error (e.g., display a placeholder image)
            largePreview.querySelector('img').src = 'path/to/placeholder.jpg';
        }
    }

    function getCarouselImagesCount() {
        if (isMobile) {
            if (window.innerWidth <= 320) return 2;
            if (window.innerWidth <= 480) return 3;
            if (window.innerWidth <= 768) return 4;
            if (window.innerWidth <= 1024) return 4;
        }
        return 5;
    }

    function updateCarousel() {
        carousel.innerHTML = '';
        const carouselImages = getCarouselImagesCount();
        console.log('Carousel images count:', carouselImages);
        for (let i = 0; i < carouselImages; i++) {
            const index = (currentIndex + i) % images.length;
            const img = document.createElement('img');
            img.src = images[index];
            img.alt = `Carousel Image ${index + 1}`;
            img.className = 'carousel-image';
            img.addEventListener('click', () => {
                currentIndex = index;
                updateLargePreview();
                updateCarousel();
            });
            carousel.appendChild(img);
        }
    }

    function addTouchSupport(element, callback) {
        element.addEventListener('touchstart', function(e) {
            callback();
            e.preventDefault();
        }, false);
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLargePreview();
        updateCarousel();
    });
    addTouchSupport(prevButton, () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLargePreview();
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLargePreview();
        updateCarousel();
    });
    addTouchSupport(nextButton, () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLargePreview();
        updateCarousel();
    });

    function openFullscreen(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'fullscreen-modal';
        modal.innerHTML = `
            <img src="${imageSrc}" alt="Fullscreen Image" class="fullscreen-image">
            <span class="close-fullscreen">&times;</span>
        `;
        document.body.appendChild(modal);

        modal.style.display = 'flex';
        modal.querySelector('.close-fullscreen').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        addTouchSupport(modal.querySelector('.close-fullscreen'), () => {
            document.body.removeChild(modal);
        });
    }

    largePreview.addEventListener('click', () => {
        openFullscreen(images[currentIndex]);
    });
    addTouchSupport(largePreview, () => {
        openFullscreen(images[currentIndex]);
    });

    wallImage.addEventListener('click', () => {
        openFullscreen(wallImage.querySelector('img').src);
    });
    addTouchSupport(wallImage, () => {
        openFullscreen(wallImage.querySelector('img').src);
    });

    // Setup preview images in right column
    const previewContainers = previews.querySelectorAll('.preview-container');
    previewContainers.forEach((container, index) => {
        const img = container.querySelector('img');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        let previewIndex = index;

        function updatePreview() {
            img.src = images[previewIndex];
        }

        prevBtn.addEventListener('click', () => {
            previewIndex = (previewIndex - 1 + images.length) % images.length;
            updatePreview();
        });
        addTouchSupport(prevBtn, () => {
            previewIndex = (previewIndex - 1 + images.length) % images.length;
            updatePreview();
        });

        nextBtn.addEventListener('click', () => {
            previewIndex = (previewIndex + 1) % images.length;
            updatePreview();
        });
        addTouchSupport(nextBtn, () => {
            previewIndex = (previewIndex + 1) % images.length;
            updatePreview();
        });

        img.addEventListener('click', () => {
            openFullscreen(img.src);
        });
        addTouchSupport(img, () => {
            openFullscreen(img.src);
        });

        updatePreview();
    });

    function adjustLayoutForMobile() {
        if (isMobile) {
            leftColumn.style.width = '100%';
            rightColumn.style.width = '100%';
            // Add any other mobile-specific adjustments
        }
    }

    adjustLayoutForMobile();
    updateLargePreview();
    updateCarousel();

    // Randomly change wall image
    setInterval(() => {
        wallImage.querySelector('img').src = images[Math.floor(Math.random() * images.length)];
    }, 5000);

    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        console.log('Window resized. New width:', window.innerWidth);
        adjustLayoutForMobile();
        updateCarousel();
    }, 250));

    // Debounce function to limit the rate at which a function can fire
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});



//logo part 

function adjustLogoHeight() {
    const logoSection = document.querySelector('.logo-section-responsive');
    if (window.innerWidth <= 575.98) {
        logoSection.style.height = '20vh';
    } else if (window.innerWidth <= 767.98) {
        logoSection.style.height = '25vh';
    } else if (window.innerWidth <= 991.98) {
        logoSection.style.height = '30vh';
    } else if (window.innerWidth <= 1199.98) {
        logoSection.style.height = '35vh';
    } else {
        logoSection.style.height = '50vh';
    }
}

window.addEventListener('resize', adjustLogoHeight);
adjustLogoHeight(); // Call once on page load






//BACKTOTOP 



    // Smooth scroll to top functionality
    document.querySelectorAll('.back-to-top').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });




//contact section form parts and lazy loading 

// Initialize EmailJS with your public key
(function() {
    emailjs.init("i80sxC4oCU-8VMJFL");
})();

document.getElementById('punk-rock-contact-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Collect form data
    var templateParams = {
        to_name: "Joe Mort",  // Name of the person receiving the email
        from_name: document.getElementById("punk-first-name").value + " " + document.getElementById("punk-last-name").value,
        from_email: document.getElementById("punk-email").value,
        message: document.getElementById("punk-message").value,
        reply_to: document.getElementById("punk-email").value
    };

    // Send email using EmailJS
    emailjs.send("service_9lq4npt", "template_0drkhxd", templateParams)
    .then(function(response) {
        alert("Your message has been sent successfully!");
        document.getElementById('punk-rock-contact-form').reset(); // Clear the form after successful submission
    }, function(error) {
        alert("Oops! Something went wrong. Please try again.");
        console.error('EmailJS Error:', error);  // Log the error to the console for debugging
    });
});

// Lazy loading implementation
document.addEventListener("DOMContentLoaded", function() {
    var lazyElements = [].slice.call(document.querySelectorAll(".lazy"));

    if ("IntersectionObserver" in window) {
        let lazyObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyElement = entry.target;
                    if (lazyElement.tagName.toLowerCase() === 'iframe') {
                        lazyElement.src = lazyElement.dataset.src;
                    } else if (lazyElement.tagName.toLowerCase() === 'img') {
                        lazyElement.src = lazyElement.dataset.src;
                    }
                    lazyElement.classList.remove("lazy");
                    lazyObserver.unobserve(lazyElement);
                }
            });
        });

        lazyElements.forEach(function(lazyElement) {
            lazyObserver.observe(lazyElement);
        });
    }
});


//contactsubmitbuttonresponsitivity 

function adjustButtonFontSize() {
    if (window.innerWidth <= 480) {
        document.querySelector('.punk-submit-button').style.fontSize = '0.9rem';
    } else {
        document.querySelector('.punk-submit-button').style.fontSize = ''; // Reset to default
    }
}

window.addEventListener('resize', adjustButtonFontSize);
adjustButtonFontSize(); // Call once on page load
