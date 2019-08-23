
const addUserBtn = document.querySelector("#new-user-btn-and-prompt")
const userForm = document.querySelector("#login-form")
const addUserForm = document.querySelector(".add-user-form")
let userId
let username
let addUser = false
const usernameBar = document.querySelector(".username-bar")
let userExists = false
const shopsArray = []
const usersArray = []


// Populate shopsArray
fetch('http://localhost:3000/shops')
  .then(resp => resp.json())
  .then(shop => shopsArray.push(shop))

// Populate usersArray
fetch('http://localhost:3000/users')
  .then(resp => resp.json())
  .then(user => usersArray.push(user))


function showUsersReviews(oneUserReviews, currentUserId) {
  if (oneUserReviews === []){console.log("empty")}
  else {
    const hereAreTheReviewsTag = document.createElement('h2')
    hereAreTheReviewsTag.classList.add('shop-info')
    hereAreTheReviewsTag.innerText = "Here is a list of your reviews!"
    divForNewReview.append(hereAreTheReviewsTag)


    oneUserReviews.forEach(function (review) {


      const pForReview = document.createElement('p')
      pForReview.setAttribute("id", `review-${review.id}`)

      // Adding class user-review-card
      pForReview.classList.add("user-review-card")

      pForReview.innerHTML += `
        <h3>Title: ${review.title}</h3>
        <h4>Coffee Shop: ${shopsArray[0][review.shop_id - 1].name}</h4>
        <h4>User: ${usersArray[0][currentUserId - 1].username}</h4>
        <h4>Rating: ${review.rating}</h4>
        <ul>
          <li>
            ${review.comment}
          </li>
        </ul>
        <button data-id="${review.id}" class="edit-button"> Edit Review</button>
        <button data-id="${review.id}" class="delete-button"> Delete Review</button>

      `
      divForNewReview.append(pForReview)
      const editButton = document.getElementById('edit-button')

      divForNewReview.addEventListener("click", renderEditForm)

    })


  }

}


function renderEditForm(event) {
  if (event.target.classList.contains('edit-button') ) {
    const formDivEdit = document.getElementById('edit-div')
    const userReviewCard = document.getElementById(`${event.target.dataset.id}`)
    const formToEditDiv = document.createElement('div')
    formToEditDiv.setAttribute("id", "edit-div")



    if (formDivEdit !== null){
      // alert("Scroll down")
      return;
    }

    formToEditDiv.innerHTML =`
      <form data-id="${event.target.dataset.id}" id="edit-review" style="">
        <h3>Edit a Review!</h3>
        <input type="text" name="title" value="" placeholder="Edit a title" class="input-text">
        <br>
        <input type="number" name="rating" value="" placeholder="Enter a rating..." class="input-text">
        <br>
        <input type="text" name="comment" value="" placeholder="Enter a comment..." class="input-text">
        <br>
        <input type="submit" name="submit" value="Edit a Review" class="submit">
      </form>
    `

    divForNewReview.append(formToEditDiv)
    formToEditDiv.scrollIntoView()
    divForNewReview.addEventListener("submit", editReview)


  }
  else if (event.target.classList.contains('delete-button')) {
    const forumId = event.target.dataset.id

    fetch(`http://localhost:3000/reviews/${event.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    console.log(forumId);
    const tagForEditedReview22 = document.getElementById(`review-${forumId}`)
    const tagForEditedReview3 = document.getElementById(`comment-${forumId}`)
    tagForEditedReview3.remove()
    tagForEditedReview22.remove()

  }

}

function editReview(event) {
  console.log(event.target.title.value);
  event.preventDefault()
  fetch(`http://localhost:3000/reviews/${event.target.dataset.id}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: event.target.title.value,
      rating: event.target.rating.value,
      comment: event.target.comment.value
    })
  }).then(resp => resp.json())
  .then(data => {

    const tagForEditedReview = document.getElementById(`comment-${data.id}`)
    const tagForEditedReview2 = document.getElementById(`review-${data.id}`)

    tagForEditedReview.innerHTML = `
    <h3>Title: ${data.title}</h3>
    <h4>Rating: ${data.rating}</h4>
    <h4>Coffee Shop: ${shopsArray[0][review.shop_id - 1].name}</h4>
    <h4>User: ${usersArray[0][currentUserId - 1].username}</h4>
    <ul>
    <li>
    ${data.comment}
    </li>
    </ul>
    <button data-id="${data.id}" class="edit-button"> Edit Review</button>
    <button data-id="${data.id}" class="delete-button"> Delete Review</button>

    `

    tagForEditedReview2.innerHTML = `
    <h3>Title: ${data.title}</h3>
    <h4>Rating: ${data.rating}</h4>
    <h4>Coffee Shop: ${shopsArray[0][review.shop_id - 1].name}</h4>
    <h4>User: ${usersArray[0][currentUserId - 1].username}</h4>
    <ul>
    <li>
    ${data.comment}
    </li>
    </ul>

    `

  })
  divForNewReview.addEventListener("click", renderEditForm)

  event.target.remove()
}

function showHomepage(username){


  fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(function (userToFind ) {
        userToFind.find(function(user) {

          if (user.username === username){
            userExists = true
            userId = user.id

          }
           else {
             // console.log("Make a new user")
         }
      })

      if (userExists){
        usernameBar.innerHTML=`<p data-id="${userId}" class="welcome-msg">Start leaving reviews, ${username}!</p>
        <div class="add-user-form">
        <button data-id="${userId}" id="button-for-all-reviews">Click here to see all of your reviews</button>
        </div>`
        const buttonForAllReviews = document.getElementById('button-for-all-reviews')
        console.log(buttonForAllReviews);
        buttonForAllReviews.addEventListener('click', function (event) {


            console.log(event.target);
          const currentUserId = event.target.dataset.id
        fetch(`http://localhost:3000/shopreview/${currentUserId}`)
            .then(resp => resp.json())
            .then(oneUserReviews => showUsersReviews(oneUserReviews, currentUserId))

        })


      } else {
        console.log("You need to create an account");
        fetch(`http://localhost:3000/users`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            username: username
          })
        }).then(resp => resp.json())
        .then(data =>  createNewUser(data))
      }

      })



}



function createNewUser(data) {
  const usernameBar = document.querySelector(".username-bar")
  console.log(usernameBar);
  usernameBar.innerHTML=`<p data-id="${userId}" class="welcome-msg">Start leaving reviews, ${data.username}!</p>`

  // addUserBtn.style.display = 'none';
  userForm.style.display = 'none';
  userId = data.id
  return userId;

}

addUserForm.addEventListener('submit', event => {
    event.preventDefault()

    username = event.target.username.value

})


userForm.addEventListener('submit', event => {
    event.preventDefault()

    username = event.target.username.value


    event.target.reset()
    showHomepage(username)
})
