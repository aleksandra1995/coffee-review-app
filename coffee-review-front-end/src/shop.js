


const bodyTag = document.getElementById('body')
const divForPic = document.getElementById('div-for-pic')

userForm.addEventListener('submit', event => {
  username = event.target.username.value
  console.log("form submitted");
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
  bodyTag.append(divForEachShop);

  divForEachShop.addEventListener("click", shopClicked);

}

function shopClicked(event) {
  fetch(`http://localhost:3000/shops/${event.target.dataset.id}`)
    .then(resp => resp.json())
    .then(shopSelected => postIndInfoAboutShop(shopSelected));
}

function postIndInfoAboutShop(shopSelected) {

  divForPic.innerHTML = `<img src="${shopSelected.img}"/>`

  fetch(`http://localhost:3000/reviews`)
    .then(resp => resp.json())
    .then(function getReview(reviewsData) {
      divForPic.innerHTML +=
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
            divForPic.append(pForComment)
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
      divForPic.append(ppForComment)
      })





    }



  })


}
