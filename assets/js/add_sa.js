// BASE Backend URL: https://store-manager-be.herokuapp.com/
const API_URL = 'https://store-manager-be.herokuapp.com'

//   Check if user is logged In
window.addEventListener('load', () => {
  // Check if user is already logged in and redirect appropriately
  if (!localStorage.getItem('user')) {
    location.href = '../../index.html'
  }
})

window.addEventListener('DOMContentLoaded', () => {
  // If User doesn't have admin role, redirect to Sale Attendant Dashboad
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user.role
  const token = user.token
  if (!role.includes('admin')) {
    location.href = '../../sa.html'
  }

  // When Button Clicked
  const username = document.querySelector('#username')
  const password = document.querySelector('#password')

  const registerBtn = document.querySelector('.register')
  registerBtn.addEventListener('click', function (e) {
    e.preventDefault()

    const roles = Array.from(document.getElementById('role').options)
      .filter(option => option.selected)
      .map(option => option.value)

    if (!username.value.trim() || !password.value || role.length < 1) {
      swal({
        text: 'All fields are required',
        icon: 'warning',
        button: 'Ok',
      })

      return
    }

    registerBtn.textContent = 'Loading'

    const data = {
      username: username.value.trim(),
      password: password.value,
      role: roles,
    }

    const config = {
      headers: { Authorization: `${token}` },
    }

    axios
      .post(`${API_URL}/register`, data, config)
      .then(res => {
        swal({
          text: 'SA created successfully.',
          icon: 'success',
          button: 'Ok',
        }).then(() => {
          location.reload()
        })
      })
      .catch(err => {
        swal({
          text: 'Error creating Sale Attendant',
          icon: 'error',
          button: 'Ok',
        })
        registerBtn.textContent = 'Register'
      })
  })
})
