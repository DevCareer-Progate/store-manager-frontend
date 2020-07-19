// BASE Backend URL: https://store-manager-be.herokuapp.com/
const API_URL = 'https://store-manager-be.herokuapp.com'

// Check if user is already logged In
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('user')) {
    // Check role
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role.includes('admin')) {
      location.href = '../../dashboard.html'
    } else {
      location.href = '../../sa.html'
    }
  }
})

// Login Variables
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginBtn = document.querySelector('.login')

// Sign In Handling
window.addEventListener('DOMContentLoaded', () => {
  // If Login Button is click or form submission
  loginBtn.addEventListener('click', e => {
    e.preventDefault()
    if (!username.value || !password.value) {
      swal({
        text: 'All fields are required',
        icon: 'info',
        button: 'Ok',
      })
      return
    }

    // Attempt submission
    const data = {
      username: username.value.trim(),
      password: password.value.trim(),
    }

    loginBtn.textContent = 'Loading'

    axios
      .post(`${API_URL}/login`, data)
      .then(res => {
        if (res.status === 200) {
          token = res.data.token.replace('Bearer', '')

          const user = {
            token: token,
            id: res.data.data.id,
            role: res.data.data.role,
          }
          // Set Local Storage
          localStorage.setItem('user', JSON.stringify(user))

          // Redirect Appropriately
          if (res.data.data.role.includes('admin')) {
            location.href = '../../dashboard.html'
          } else {
            location.href = '../../sa.html'
          }
        }
      })
      .catch(err => {
        swal({
          text: 'Incorrect Login Credentials',
          icon: 'error',
          button: 'Ok',
        })
        loginBtn.textContent = 'Login'
      })
  })
})
