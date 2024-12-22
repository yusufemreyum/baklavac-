// messages.js
document.addEventListener('DOMContentLoaded', function() {
    // URL parametrelerini al
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');

    if (status && message) {
        // Mesaj kutusu oluştur
        const messageBox = document.createElement('div');
        messageBox.className = `alert alert-${status}`;
        messageBox.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
            background-color: ${status === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${status === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${status === 'success' ? '#c3e6cb' : '#f5c6cb'};
        `;
        messageBox.textContent = message;

        // Mesaj kutusunu sayfaya ekle
        document.body.appendChild(messageBox);

        // 3 saniye sonra mesaj kutusunu kaldır
        setTimeout(() => {
            messageBox.remove();
            // URL'den parametreleri temizle
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 3000);
    }
});