
console.log('hello');
const addUserBtn = document.querySelector("#new-user-btn-and-prompt")
const userForm = document.querySelector("#login-form")
const addUserForm = document.querySelector(".add-user-form")
addUserForm.style.display = 'none'
let username
let addUser = false

console.log(userForm);

addUserBtn.addEventListener('click', () => {
    // hide & seek with the form
    addUser = !addUser
    if (addUser) {
        addUserForm.style.display = 'block'
    } else {
        addUserForm.style.display = 'none'
    }
})

function showHomepage(username){

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



function createNewUser(data) {
  const usernameBar = document.querySelector(".username-bar")
  console.log(usernameBar);
  usernameBar.innerHTML=`<p>Start leaving reviews, ${data.username}!</p>`

  addUserBtn.style.display = 'none';
  userForm.style.display = 'none';
  userId = data.id
  return userId;
}


addUserForm.addEventListener('submit', event => {
    event.preventDefault()

    const username = event.target.username.value
  })


userForm.addEventListener('submit', event => {
    event.preventDefault()

    username = event.target.username.value
    console.log(event.target.username);

    event.target.reset()
    showHomepage(username)
})
