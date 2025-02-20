document.addEventListener("DOMContentLoaded", async () => {
    const webApp = window.Telegram.WebApp;

    document.documentElement.style.setProperty(
        "--tg-viewport-stable-height",
        `${webApp.viewportStableHeight}px`
    );

    webApp.onEvent("viewportChanged", (event) => {
        if (event.isStateStable) {
            document.documentElement.style.setProperty(
                "--tg-viewport-stable-height",
                `${webApp.viewportStableHeight}px`
            );
        }
    });

    webApp.expand();
    webApp.lockOrientation();
    webApp.disableVerticalSwipes();
    webApp.setHeaderColor("#000000");
    webApp.setBackgroundColor("#000000");
    webApp.ready();

    // زر الاتصال بالمحفظة
    const connectButton = document.getElementById("connectWallet");
    const walletAddressEl = document.getElementById("walletAddress");

    // التحقق عند تحميل الصفحة إذا كان هناك عنوان محفظة محفوظ
    const savedWallet = localStorage.getItem("ton_wallet");
    if (savedWallet) {
        walletAddressEl.textContent = "Подключенный кошелек: " + savedWallet;
    }

    document.fonts.ready.then(() => {
        connectButton.style.visibility = "visible";
        connectButton.style.opacity = "1";
    });

    // زر الدفع عبر TON
    const payButton = document.getElementById("payWithTON");

    payButton.addEventListener("click", () => {
        webApp.HapticFeedback.impactOccurred("medium");

        // عنوان المستلم والمبلغ المطلوب إرساله
        const recipient = "EQAC7jOqLudpRiHVtN2mcq8OIgtCyBeTxdyWTZlYmFpQVt-g"; // ضع عنوان المستلم هنا
        const amount = "1000000000"; // 1 TON (بالـ nanotons)

        // إنشاء رابط الدفع
        const tonDeepLink = `ton://transfer/${recipient}?amount=${amount}`;

        // فتح المحفظة مباشرة للدفع
        window.location.href = tonDeepLink;
    });
});
