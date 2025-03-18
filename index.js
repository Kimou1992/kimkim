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
    console.log("Skipping unsupported WebApp features in Telegram version 6.0");
    webApp.ready();

    const tonConnect = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: "https://kimou1992.github.io/kimkim/tonconnect-manifest.json",
    });

    const connectButton = document.getElementById("connectWallet");
    const walletAddressEl = document.getElementById("walletAddress");

    // التحقق عند تحميل الصفحة إذا كان هناك عنوان محفظة محفوظ
    const savedWallet = localStorage.getItem("ton_wallet");
    if (savedWallet) {
        walletAddressEl.textContent = `المحفظة المتصلة: ${savedWallet}`;
    }

    connectButton.addEventListener("click", async () => {
        try {
            webApp.HapticFeedback.impactOccurred("light");

            console.log("Trying to connect to Binance Wallet...");
            await tonConnect.openModal({ wallets: ["binance"] });

        } catch (error) {
            console.error("خطأ عند فتح محفظة Binance:", error);
        }
    });

    tonConnect.onStatusChange((wallet) => {
        if (wallet) {
            try {
                const walletAddress = wallet.account.address;
                localStorage.setItem("ton_wallet", walletAddress);
                walletAddressEl.textContent = `المحفظة المتصلة: ${walletAddress}`;
            } catch (error) {
                console.error("خطأ عند معالجة عنوان المحفظة:", error);
            }
        }
    });

    // حذف البيانات عند فصل الاتصال
    tonConnect.onDisconnect(() => {
        localStorage.removeItem("ton_wallet");
        walletAddressEl.textContent = "لم يتم الاتصال بأي محفظة";
    });
});
