// slider.js
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const cards = document.querySelectorAll('.product-card');
    
    // Başlangıç değerleri
    let currentPosition = 0;
    let cardWidth = cards[0].offsetWidth + 20; // 20px gap değeri
    
    // Slider metriklerini güncelle
    function updateSliderMetrics() {
        cardWidth = cards[0].offsetWidth + 20;
        const visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
        const maxPosition = (cards.length - visibleCards) * cardWidth;
        return { maxPosition, visibleCards };
    }
    
    // Slider pozisyonunu güncelle
    function updateSliderPosition(position) {
        // Yumuşak geçiş için transition ekle
        slider.style.transition = 'transform 0.3s ease-in-out';
        slider.style.transform = `translateX(${position}px)`;
    }

    // Döngüsel geçiş için pozisyon hesapla
    function calculateCircularPosition(direction) {
        const { maxPosition, visibleCards } = updateSliderMetrics();
        
        if (direction === 'next') {
            if (currentPosition <= -maxPosition) {
                // Sona geldiğinde başa dön
                currentPosition = 0;
            } else {
                currentPosition -= cardWidth;
            }
        } else if (direction === 'prev') {
            if (currentPosition >= 0) {
                // Başa geldiğinde sona dön
                currentPosition = -maxPosition;
            } else {
                currentPosition += cardWidth;
            }
        }
        
        return currentPosition;
    }
    
    // Ok butonlarına tıklama olayları
    prevButton.addEventListener('click', () => {
        const newPosition = calculateCircularPosition('prev');
        updateSliderPosition(newPosition);
    });
    
    nextButton.addEventListener('click', () => {
        const newPosition = calculateCircularPosition('next');
        updateSliderPosition(newPosition);
    });
    
    // Pencere boyutu değiştiğinde slider'ı güncelle
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            cardWidth = cards[0].offsetWidth + 20;
            currentPosition = 0;
            updateSliderPosition(currentPosition);
        }, 250);
    });
    
    // Touch events için destek
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;
        const threshold = 50; // minimum kaydırma mesafesi
        
        if (Math.abs(swipeDistance) > threshold) {
            if (swipeDistance > 0) {
                // Sola kaydırma
                const newPosition = calculateCircularPosition('next');
                updateSliderPosition(newPosition);
            } else {
                // Sağa kaydırma
                const newPosition = calculateCircularPosition('prev');
                updateSliderPosition(newPosition);
            }
        }
    }
    
    // İlk yükleme için slider'ı hazırla
    updateSliderPosition(currentPosition);
});


// İletişim formu için
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch('php/iletisim.php', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            this.reset();
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
    });
});

// Bülten formu için
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    fetch('php/bulten.php', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            this.reset();
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
    });
});

// iletisim.html dosyasının en altına, </body> tag'inden önce ekleyin
<script>
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('php/iletisim.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            this.reset(); // Formu temizle
        } else {
            alert(data.errors ? data.errors.join('\n') : data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    });
});
</script>