document.addEventListener("DOMContentLoaded", function () {
let tg = window.Telegram.WebApp;
        // توسيع التطبيق المصغر لملء الشاشة

        // التحقق مما إذا كانت البيانات مخزنة مسبقًا
        let storedUserId = localStorage.getItem("userId");
        let storedFirstName = localStorage.getItem("firstName");
        

        if (storedUserId && storedFirstName) {
            // إذا كانت البيانات موجودة في الذاكرة، استخدمها
            
            alert(`المعرف المخزن: ${storedUserId}\nالاسم المخزن: ${storedFirstName}`);

        } else if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            // جلب البيانات من Telegram إذا لم تكن مخزنة
            let userId = tg.initDataUnsafe.user.id;
            let firstName = tg.initDataUnsafe.user.first_name;

            // تخزين البيانات في localStorage
            localStorage.setItem("userId", userId);
            localStorage.setItem("firstName", firstName);

            // تحديث العرض
            alert(`المعرف المخزن: ${storedUserId}\nالاسم المخزن: ${storedFirstName}`);
                
        } else {
            // إذا لم تتوفر البيانات من Telegram
            
        }
        
});
