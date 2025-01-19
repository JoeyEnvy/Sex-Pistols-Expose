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
