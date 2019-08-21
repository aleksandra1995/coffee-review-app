
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


usernameBar.addEventListener('click', function (event) {

  if (event.target.classList.contains('welcome-msg')) {
  const currentUserId = event.target.dataset.id
fetch(`http://localhost:3000/shopreview/${currentUserId}`)
    .then(resp => resp.json())
    .then(oneUserReviews => showUsersReviews(oneUserReviews, currentUserId))}

})


function showUsersReviews(oneUserReviews, currentUserId) {
  if (oneUserReviews === []){console.log("empty")}
  else {
    oneUserReviews.forEach(function (review) {
      console.log(review.comment);

      const pForReview = document.createElement('p')
      // Adding class user-review-card
      pForReview.classList.add("user-review-card")
      pForReview.innerHTML = `
        <h3>Title: ${review.title}</h3>
        <h4>Coffee Shop: ${shopsArray[0][review.shop_id - 1].name}</h4>
        <h4>User: ${usersArray[0][currentUserId - 1].username}</h4>
        <h4>Rating: ${review.rating}</h4>
        <ul>
          <li>
            ${review.comment}
          </li>
        </ul>
      `

      divForNewReview.append(pForReview)
    })
  }

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
        console.log("Lawson was found")
        console.log(username);
        console.log(userId);
        usernameBar.innerHTML=`<p data-id="${userId}" class="welcome-msg">Start leaving reviews, ${username}!</p>`


      } else {
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
        console.log("Make a new user")
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
