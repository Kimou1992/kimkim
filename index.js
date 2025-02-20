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
            try {
                const walletAddress = new TonWeb.utils.Address(wallet.account.address).toString(true, true, true);
                localStorage.setItem("ton_wallet", walletAddress);
                walletAddressEl.textContent = "Подключенный кошелек: " + walletAddress;
            } catch (error) {
                console.error("Ошибка при обработке адреса кошелька:", error);
            }
        }
    });

    // حذف البيانات عند فصل الاتصال
    tonConnect.onDisconnect(() => {
        localStorage.removeItem("ton_wallet");
        walletAddressEl.textContent = "";
    });
});
const payButton = document.getElementById("payWithTON");

// إظهار زر الدفع فقط بعد الاتصال بالمحفظة
tonConnect.onStatusChange((wallet) => {
    if (wallet) {
        payButton.style.visibility = "visible";
        payButton.style.opacity = "1";
    } else {
        payButton.style.visibility = "hidden";
        payButton.style.opacity = "0";
    }
});

payButton.addEventListener("click", async () => {
    try {
        webApp.HapticFeedback.impactOccurred("medium");

        // التحقق من أن المحفظة متصلة
        const wallet = tonConnect.account;
        if (!wallet) {
            alert("يرجى توصيل المحفظة أولاً.");
            return;
        }

        // إرسال المعاملة عبر المحفظة المتصلة
        const transaction = {
            messages: [
                {
                    address: "EQAC7jOqLudpRiHVtN2mcq8OIgtCyBeTxdyWTZlYmFpQVt-g", // عنوان المستلم
                    amount: "1000000000", // 1 TON (بالـ nanotons)
                },
            ],
        };

        const result = await tonConnect.sendTransaction(transaction);

        console.log("تم إرسال المعاملة بنجاح:", result);
        alert("تم إرسال 1 TON بنجاح!");

    } catch (error) {
        console.error("خطأ أثناء إرسال المعاملة:", error);
        alert("فشل إرسال المعاملة!");
    }
});
