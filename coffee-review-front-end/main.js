const addUserBtn = document.querySelector("#new-user-btn-and-prompt")
const userForm = document.querySelector("#login-form")
let addUser = false

addUserBtn.addEventListener('click', () => {
    // hide & seek with the form
    addUser = !addUser
    if (addUser) {
        userForm.style.display = 'block'
    } else {
        userForm.style.display = 'none'
    }
})

userForm.addEventListener('submit', event => {
    event.preventDefault()
    
    const username = event.target.username.value
    
    event.target.reset()
    showHomepage(username)
})

function showHomepage(username){
    const usernameBar = document.querySelector("#username-bar")
    usernameBar.innerHTML=`<p>Start leaving reviews, ${username}!</p>`

    addUserBtn.style.display = 'none'
    userForm.style.display = 'none'
    
}