document.addEventListener("DOMContentLoaded", async () => {
    const webApp = window.Telegram.WebApp;

    // إعداد الواجهة
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

    const tonConnect = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: "https://kimou1992.github.io/kimkim/tonconnect-manifest.json",
    });

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

    connectButton.addEventListener("click", async () => {
        try {
            webApp.HapticFeedback.impactOccurred("light");
            await tonConnect.openModal();
        } catch (error) {
            console.error("Ошибка при открытии модального окна:", error);
        }
    });

    tonConnect.onStatusChange((wallet) => {
        if (wallet) {
            const walletAddress = wallet.account.address;
            localStorage.setItem("ton_wallet", walletAddress); // حفظ العنوان في localStorage
            walletAddressEl.textContent = "Подключенный кошелек: " + walletAddress;
        }
    });

    // حذف البيانات عند فصل الاتصال
    tonConnect.onDisconnect(() => {
        localStorage.removeItem("ton_wallet");
        walletAddressEl.textContent = ""; // إزالة النص من الصفحة
    });
});
