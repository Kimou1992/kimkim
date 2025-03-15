function getCurrentTime() {
    return Date.now(); // إرجاع الوقت الحالي من الجهاز
}

function shouldUpdateStoredTime(storedTime, currentTime) {
    return (currentTime - storedTime) >= 60000; // الفرق دقيقة واحدة (60000 مللي ثانية)
}

function checkAndUpdateTime() {
    const currentTime = getCurrentTime();

    let storedTime = localStorage.getItem("storedTime");
    console.log(storedTime);
    storedTime = storedTime ? parseInt(storedTime) : null;

    let fetchFailed = localStorage.getItem("fetchFailed"); // التحقق مما إذا كان هناك فشل سابق

    if (fetchFailed) {
        console.log("🚨 تم الكشف عن فشل سابق في الجلب، محاولة الجلب فورًا...");
        fetchData(false, currentTime, true); // تجاوز التحقق الزمني
    } else if (!storedTime) {
        console.log("⚠️ لم يكن هناك وقت مخزن، يتم تخزين وقت جديد ...");
        localStorage.setItem("storedTime", currentTime);
    } else if (shouldUpdateStoredTime(storedTime, currentTime)) {
        console.log("⏳ مضت دقيقة واحدة منذ آخر تحديث، محاولة جلب البيانات...");
        fetchData(false, currentTime);
    }
}

const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/15qQqToX86S1hcc3lH9qqYoxb907R7nTdK697q3Fyz10/values/Usdt1!A:E?key=AIzaSyCeJUJTtwaIXG16vWP30FEOEsZDaKSAF0w";

function fetchData(isFirstTime, newTime = null, bypassTimeCheck = false) {
    fetch(sheetUrl)
        .then(response => response.json())
        .then(data => {
            if (data.values) {
                // مسح البيانات السابقة من Local Storage
                localStorage.removeItem('sheetData');

                // تجاهل الصف الأول (العناوين) وحفظ البيانات
                const filteredData = data.values.filter((_, index) => index > 0 && data.values[index][3] && data.values[index][2] && data.values[index][1]);
                localStorage.setItem('sheetData', JSON.stringify(filteredData));

                // عرض البيانات بعد حفظها
                displayDataFromLocalStorage();

                // **إزالة علامة الفشل عند نجاح الجلب**
                localStorage.removeItem("fetchFailed");

                // **تحديث الوقت فقط عند نجاح جلب البيانات**
                if (!isFirstTime && newTime) {
                    localStorage.setItem("storedTime", newTime);
                    console.log("✅ تم تحديث الوقت في التخزين:", new Date(newTime).toLocaleTimeString());
                }
            } else {
                console.log("❌ لا توجد بيانات متاحة!");
                handleFetchError();
            }
        })
        .catch(error => {
            console.log(`⚠️ حدث خطأ أثناء جلب البيانات: ${error.message}`);
            handleFetchError();
        });
}

// **دالة التعامل مع الخطأ**
function handleFetchError() {
    // **تخزين علامة الفشل حتى يتم التصحيح**
    localStorage.setItem("fetchFailed", "true");
}

function init() {
    checkAndUpdateTime();
}
let tg = window.Telegram.WebApp;

// التحقق مما إذا كانت البيانات غير مخزنة مسبقًا
if (!localStorage.getItem("userId") || !localStorage.getItem("firstName")) {
    if (tg.initDataUnsafe?.user) {
        localStorage.setItem("userId", tg.initDataUnsafe.user.id);
        localStorage.setItem("firstName", tg.initDataUnsafe.user.first_name);
    }
}

init();
