const bodyTag = document.getElementById('body')
const reviewsDiv = document.getElementById('reviews-div')
const shopListDiv = document.getElementById('shop-list-div')
const divForNewReview = document.getElementById('div-for-new-review')
const addShopForm = document.getElementById('add-coffee-shop-form')

/////////////////////// Adding eventListeners to forms and buttons
userForm.addEventListener('submit', event => {
  username = event.target.username.value
})

fetch('http://localhost:3000/shops')
  .then(resp => resp.json())
  .then(shopsArray => postShopsOnDom(shopsArray))


function postShopsOnDom(shopsArray) {
  shopsArray.forEach(postOneShop)

}

addShopForm.addEventListener('submit', createNewCoffeeShop)

function postOneShop(eachShop) {
  const divForEachShop = document.createElement('div');

  divForEachShop.innerHTML += `<button data-id="${eachShop.id}" class="shop-button"><span data-id="${eachShop.id}">${eachShop.name}</span></button>`
  divForEachShop.setAttribute("id",`${eachShop.id}`)

  shopListDiv.append(divForEachShop)

  divForEachShop.classList.add("div-for-shop-list")

  divForEachShop.addEventListener("click", shopClicked)

}

function createNewCoffeeShop(event){
  event.preventDefault()

  console.log(event.target);
  fetch('http://localhost:3000/shops', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: event.target.name.value,
      img: event.target.image.value,
      location: event.target.location.value
    })
  }).then(resp => resp.json())
  .then(newShop => postOneShop(newShop))

  event.target.reset()
}


function shopClicked(event) {
  // Adding class for CSS
  // Changing from reviewsDiv to divForNewReview
  // divForNewReview.innerHTML appending multiple times

  fetch(`http://localhost:3000/shops/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(shopSelected => postIndInfoAboutShop(shopSelected));
}

// Leads to review.js
