// Form elemanlarını seçme
const productForm = document.getElementById("productForm");
let img = "https://picsum.photos/200/300"
let products = [];
// Form submit olduğunda
productForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    let deneme = {title: productForm["productName"].value,
    price: productForm["productPrice"].value,
    images:img
    }
    products.push(deneme);
    // Ürün adı ve fiyatını al
    const productNameInput = document.getElementById("productName");
    const productPriceInput = document.getElementById("productPrice");
    const productName = productNameInput.value;
    const productPrice = parseFloat(productPriceInput.value);

    // Eğer ürün adı veya fiyatı boşsa, işlemi durdur
    if (!productName || !productPrice) {
        alert("Ürün adı ve fiyatı giriniz.");
        return;
    }
    let lastProductId = 3;
    if (localStorage.lastProductId) {
        lastProductId = Number(localStorage.lastProductId);
    }

    function productId() {
        lastProductId++;
        localStorage.lastProductId = lastProductId
        return lastProductId;
    }

    // Ürün bilgilerini bir nesne olarak oluştur
    const product = {
        id: productId(),
        adi: productName,
        fiyati: productPrice,
        images: img
    };

    // Ürünü localeStorage'e ekle
    addProductToStorage(product);

    // Formu temizle
    productNameInput.value = "";
    productPriceInput.value = "";

    // Kullanıcıya bilgi ver
    alert("Ürün başarıyla eklendi.");

    // Ürünler listesini yeniden göster
    showProducts();
});

// Sayfa yüklendiğinde veya ürün ekleme/silme işlemlerinden sonra, localStorage'den ürünleri al ve göster
document.addEventListener("DOMContentLoaded", function() {
    showProducts();
});

// Ürünleri gösterme fonksiyonu
function showProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productContainer = document.getElementById("productContainer");

    // Eski ürünleri temizle
    productContainer.innerHTML = "";

    // Her ürün için bir kart oluştur
    products.forEach(function(product, index) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <h2>${product.adi}</h2>
            <p>Fiyat: ${product.fiyati}$</p>
            <button onclick="deleteProduct(${index})">Ürünü Sil</button>
            <img src="${product.images}" alt="">
            
            
        `;
        productContainer.appendChild(productCard);
    });
}

// Ürünü silme fonksiyonu
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1); // Index'e göre ürünü sil
    localStorage.setItem("products", JSON.stringify(products));
    showProducts(); // Yeniden ürünleri göster
}

// Ürünü localeStorage'e ekleme fonksiyonu
function addProductToStorage(product) {
    // Eski ürün listesini al veya boş bir liste oluştur
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Yeni ürünü ekle
    products.push(product);

    // Yeni ürün listesini localeStorage'e kaydet
    localStorage.setItem("products", JSON.stringify(products));
}
