const kutucuk = document.querySelector("#kutucuk");
const toplamTutarSpan = document.querySelector("#toplamTutar");
const sepetDiv = document.querySelector("#sepet");
const meyveler = [
    {
        id: 1,
        adi: "Elma",
        fiyati: 500,
        images:"https://picsum.photos/200/300",
    },
    {
        id: 2,
        adi: "Armut",
        fiyati: 300,
        images:"https://picsum.photos/200/300",
    },
    {
        id: 3,
        adi: "Muz",
        fiyati: 200,
        images:"https://picsum.photos/200/300",
    }
]

let toplamTutar = 0;
toplamTutarSpan.textContent = toplamTutar

const sepet = []

// localStorage'den alınan ürünleri mevcut meyveler listesine ekle
const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
for (const storedProduct of storedProducts) {
    if (!meyveler.find(product => product.id === storedProduct.id)) {
        meyveler.push(storedProduct);
    }
    console.log(storedProduct.images);
    `
        <li id="${storedProduct.id}">
            ${storedProduct.adi} - ${storedProduct.fiyati}$ 
            <img src="${storedProduct.images}" alt="">
            <button class="buy-btn">Sepete Ekle</button>
        </li>
    `
}


// Şimdi, mevcut meyveler listesine göre HTML oluştur
kutucuk.innerHTML = "";
for (const meyve of meyveler) {
    kutucuk.innerHTML += `
        <li id="${meyve.id}">
            ${meyve.adi} - ${meyve.fiyati}$ 
            <button class="buy-btn">Sepete Ekle</button>
            <img src="${meyve.images}" alt="">
        </li>
    `;
}
for (const btn of document.querySelectorAll(".buy-btn")) {
    btn.addEventListener("click", function(){
        const tiklananMeyve = meyveler.find(meyve => meyve.id == this.parentElement.id);
        const eklenecekOlanMeyve = tiklananMeyve
        const sepetteVarMi = sepet.find(urun => urun.id == eklenecekOlanMeyve.id)
        if(sepetteVarMi){
            sepetteVarMi.adet += 1
        }else{
            eklenecekOlanMeyve.adet = 1
            sepet.push(eklenecekOlanMeyve)
        }

        console.log(sepet);
        sepetDiv.innerHTML = ""
        toplamTutar = 0;
        for (const urun of sepet) {
            sepetDiv.innerHTML += `<li>${urun.adi} - x${urun.adet} - ${urun.fiyati * urun.adet}</li>`
            toplamTutar += (urun.fiyati * urun.adet)
            console.log(toplamTutar);
            toplamTutarSpan.textContent = toplamTutar

        }
    })
}
// Hepsini Sil butonunu bulma
const hepsiniSilButton = document.querySelector("#hepsiniSil");

// Hepsini Sil butonuna tıklanma olayını ekleme
hepsiniSilButton.addEventListener("click", function() {
    // Sepeti temizle
    sepet.splice(0, sepet.length);
    // Sepet div içeriğini temizle
    sepetDiv.innerHTML = "";
    // Toplam tutarı sıfırla
    toplamTutar = 0;
    toplamTutarSpan.textContent = toplamTutar;
});
