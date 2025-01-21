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


//videos section 

document.querySelectorAll('.video-preview').forEach(video => {
    // Already muted and looping in HTML, so remove play/pause logic
    video.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.25)';
    });

    video.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
    });
});

