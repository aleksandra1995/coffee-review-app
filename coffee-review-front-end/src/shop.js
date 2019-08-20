const bodyTag = document.getElementById('body')
const reviewsDiv = document.getElementById('reviews-div')
const shopListDiv = document.getElementById('shop-list-div')
const divForNewReview = document.getElementById('div-for-new-review')

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

  divForEachShop.innerHTML += `<h1 data-id="${eachShop.id}">${eachShop.name}</h1>`

  // append to shopListDiv insead of bodyTag
  shopListDiv.append(divForEachShop)
  // bodyTag.append(divForEachShop)
  // bodyTag.append(divForEachShop);


    // Adding class to div for CSS
    divForEachShop.classList.add("div-for-shop-list", "column", "row")

    divForEachShop.addEventListener("click", shopClicked)


  divForEachShop.addEventListener("click", shopClicked);

}

function shopClicked(event) {
  // Adding class for CSS
  // Changing from reviewsDiv to divForNewReview
  // divForNewReview.innerHTML appending multiple times

  fetch(`http://localhost:3000/shops/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(shopSelected => postIndInfoAboutShop(shopSelected));
}

function postIndInfoAboutShop(shopSelected) {

  reviewsDiv.innerHTML = `<img class="shop-img" src="${shopSelected.img}"/>`

  fetch(`http://localhost:3000/reviews`)
    .then(resp => resp.json())
    .then(function getReview(reviewsData) {
        divForNewReview.innerHTML =
        `<form id="add-review" style="">
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

      reviewsData.forEach(function (rev) {

        if (rev.shop_id === shopSelected.id) {
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
        reviewsDiv.append(pForComment)
     }
  })

    function createNewReview(event) {
      event.preventDefault()


      fetch('http://localhost:3000/reviews',{
        method: "POST",
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shop_id: shopSelected.id,
          user_id: userId,
          title: event.target.title.value,
          rating: event.target.rating.value,
          comment: event.target.comment.value
        })
      }).then(resp => resp.json())
      .then(function (newReviewFromForm) {
        const ppForComment = document.createElement('p')
          ppForComment.innerHTML = `
          <h3>Title: ${newReviewFromForm.title}</h3>
          <h4>Rating: ${newReviewFromForm.rating}</h4>
          <ul>
          <li>
          ${newReviewFromForm.comment}
          </li>
          </ul>
          `
      reviewsDiv.append(ppForComment)
      })





    }



  })


}
