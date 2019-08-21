const bodyTag = document.getElementById('body')
const reviewsDiv = document.getElementById('reviews-div')
const shopListDiv = document.getElementById('shop-list-div')
const divForNewReview = document.getElementById('div-for-new-review')

console.log(userForm);

userForm.addEventListener('submit', event => {
  username = event.target.username.value
})

fetch('http://localhost:3000/shops')
  .then(resp => resp.json())
  .then(shopsArray => postShopsOnDom(shopsArray))


function postShopsOnDom(shopsArray) {
  shopsArray.forEach(postOneShop)

}

function postOneShop(eachShop) {
  const divForEachShop = document.createElement('div');

  // CSS button transition won't work without <span>
  // divForEachShop.innerHTML += `<button data-id="${eachShop.id}" class="shop-button"><span>${eachShop.name}</span></button>`
  divForEachShop.innerHTML += `<button data-id="${eachShop.id}" class="shop-button">${eachShop.name}</button>`

  // append to shopListDiv insead of bodyTag
  shopListDiv.append(divForEachShop)
  // bodyTag.append(divForEachShop)
  // bodyTag.append(divForEachShop);


    // Adding class to div for CSS
    divForEachShop.classList.add("div-for-shop-list", "column", "row")

    divForEachShop.addEventListener("click", shopClicked)

}

function shopClicked(event) {
  // Adding class for CSS
  // Changing from reviewsDiv to divForNewReview
  // divForNewReview.innerHTML appending multiple times

  fetch(`http://localhost:3000/shops/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(shopSelected => postIndInfoAboutShop(shopSelected));
}
