const bodyTag = document.getElementById('body')
const divForPic = document.getElementById('div-for-pic')
const shopListDiv = document.getElementById('shop-list-div')
const divForNewReview = document.getElementById('div-for-new-review')

fetch('http://localhost:3000/shops')
.then(resp => resp.json())
.then(data => postShopsOnDom(data))

function postShopsOnDom(data) {
  data.forEach(postOneShop)
}

function postOneShop(data) {
  const divForEachShop = document.createElement('div')

  // Adding class to div for CSS
  divForEachShop.classList.add("div-for-shop-list", "column", "row")

  divForEachShop.innerHTML += `<h1 data-id="${data.id}">${data.name}</h1>`
  // append to shopListDiv insead of bodyTag
  shopListDiv.append(divForEachShop)
  // bodyTag.append(divForEachShop)

  divForEachShop.addEventListener("click", shopClicked)

}

function shopClicked(event) {
  fetch(`http://localhost:3000/shops/${event.target.dataset.id}`)
  .then(resp => resp.json())
  .then(data => postIndInfoAboutShop(data))
}

function postIndInfoAboutShop(data) {
console.log(data);
  divForPic.innerHTML = `<img src="${data.img}"/>
  `
  fetch(`http://localhost:3000/shopreview/${data.id}`)
  .then(resp => resp.json())
  .then(data => getReview(data))


}

function getReview(data) {
  // Adding class for CSS
  // Changing from divForPic to divForNewReview
  // divForNewReview.innerHTML appending multiple times

  divForPic.innerHTML += `<form id="add-review" class="column row" style="">
      <h3>Add a Review!</h3>
      <input type="text" name="title" value="" placeholder="Enter a title..." class="input-text">
      <br>
      <input type="number" name="rating" value="" placeholder="Enter a rating..." class="input-text">
      <br>
      <input type="text" name="comment" value="" placeholder="Enter a comment..." class="input-text">
      <br>
      <input type="submit" name="submit" value="Create a New Review" class="submit">
    </form>`
    const formToAddReview = document.getElementById('add-review')
        formToAddReview.addEventListener("submit", createNewReview)
  data.forEach(function (rev) {
    const pForComment = document.createElement('p')
    pForComment.innerHTML = `
    <h3>Title: ${rev.title}</h3>
    <h4>Rating: ${rev.rating}</h4>
    <ul>
    <li>
    ${rev.comment}
    </li>
    </ul>
    `
    divForPic.append(pForComment)

  })
}
function createNewReview(event) {
  event.preventDefault()

}
