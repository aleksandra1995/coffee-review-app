// fetch("http://localhost:3000/reviews")
// .then(resp => resp.json())
// .then(data => console.log(data))

function postIndInfoAboutShop(shopSelected) {


  reviewsDiv.innerHTML = `
  <img class="shop-img" src="${shopSelected.img}"/>
  <h3 class="shop-info">${shopSelected.name}</h3>
  <h4  class="shop-info">Located at: ${shopSelected.location}</h4>
  <button id="edit-shop-button">Edit ${shopSelected.name}</button>
  <br>
  <button data-id="${shopSelected.id}" id="delete-shop-button"class="delete-button" )">Delete Shop</button>

  `
  reviewsDiv.innerHTML += `<h3  class="shop-info">All reviews for ${shopSelected.name}:</h3>`

  const editShopButton = document.getElementById('edit-shop-button')
  const deleteShopButton = document.getElementById('delete-shop-button')
  console.log(deleteShopButton);

  deleteShopButton.addEventListener("click", deleteShopButtonMethod)

function deleteShopButtonMethod(event) {
  const shopIdFromDeleteButton = event.target.dataset.id
  console.log(shopIdFromDeleteButton);
  fetch(`http://localhost:3000/shops/${shopIdFromDeleteButton}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const divToBeDeleted = document.getElementById(`${shopIdFromDeleteButton}`)
  divToBeDeleted.remove()

}



  editShopButton.addEventListener('click', event => editShop(event, shopSelected))

  fetch(`http://localhost:3000/reviews`)
    .then(resp => resp.json())
    .then(function getReview(reviewsData) {

        divForNewReview.innerHTML =
        `<form id="add-review" style="">
          <h3 class="shop-info">Add a Review!</h3>
          <input type="text" name="title" value="" placeholder="Enter a title..." class="input-text">
          <br>
          <input type="number" name="rating" value="" placeholder="Enter a rating..." class="input-text">
          <br>
          <input type="text" name="comment" value="" placeholder="Enter a comment..." class="input-text">
          <br>
          <input type="submit" name="submit" value="Create a New Review" class="submit">
        </form>
        `

      const formToAddReview = document.getElementById('add-review')
      formToAddReview.addEventListener("submit", createNewReview)

      reviewsData.forEach(function (rev) {

        if (rev.shop_id === shopSelected.id) {
            const pForComment = document.createElement('p')
            pForComment.setAttribute("id", `comment-${rev.id}`)
              // Adding class reivew-card
              pForComment.classList.add("review-card", "div-for-comments")
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
      if (!!userId){
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
          // Adding class reivew-card
          ppForComment.setAttribute("id", `comment-${newReviewFromForm.id}`)

          ppForComment.classList.add("review-card")
          ppForComment.innerHTML = `
            <h3>Title: ${newReviewFromForm.title}</h3>
            <h4>Rating: ${newReviewFromForm.rating}</h4>
            <ul>
            <li>
            ${newReviewFromForm.comment}
            </li>
            <button data-id="${newReviewFromForm.id}" class="edit-button"> Edit Review</button>
            <button data-id="${newReviewFromForm.id}" class="delete-button"> Delete Review</button>
            </ul>

          `
          divForNewReview.addEventListener("click", renderEditForm)


      reviewsDiv.append(ppForComment)
      divForNewReview.append(ppForComment)
      event.target.reset()
      })
    }
    else {
      divForNewReview.innerHTML += "<h3>You must create a user first!!</h3>"
    }

    }

  })

}

function editShop(event, shopSelected){
  // alert("Scroll down")
  // const reviewsDiv = document.getElementById("reviews-div")
  const editShopForm = document.createElement('form')

  // reviewsDiv.scrollTop = reviewsDiv.scrollHeight

  editShopForm.innerHTML = `
    <form id="edit-coffee-shop-form" action="index.html" method="post">
      <h2>Edit ${shopSelected.name}</h2>
      <input type="text" name="name" value="" placeholder="Change the name of the shop...">
      <br>
      <input type="text" name="image" value="" placeholder="Change the URL to picture of the shop...">
      <br>
      <input type="text" name="location" value="" placeholder="Change location of the shop...">
      <br>
      <input type="submit" name="submit" value="Update the coffee shop!">

    `



  // editShopForm.addEventListener('submit', event => updateShop(event, shopSelected, newName, newImageURL, newLocation))
  editShopForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const newName = event.target.name.value
    const newImageURL = event.target.image.value
    const newLocation = event.target.location.value
    updateShop(event, shopSelected, newName, newImageURL, newLocation)
    event.target.remove()
  })

  reviewsDiv.append(editShopForm)
  editShopForm.scrollIntoView();


  const deleteButton = document.getElementById(`delete-button-${shopSelected.id}`)

  // editShopForm.addEventListener('click', deleteShop)

}

function updateShop(event, shopSelected, newName, newImageURL, newLocation){

  fetch(`http://localhost:3000/shops/${shopSelected.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({
      name: newName,
      img: newImageURL,
      location: newLocation
    })
  }).then(resp => resp.json())
  .then(updatedShop => {
    const shopButton = document.getElementById(`button-${updatedShop.id}`)
    shopListDiv.innerHTML +=`
      <button data-id="${updatedShop.id}" id="button-${updatedShop.id}" class="shop-button">${updatedShop.name}</button>
    `
  })
}
