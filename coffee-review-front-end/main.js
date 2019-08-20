const addUserBtn = document.querySelector("#new-user-btn-and-prompt")
const addUserForm = document.querySelector(".add-user-form")
addUserForm.style.display = 'none'
let addUser = false

addUserBtn.addEventListener('click', () => {
    // hide & seek with the form
    addUser = !addUser
    if (addUser) {
        addUserForm.style.display = 'block'
    } else {
        addUserForm.style.display = 'none'
    }
})

addUserForm.addEventListener('submit', event => {
    event.preventDefault()

    const username = event.target.username.value

    event.target.reset()
    showHomepage(username)
})

function showHomepage(username){
    const usernameBar = document.querySelector(".username-bar")
    // Add class and changing tag for CSS
    usernameBar.innerHTML=`<h3 class="welcome-msg">Start leaving reviews, ${username}!</h3>`

    addUserBtn.style.display = 'none'
    addUserForm.style.display = 'none'

}
