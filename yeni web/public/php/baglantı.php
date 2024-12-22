<?php
// baglanti.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "baklava";

// MySQL bağlantısını oluşturma
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if (!$conn) {
    die("Bağlantı başarısız: " . mysqli_connect_error());
}
?>

NOT:
MySQL veritabanına bağlantı kuran temel PHP kodu - "baklava" adlı veritabanına localhost üzerinden root kullanıcısıyla bağlanıyor.