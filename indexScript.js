document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.slide-button');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');
    let currentIndex = 0;

    function showButton(index) {
        buttons.forEach(button => button.classList.remove('active', 'sliding'));
        buttons[index].classList.add('active');
        buttons[index].classList.add('sliding');
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

    setInterval(showNextButton, 3000);

    leftArrow.addEventListener('click', showPrevButton);
    rightArrow.addEventListener('click', showNextButton);

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Smooth scrolling for all navbar links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

    // Scroll Progress Bar
    window.addEventListener('scroll', function() {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        
        if (scrollableHeight > 0) {
            const progress = (scrolled / scrollableHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    });
});


//hamburger menu 

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});


//info section video 

window.onload = function () {
    
    // Array of video files
    const videos = [
        'videos/1.mp4',
        'videos/3.mp4',
        'videos/4.mp4',
        'videos/5.mp4',
        'videos/6.mp4',
        'videos/7.mp4'
    ];

    // Get elements
    const videoPlayer = document.querySelector('#videoPlayer');
    const videoSource = document.querySelector('#videoSource');
    
	// Get control elements
	const playPauseButton = document.getElementById('playPauseButton');
	const progressBar = document.getElementById('progressBar');
	const playbackSpeed = document.getElementById('playbackSpeed');
	const changeVideoButton = document.getElementById('changeVideoButton');

	// Function to play a random video
	function playRandomVideo() {
		const randomVideo = videos[Math.floor(Math.random() * videos.length)];
		videoSource.src = randomVideo;

		videoPlayer.load();

		videoPlayer.addEventListener('loadedmetadata', function () {
			const randomStartTime = Math.random() * videoPlayer.duration;
			videoPlayer.currentTime = randomStartTime;
			videoPlayer.play();
		});
	}

	// Play or pause the video when the button is clicked
	playPauseButton.addEventListener('click', function () {
		if (videoPlayer.paused) {
			videoPlayer.play();
			playPauseButton.textContent = 'Pause';
		} else {
			videoPlayer.pause();
			playPauseButton.textContent = 'Play';
		}
	});

	// Update progress bar as the video plays
	videoPlayer.addEventListener('timeupdate', function () {
		const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100 || 0;
		progressBar.value = progress;
	});

	// Seek to a new position when progress bar is changed
	progressBar.addEventListener('input', function () {
		const newTime = (progressBar.value / 100) * videoPlayer.duration;
		videoPlayer.currentTime = newTime;
	});

	// Adjust playback speed using playback speed slider
	playbackSpeed.addEventListener('input', function () {
	    const speed = parseFloat(playbackSpeed.value);
	    videoPlayer.playbackRate = speed; // Adjust playback rate
	    console.log(`Playback Speed Set To ${speed}x`);
	});

	// Change to a random video when "Change Video" button is clicked
	changeVideoButton.addEventListener('click', playRandomVideo);

	// Play a random video on page load
	playRandomVideo();
};


//quote sllider between members and information 

const quoteContainer = document.querySelector('.quote-container');
const quotes = document.querySelectorAll('.quote');
let currentIndex = 0;

function slideQuotes() {
    currentIndex = (currentIndex + 1) % quotes.length;
    quoteContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(slideQuotes, 3000);


//badge slider before fammous people 

document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.badge-slide-container');
    let currentSlide = 0;

    function nextSlide() {
        currentSlide++;
        if (currentSlide > 2) currentSlide = 0;
        slideContainer.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    }

    setInterval(nextSlide, 3000);
});


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
    'EiMTH-S2w5c',
    'n7_yuWR4MLU',
    '5uOyv-kuDFo',
    'gCBlFa_T1tU',
    'gX84aDKuTEI',
    'S90mZFXesik',
    '74buo35OgWY',
    '66TUTHbtS9w',
    'F2ZL1tDA_LQ',
    'vuQGO103QtU',
    'NyLQBk222BA',
    'Z_2N7AyzhuU',
    'tiPxzC4Pf7Q',
    'SFt_rNp_b90',
    'PDPRBhmiowk'
];

let currentVideoIndex = 0;

function changeVideo(index) {
    currentVideoIndex = index;
    const mainPlayer = document.getElementById('mainPlayer');
    mainPlayer.src = `https://www.youtube.com/embed/${videoUrls[currentVideoIndex]}?autoplay=1&mute=0`;
}

document.getElementById('changeVideo').onclick = () => {
    changeVideo((currentVideoIndex + 1) % videoUrls.length);
};

window.onload = () => {
    changeVideo(0);
};

// Intersection Observer to play video when in view
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

    function updateLargePreview() {
        largePreview.querySelector('img').src = images[currentIndex];
    }

    function updateCarousel() {
        carousel.innerHTML = '';
        for (let i = 0; i < 5; i++) {
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

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLargePreview();
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
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
    }

    largePreview.addEventListener('click', () => {
        openFullscreen(images[currentIndex]);
    });

    wallImage.addEventListener('click', () => {
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

        nextBtn.addEventListener('click', () => {
            previewIndex = (previewIndex + 1) % images.length;
            updatePreview();
        });

        img.addEventListener('click', () => {
            openFullscreen(img.src);
        });

        updatePreview();
    });

    updateLargePreview();
    updateCarousel();

    // Randomly change wall image
    setInterval(() => {
        wallImage.querySelector('img').src = images[Math.floor(Math.random() * images.length)];
    }, 5000);
});
