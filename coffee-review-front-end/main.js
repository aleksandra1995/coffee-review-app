
const addUserBtn = document.querySelector("#new-user-btn-and-prompt")
const userForm = document.querySelector("#login-form")
const addUserForm = document.querySelector(".add-user-form")

function showUsersReviews(oneUserReviews) {
  oneUserReviews.forEach(function (review) {
    console.log(review.comment);
  })
}


function showHomepage(username){

  let userExists = false

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
        usernameBar.innerHTML=`<p data-id="${userId}" class="user">Start leaving reviews, ${username}!</p>`


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
  usernameBar.innerHTML=`<p class="welcome-msg">Start leaving reviews, ${data.username}!</p>`

  addUserBtn.style.display = 'none';
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
