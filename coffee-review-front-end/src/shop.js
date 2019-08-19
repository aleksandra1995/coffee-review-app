const divForEachShop = document.createElement('div')
const bodyTag = document.getElementById('body')
const divForPic = document.getElementById('div-for-pic')

divForEachShop.addEventListener("click", directToInfoAboutShop)

function directToInfoAboutShop(event) {

  fetch(`http://localhost:3000/shops/${event.target.dataset.id}`)
  .then(resp => resp.json())
  .then(data => postIndInfoAboutShop(data))



}

function getReview(data) {
  divForPic.innerHTML += `<form id="add-review" style="">
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

function postIndInfoAboutShop(data) {
console.log(data);
  divForPic.innerHTML = `<img src="${data.img}"/>
  `
  fetch(`http://localhost:3000/shopreview/${data.id}`)
  .then(resp => resp.json())
  .then(data => getReview(data))


}



fetch("http://localhost:3000/shops")
.then(resp => resp.json())
.then(data => postShopsOnDom(data))

function postShopsOnDom(data) {
  data.forEach(postEachShopOnDom)
}

function postEachShopOnDom(data) {
<<<<<<< HEAD
  divForEachShop.innerHTML += `
  <h1 data-id="${data.id}">${data.name}</h1>`
=======
  const divForEachShop = document.createElement('div')
  const bodyTag = document.getElementById('body')
  divForEachShop.innerHTML += `<img src= "${data.img}"/>
  <h1>${data.name}</h1>`
  

>>>>>>> a99194b9bbff707d72321d002e524ae2268ee510
  bodyTag.append(divForEachShop)

}
