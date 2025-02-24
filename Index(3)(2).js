
        async function fetchBalances() {
            const accountId = document.getElementById("walletAddress").value.trim();
            if (!accountId) {
                alert("يرجى إدخال عنوان TON!");
                return;
            }

            await fetchTONBalance(accountId);
            await fetchUSDTBalance(accountId);
        }

        async function fetchTONBalance(accountId) {
            const url = `https://tonapi.io/v2/accounts/${accountId}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const tonBalance = (parseInt(data.balance) / 1e9).toFixed(2);
                document.getElementById("balance").innerHTML = `${tonBalance} TON`;
            } catch (error) {
                document.getElementById("balance").innerHTML = "خطأ في جلب الرصيد.";
                console.error("Error fetching TON balance:", error);
            }
        }

        async function fetchUSDTBalance(accountId) {
            const url = `https://tonapi.io/v2/accounts/${accountId}/jettons`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const usdt = data.balances.find(j => j.jetton.symbol === "USD₮");

                if (usdt) {
                    const balance = (parseInt(usdt.balance) / Math.pow(10, usdt.jetton.decimals)).toFixed(2);
                    document.getElementById("usdt").innerHTML = `${balance} USDT`;
                } else {
                    document.getElementById("usdt").innerHTML = "لا يوجد رصيد USDT.";
                }
            } catch (error) {
                document.getElementById("usdt").innerHTML = "خطأ في جلب رصيد USDT.";
                console.error("Error fetching USDT balance:", error);
            }
        }
    
