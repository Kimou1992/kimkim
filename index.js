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
            console.log("Подключенный кошелек:", wallet);
            localStorage.setItem("ton_wallet", wallet.account.address);
            walletAddressEl.textContent = "Подключенный кошелек: " + wallet.account.address;
        }
    });
});
