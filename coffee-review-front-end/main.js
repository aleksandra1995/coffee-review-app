
const addUserBtn = document.querySelector("#new-user-btn-and-prompt")
const userForm = document.querySelector("#login-form")
const addUserForm = document.querySelector(".add-user-form")
let userId
let username
let addUser = false
const usernameBar = document.querySelector(".username-bar")
let userExists = false


usernameBar.addEventListener('click', function (event) {

  if (event.target.classList.contains('welcome-msg')) {
  const currentUserId = event.target.dataset.id
fetch(`http://localhost:3000/shopreview/${currentUserId}`)
    .then(resp => resp.json())
    .then(oneUserReviews => showUsersReviews(oneUserReviews))}

})


function showUsersReviews(oneUserReviews) {
if (oneUserReviews === []){console.log("empty")}
else {
  oneUserReviews.forEach(function (review) {
    console.log(review.comment);
  })}

}


function showHomepage(username){


  fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(function (userToFind ) {
        // console.log(username);
        userToFind.find(function(user) {
          // console.log(user);

          if (user.username === username){
            // console.log("Lawson was found")
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
