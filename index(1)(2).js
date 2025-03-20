function validateForm() {
    // استخراج القيم الصحيحة
    const balance = parseFloat(document.getElementById("balance").innerText); 
    
    const priceText = document.getElementById("priceLabel").innerText;
    const price = parseFloat(priceText.match(/\d+(\.\d+)?/)[0]); 

    const minText = document.getElementById("minAmountLabel").innerText;
    const min = parseFloat(minText.match(/\d+(\.\d+)?/)[0]);

    const maxText = document.getElementById("maxAmountLabel").innerText;
    const max = parseFloat(maxText.match(/\d+(\.\d+)?/)[0]);
    
    const daylimText = document.getElementById("daylimit").innerText;
    const daylim = parseFloat(daylimText.match(/\d+(\.\d+)?/)[0]);
    
    const errorMessage = document.getElementById("error-message");

    // إخفاء أي رسالة سابقة
    errorMessage.style.display = "none";
    
    if (daylim === 0) {
        errorMessage.textContent = "You have reached the daily limits....come back tomorrow";
        errorMessage.style.display = "block";
        return;
    }

    // التحقق من الرصيد
    if (isNaN(balance) || balance <= 10) {
        errorMessage.textContent = "balance should be more than 10 USDT";
        errorMessage.style.display = "block";
        return;
    }

    // التحقق من الحد الأدنى
    if (isNaN(min) || min <= (price * 10)) {
        let requiredMin = (price * 10).toFixed(2);
        errorMessage.textContent = `Min amount should be more than ${requiredMin}`;
        errorMessage.style.display = "block";
        return;
    }

    // التحقق من الحد الأقصى
    if (isNaN(max) || max <= min || max >= (balance * price)) {
        let Min = min.toFixed(2);
        let requiredMaxbal = (price * balance).toFixed(2);
        errorMessage.textContent = `Max amount should be between ${Min} and ${requiredMaxbal}`;
        errorMessage.style.display = "block";
        return;
    }
    
    const stuserId = localStorage.getItem("userId") || "";

    if (stuserId === null || stuserId.trim() === "") {
    errorMessage.textContent = "Please check your telegram ID";
    errorMessage.style.display = "block";
    return;
}

    // التحقق من اختيار ولاية واحدة على الأقل
    const popup = document.getElementById("popup");
    const tagsContainer = popup.querySelector('.tags');

    if (!tagsContainer || tagsContainer.children.length === 0) {
        errorMessage.textContent = "you should select at least 1 wilaya";
        errorMessage.style.display = "block";
        return;
    }
    
    
    const miNmax = `${price.toFixed(2)}/${balance}/${min.toFixed(2)}-${max.toFixed(2)}`;  
    const selectedTags = Array.from(tagsContainer.children)
                          .map(tag => tag.textContent.replace("×", "").trim())
                          .join(' - ');

    console.log(`${miNmax}/${selectedTags}`);
    const stadress = localStorage.getItem("ton_wallet") || "--";
    const stcoord = localStorage.getItem("stcoord") || "--";
    const stusername = localStorage.getItem("FirstName") || "--";
  
         var id = stuserId;
         var daylimit = 20;
         var sellad = `${miNmax}/${selectedTags}`;
         var otherinfo = `${stusername}/${stuserId}/${stcoord}/${stadress}`;

         var url = "https://script.google.com/macros/s/AKfycbwwLdUsb1npbJ5luDi6wVyYRMWxctC8H-JQjWZUzZW5GYHe_6Q3DJ5R2WJflv5-CHqhVw/exec";
            
            var params = new URLSearchParams({
                action: "update",
                id: id,
                daylimit: daylimit,
                sellad: sellad,
                otherinfo: otherinfo
            });

            fetch(url + "?" + params, { method: "POST" })
    .then(response => response.json())
    .then(data => {
        
        if (data.success) {
            updateLocalStorage(data.data);
        }
    })
    .catch(error => {
        
    });
     
}
function updateLocalStorage(data) {
            localStorage.removeItem('sheetData');
            const filteredData = data.filter((row, index) => index > 0 && row[3] && row[2] && row[1]);
            localStorage.setItem('sheetData', JSON.stringify(filteredData));
            displayDataFromLocalStorage();
        }
        
        function openPopup2() {
        document.getElementById("popup2").style.display = "block";
        }
        function closePopup2() {
        popup2.style.display = 'none';
        }

        function deletead() {
         const stuserId = Number(localStorage.getItem("stuserId"));
         var id = stuserId;
         var daylimit = 20;
         var sellad = "";
         var otherinfo = "";

         var url = "https://script.google.com/macros/s/AKfycbwwLdUsb1npbJ5luDi6wVyYRMWxctC8H-JQjWZUzZW5GYHe_6Q3DJ5R2WJflv5-CHqhVw/exec";
            
            var params = new URLSearchParams({
                action: "update",
                id: id,
                daylimit: daylimit,
                sellad: sellad,
                otherinfo: otherinfo
            });

            fetch(url + "?" + params, { method: "POST" })
    .then(response => response.json())
    .then(data => {
        console.log("🔹 استجابة الخادم:", data.message); // طباعة الرسالة في Console فقط

        if (data.success) {
            updateLocalStorage(data.data);
        }
    })
    .catch(error => {
        console.log("❌ خطأ أثناء تنفيذ الطلب:", error);
    });
    
}
        function navigateToPage0() {
            window.location.href = "index(0).html";
        }
        function navigateToPage2() {
            window.location.href = "index(2).html";
        }
        function navigateToPage3() {
            window.location.href = "index(3).html";
        }

