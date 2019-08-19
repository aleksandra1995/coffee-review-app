const addUserBtn = document.querySelector("#new-user-btn")
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