// fetch("http://localhost:3000/reviews")
// .then(resp => resp.json())
// .then(data => console.log(data))

function postIndInfoAboutShop(shopSelected) {

  reviewsDiv.innerHTML = `<img class="shop-img" src="${shopSelected.img}"/>`
  reviewsDiv.innerHTML += `<h3>All reviews for this coffee shop:</h3>`

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
        </form>
        <h3>All the reviews for this user:</h3>
        `

      const formToAddReview = document.getElementById('add-review')
      formToAddReview.addEventListener("submit", createNewReview)

      reviewsData.forEach(function (rev) {

        if (rev.shop_id === shopSelected.id) {
            const pForComment = document.createElement('p')
              // Adding class reivew-card
              pForComment.classList.add("review-card")
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
          // Adding class reivew-card
          ppForComment.classList.add("review-card")
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
      event.target.reset()
      })


    }



  })


}
