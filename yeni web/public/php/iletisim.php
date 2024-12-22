<?php
// iletisim.php
require_once 'baglantı.php'; // Bağlantı dosyasını dahil edin

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form verilerini al
    $name = $_POST["ad"] ?? '';
    $email = $_POST["email"] ?? '';
    $subject = $_POST["konu"] ?? '';
    $message = $_POST["mesaj"] ?? '';

    // Boş alan kontrolü
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        header("Location: ../../../iletisim.html?status=error&message=Tüm alanları doldurun");
        exit();
    }

    // Veritabanına kaydet
    $sql = "INSERT INTO iletisim (ad, email, konu, mesaj) VALUES (?, ?, ?, ?)";

    // Hazırlık aşaması
    if ($stmt = mysqli_prepare($conn, $sql)) {
        // Parametreleri bağla
        mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $subject, $message);

        // Sorguyu çalıştır
        if (mysqli_stmt_execute($stmt)) {
            header("Location: ../../../iletisim.html?status=success&message=Mesajınız başarıyla gönderildi");
        } else {
            header("Location: ../../../iletisim.html?status=error&message=Mesaj gönderilemedi");
        }

        // Sorguyu kapat
        mysqli_stmt_close($stmt);
    } else {
        header("Location: ../../../iletisim.html?status=error&message=Sorgu hazırlama hatası");
    }

    // Bağlantıyı kapat
    mysqli_close($conn);
} else {
    header("Location: ../../../iletisim.html");
}
exit();
?>



NOT:
İletişim formu PHP kodu - kullanıcıdan gelen ad, email, konu ve mesaj bilgilerini kontrol edip veritabanına kaydediyor ve sonucu kullanıcıya bildiriyor.