<?php
// bulten.php
require_once 'baglantı.php'; // Bağlantı dosyasını dahil edin

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"] ?? '';

    // Email kontrolü
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../../../index.html?status=error&message=Geçersiz email adresi");
        exit();
    }

    // Email adresi zaten kayıtlı mı kontrol et
    $check_sql = "SELECT id FROM bülten WHERE email = ?";
    if ($check_stmt = mysqli_prepare($conn, $check_sql)) {
        mysqli_stmt_bind_param($check_stmt, "s", $email);
        mysqli_stmt_execute($check_stmt);
        mysqli_stmt_store_result($check_stmt);

        if (mysqli_stmt_num_rows($check_stmt) > 0) {
            header("Location: ../../../index.html?status=error&message=Bu email adresi zaten kayıtlı");
            mysqli_stmt_close($check_stmt);
            exit();
        }
        mysqli_stmt_close($check_stmt);
    } else {
        header("Location: ../../../index.html?status=error&message=Veritabanı hatası");
        exit();
    }

    // Yeni kayıt ekle
    $sql = "INSERT INTO bülten (email) VALUES (?)";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $email);

        if (mysqli_stmt_execute($stmt)) {
            header("Location: ../../../index.html?status=success&message=Bültene başarıyla kaydoldunuz");
        } else {
            header("Location: ../../../index.html?status=error&message=Kayıt işlemi başarısız");
        }

        mysqli_stmt_close($stmt);
    } else {
        header("Location: ../../../index.html?status=error&message=Veritabanı hatası");
    }

    // Bağlantıyı kapat
    mysqli_close($conn);
} else {
    header("Location: ../../../index.html");
}
exit();
?>

NOT:
E-bülten kayıt sistemi PHP kodu - gelen email adresinin doğruluğunu kontrol edip, veritabanında varsa hata veriyor, yoksa kaydediyor ve kullanıcıya bilgi mesajı gösteriyor.