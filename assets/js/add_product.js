// BASE Backend URL: https://store-manager-be.herokuapp.com/
const API_URL = 'https://store-manager-be.herokuapp.com'

// Before page loads, check if the user is logged in
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

  // Handle Add Product
  const createProductBtn = document.querySelector('.create_btn')
  // Form Variables
  const title = document.querySelector('#title')
  const price = document.querySelector('#price')
  const category = document.querySelector('#category')
  const quantity = document.querySelector('#quantity')

  createProductBtn.addEventListener('click', function (e) {
    e.preventDefault()
    if (!title.value || !price.value || !category.value || !quantity.value) {
      swal({
        text: 'All fields are required',
        icon: 'warning',
        button: 'Ok',
      })
      return
    }

    const data = {
      title: title.value.trim(),
      category: category.value.trim(),
      price: +price.value,
      quantity: +quantity.value,
    }

    const config = {
      headers: { Authorization: `${token}` },
    }

    axios
      .post(`${API_URL}/product/create`, data, config)
      .then(res => {
        if (res.status === 201)
          swal({
            text: 'Product created successfully',
            icon: 'success',
            button: 'Ok',
          }).then(() => {
            document.querySelector('.form').reset()
            location.href = '../../inventory.html'
          })
      })
      .catch(err => {
        swal({
          text: 'Error creating product',
          icon: 'error',
          button: 'Ok',
        })
      })
  })
})
