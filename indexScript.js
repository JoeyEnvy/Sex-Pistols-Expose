document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.slide-button');
    let currentIndex = 0;

    function showNextButton() {
        buttons[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % buttons.length;
        buttons[currentIndex].classList.add('active');
    }

    setInterval(showNextButton, 5000); // Change button every 5 seconds

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('You clicked: ' + this.textContent);
        });
    });
});

window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (scrollable > 0) { // Prevent division by zero
        const progress = (scrolled / scrollable) * 100;
        scrollProgress.style.width = `${progress}%`;
    }
});
