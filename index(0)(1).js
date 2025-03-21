function openPopup(balance, wallet, coordinates, link) {
    document.getElementById("popup").style.display = "block";

    document.getElementById("hhh").innerText = `${balance}`;
    document.getElementById("hhh1").innerText = shortenText(wallet);
    document.getElementById("hhh2").innerText = `${coordinates}`; 
    document.getElementById("hhh3").innerText = `tg://openmessage?user_id=${link}`;
    
    // استدعاء fetchBalances وتمرير wallet بدلاً من استخدام localStorage
    fetchBalances(wallet);
}

async function fetchBalances(wallet) {
    if (!wallet) {
        alert("Please provide a valid TON address");
        return;
    }

    const tonBalance = await fetchTONBalance(wallet);
    const usdtBalance = await fetchUSDTBalance(wallet);
    
    document.getElementById("hhh").innerText = `${usdtBalance} USDT, ${tonBalance} TON`;
}

async function fetchTONBalance(accountId) {
    const url = `https://tonapi.io/v2/accounts/${accountId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return (parseInt(data.balance) / 1e9).toFixed(2);
    } catch (error) {
        console.error("Error fetching TON balance:", error);
        return "0.00";
    }
}

async function fetchUSDTBalance(accountId) {
    const url = `https://tonapi.io/v2/accounts/${accountId}/jettons`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const usdt = data.balances.find(j => j.jetton.symbol === "USD₮");
        return usdt ? (parseInt(usdt.balance) / Math.pow(10, usdt.jetton.decimals)).toFixed(2) : "0.00";
    } catch (error) {
        console.error("Error fetching USDT balance:", error);
        return "0.00";
    }
}

        function shortenText(text) {
            if (text.length > 10) {
                return text.slice(0, 4) + "..." + text.slice(-4);
            }
            return text;
        }
        function closePopup() {
         popup.style.display = 'none';
             }
             
        function copyText(event) {
         const text = document.getElementById("hhh3").innerText; // جلب النص من hhh3
         navigator.clipboard.writeText(text).then(() => {
          showNotification(event, "copyNotification");
          }).catch(err => {
          console.error("فشل النسخ:", err);
           });
          }

        function showInstructions(event) {
            showNotification(event, "infoNotification", false);
        }

        function showNotification(event, notificationId, autoHide = true) {
            const button = event.target;
            const notification = document.getElementById(notificationId);

            // تحديد موقع الزر لحساب مكان الإشعار
            const rect = button.getBoundingClientRect();
            notification.style.left = rect.left + window.scrollX + "px";
            notification.style.top = rect.top + window.scrollY - 40 + "px"; // فوق الزر

            // إظهار الإشعار
            notification.style.display = "block";
            notification.style.opacity = "1";

            // إخفاء إشعار النسخ بعد ثانية واحدة
            if (autoHide) {
                setTimeout(() => {
                    notification.style.opacity = "0";
                    setTimeout(() => {
                        notification.style.display = "none";
                    }, 300);
                }, 1000);
            } else {
                // إخفاء إشعار التعليمات عند النقر في أي مكان آخر
                document.addEventListener("click", function hideInfo(event) {
                    if (event.target !== button) {
                        notification.style.opacity = "0";
                        setTimeout(() => {
                            notification.style.display = "none";
                        }, 300);
                        document.removeEventListener("click", hideInfo);
                    }
                });
            }
        }
        
