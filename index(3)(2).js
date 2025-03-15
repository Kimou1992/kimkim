async function fetchBalances() {
    const accountId = "UQAMl6BVegC0IOZPLhLzWBHCnK4iO4G5eNu4qn_NKQnoIXYj";
    if (!accountId) {
        alert("يرجى إدخال عنوان TON!");
        return;
    }

    const tonBalance = await fetchTONBalance(accountId);
    const usdtBalance = await fetchUSDTBalance(accountId);

    document.getElementById("balance").innerText = `${usdtBalance} USDT, ${tonBalance} TON`;
    document.getElementById("balanceforad").innerText = `${usdtBalance} USDT, ${tonBalance} TON`;
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

document.addEventListener("DOMContentLoaded", () => {
    fetchBalances(); // تشغيل الدالة تلقائيًا عند تحميل الصفحة
});
        
        function openPopup() {
        document.getElementById("popup").style.display = "block";document.getElementById("alerts").innerHTML = `
<b>1- احتفظ بعبارة الاسترداد (Seed Phrase) في مكان آمن ⚠️</b><br>
إذا فقدت عبارة الاسترداد الخاصة بك، فلن تتمكن من استعادة محفظتك أو أموالك. لا تقم بمشاركتها مع أي شخص.<br>
<b>2- لا تشارك مفتاحك الخاص (Private Key) أو عبارة الاسترداد (Seed Phrase) 🔒</b><br>
أي شخص يمتلك هذه المعلومات يمكنه الوصول إلى محفظتك وسرقة أموالك. نحن لن نطلب منك هذه البيانات أبدًا.<br>
<b>3- لا تحفظ عبارة الاسترداد (Seed Phrase) أو المفتاح الخاص (Private Key) في جهاز متصل بالإنترنت ⚠️</b><br>
يُفضل كتابتها على ورقة والاحتفاظ بها في مكان آمن بعيدًا عن الأجهزة الإلكترونية.<br>
<b>4- بدون عبارة الاسترداد (Seed Phrase)، لا يمكنك استرجاع محفظتك 🔑</b><br>
تأكد من أنك قمت بحفظها بشكل صحيح، حيث لا يوجد دعم لاستعادة الحساب إذا فقدتها.<br>
<b>5- تحقق من المحفظة قبل ربطها بالشبكة 🌐</b><br>
تأكد أنك تستخدم المحفظة الصحيحة على شبكة TON ولا تحتوي على أموال غير مخصصة للمعاملات.
`;
        }
        
        function closePopup() {
        popup.style.display = 'none';
        }
        
        function navigateToPage0() {
            window.location.href = "index(0).html";
        }
        function navigateToPage1() {
            window.location.href = "index(1).html";
        }
        function navigateToPage2() {
            window.location.href = "index(2).html";
        }
