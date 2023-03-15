// go to top function

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// random image generator

const imageSources = ['/img/about-us.jpg', 
'/img/about-us2.jpg', 
'/img/about-us3.jpg',
'/img/about-us4.jpg',
'/img/about-us5.jpg'
];

// generate random number between a range

let randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

// assign the image to container

document.getElementById('aboutUs').src = imageSources[randomNumber(0,4)];

// view options for products

const rangeInput = document.querySelector('input[type = "range"]');
const imageList = document.querySelector(".image-list");
const searchInput = document.querySelector('input[type="search"]');
const btns = document.querySelectorAll(".view-options button");
const photosCounter = document.querySelector(".toolbar .counter span");
const imageListItems = document.querySelectorAll(".image-list li");
const captions = document.querySelectorAll(".description");
const myArray = [];
let counter = 1;
const active = "active";
const listView = "list-view";
const gridView = "grid-view";
const dNone = "d-none";

for (const btn of btns) {
  btn.addEventListener("click", function () {
    const parent = this.parentElement;
    document.querySelector(".view-options .active").classList.remove(active);
    parent.classList.add(active);
    this.disabled = true;
    document.querySelector('.view-options [class^="show-"]:not(.active) button').disabled = false;
    if (parent.classList.contains("show-list")) {
      parent.previousElementSibling.previousElementSibling.classList.add(dNone);
      imageList.classList.remove(gridView);
      imageList.classList.add(listView);
    } else {
      parent.previousElementSibling.classList.remove(dNone);
      imageList.classList.remove(listView);
      imageList.classList.add(gridView);
    }
  });
}

rangeInput.addEventListener("input", function() {
  document.documentElement.style.setProperty("--minRangeValue",`${this.value}px`);
});

// search feature

for (const caption of captions) {
  myArray.push({
    id: counter++,
    text: caption.textContent
  });
}

function keyupHandler() {
  for (const item of imageListItems) {
    item.classList.add(dNone);
  }
  const text = this.value;
  const filteredArray = myArray.filter(el => el.text.toLowerCase().includes(text.toLowerCase()));
  if (filteredArray.length > 0) {
    for (const el of filteredArray) {
      document.querySelector(`.image-list li:nth-child(${el.id})`).classList.remove(dNone);
    }
  }

  if (filteredArray.length == 1) {
    photosCounter.textContent = filteredArray.length + ' product found ✔️'
  } else if (filteredArray.length > 2) {
    photosCounter.textContent = filteredArray.length + ' products found ✔️'
  } else if (filteredArray.length == 0) {
    photosCounter.textContent = filteredArray.length + ' products found ❌'
  }
}

searchInput.addEventListener("keyup", keyupHandler);

// category selection

$(function () {
  $('#piano').change(function () {
    $(".image-list > :not(.pianos)").fadeToggle()
  })
});

$(function () {
  $('#accesories').change(function () {
    $(".image-list > :not(.accesories)").fadeToggle()
  })
})
$(function () {
  $('#accordion').change(function () {
    $(".image-list > :not(.accordion)").fadeToggle()
  })
});

$(function () {
  $('#pedals').change(function () {
    $(".image-list > :not(.pedals)").fadeToggle()
  })
});

$(function () {
  $('#drums').change(function () {
    $(".image-list > :not(.drums)").fadeToggle()
  })
});

$(function () {
  $('#speakers').change(function () {
    $(".image-list > :not(.speakers)").fadeToggle()
  })
});

$(function () {
  $('#pads').change(function () {
    $(".image-list > :not(.pads)").fadeToggle()
  })
});

$(function () {
  $('#others').change(function () {
    $(".image-list > :not(.others)").fadeToggle()
  })
});

// add to favorites

const favorites = document.querySelectorAll('.favorites');

favorites.forEach(e => {e.addEventListener('click', () => {
    e.innerHTML = '<i class="bi bi-heart-fill"></i>';
  });
});

// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)'){
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})

// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (let i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  button = event.target;
  button.innerHTML = 'Added ✔️';
  button.style.outline = 'none';
 
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  
  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  let itemTitle = cartItem.getElementsByClassName('fig-title')[0].innerText;
  console.log(price, imageSrc, itemTitle);
  addItemToCart (price, imageSrc, itemTitle);
  updateCartPrice();
}

for (let i=0; i<favorites.length; i++) {
  button = favorites[i];
  button.addEventListener('click', addToFavorites);
}

function addToFavorites (event) {
  button = event.target;
  button.style.outline = 'none';
  button.style.backgroundColor = 'red';
  button.style.color = 'var(--lightPeach)'
  
  var cartItem = button.parentElement;
  var ol = document.getElementById('favoritesList');
  let itemTitle = cartItem.getElementsByClassName('fig-title')[0].innerText;
  let li = document.createElement('li');
  
  li.textContent = itemTitle;
  ol.appendChild(li);
  
  let imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  let imageToAdd = document.createElement('img');
  
  imageToAdd.src = imageSrc;
  imageToAdd.style.width = '6%';
  imageToAdd.style.marginLeft = '20px';
  li.appendChild(imageToAdd);

  let removeButton = document.createElement('button');
  removeButton.innerHTML = ' ❌ ';
  removeButton.style.marginLeft = '50px';
  li.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
  removeButton.parentElement.remove()
})


}


function addItemToCart (price, imageSrc, itemTitle) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');
  
  for (let i = 0; i < cartImage.length; i++){
    if (cartImage[i].src == imageSrc){
      alert ('This item has already been added to the cart')
      return;
    }
  }
  
  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <h4> ${itemTitle} </h4>
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">REMOVE</button> 
        </div>
      `

    productRow.innerHTML = cartRowItems;
    productRows.append(productRow);
    console.log(productRow.getElementsByClassName('remove-btn')[0]);
    productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
    productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
    updateCartPrice()
}

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (let i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (let i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
}

// update total price
function updateCartPrice() {
  let total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
  let priceElement = cartRow.getElementsByClassName('cart-price')[0]
  let quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
  let price = parseFloat(priceElement.innerText.replace('€', ''))
  let quantity = quantityElement.value
  total = total + (price * quantity);
  }
  document.getElementsByClassName('total-price')[0].innerText =  '€' + total.toFixed(2);
  document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2;
}

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');
const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  alert ('Thank you for your purchase');
  cartModalOverlay.style.transform= 'translateX(-100%)'
 var cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
 }
  updateCartPrice()
}

