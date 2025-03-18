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

    // قائمة المحافظ المدعومة
    const wallets = [
        { name: "Tonkeeper", id: "tonkeeper" },
        { name: "Binance Wallet", id: "binance" },
        { name: "MyTonWallet", id: "mytonwallet" },
        { name: "TonHub", id: "tonhub" },
        { name: "TonCoinWallet", id: "toncoinwallet" }
    ];

    // التحقق عند تحميل الصفحة إذا كان هناك عنوان محفظة محفوظ
    const savedWallet = localStorage.getItem("ton_wallet");
    if (savedWallet) {
        walletAddressEl.textContent = savedWallet;
    }

    document.fonts.ready.then(() => {
        connectButton.style.visibility = "visible";
        connectButton.style.opacity = "1";
    });

    connectButton.addEventListener("click", async () => {
        try {
            webApp.HapticFeedback.impactOccurred("light");

            // فتح قائمة اختيار المحفظة
            const walletList = wallets.map((w, index) => `${index + 1} - ${w.name}`).join("\n");
            const choice = prompt(`اختر محفظة:\n${walletList}`);

            const selectedWallet = wallets[parseInt(choice) - 1];

            if (!selectedWallet) {
                alert("محفظة غير مدعومة!");
                return;
            }

            console.log(`Trying to connect to: ${selectedWallet.name}`);
            await tonConnect.openModal({ wallets: [selectedWallet.id] });

        } catch (error) {
            console.error("خطأ عند فتح المحفظة:", error);
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
