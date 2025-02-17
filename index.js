const { useState, useEffect } = React;

function App() {
    const [tonConnect, setTonConnect] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        async function initTonConnect() {
            try {
                const tc = new TonConnect({
                    manifestUrl: "https://kimou1992.github.io/kimkim/tonconnect-manifest.json",
                });
                setTonConnect(tc);
                console.log("TonConnect Initialized");

                const account = await tc.getConnectedWallet();
                if (account) {
                    setWalletAddress(account.account.address);
                    setIsConnected(true);
                }
            } catch (error) {
                console.error("Error initializing TonConnect:", error);
            }
        }
        initTonConnect();
    }, []);

    const connectWallet = async () => {
        try {
            if (!tonConnect) return;
            console.log("Connecting to wallet...");

            const wallets = await tonConnect.getWallets();
            if (wallets.length === 0) {
                alert("لم يتم العثور على محافظ متاحة.");
                return;
            }

            const wallet = wallets[0];
            await tonConnect.connect(wallet);
            console.log("Connected to wallet:", wallet);

            const account = await tonConnect.getConnectedWallet();
            if (account) {
                setWalletAddress(account.account.address);
                setIsConnected(true);
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("حدث خطأ أثناء الاتصال بالمحفظة.");
        }
    };

    return React.createElement(
        "div",
        null,
        React.createElement("h1", null, "ربط محفظة TON Space"),
        !isConnected
            ? React.createElement("button", { onClick: connectWallet }, "ربط المحفظة")
            : React.createElement(
                "div",
                { id: "wallet-info" },
                React.createElement("p", null, "تم الاتصال بنجاح!"),
                React.createElement("p", null, `العنوان: ${walletAddress}`)
            )
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));

