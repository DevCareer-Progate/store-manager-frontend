// BASE Backend URL: https://store-manager-be.herokuapp.com/
const API_URL = 'https://store-manager-be.herokuapp.com'
window.addEventListener('load', () => {
  // Check if user is already logged in and redirect appropriately
  if (!localStorage.getItem('user')) {
    location.href = '../../index.html'
  }

  $('#preloader').fadeOut(1000)

  const { token, role } = JSON.parse(localStorage.getItem('user'))

  const config = {
    headers: { Authorization: `${token}` },
  }

  // Disable
  if (!role.includes('admin')) {
    $('#add_product_btn').hide()
  }

  // Get all products and prefill table
  axios
    .get(`${API_URL}/product`, config)
    .then(res => {
      const products = res.data.data
      products.forEach(product => {
        $('#inventory').append(`<tr class="section__table-row">
          <td class="section__table-data">
            <div class="section-data-product">
              <img
                src="./assets/Images/victoria-wendish-XIEFrTSXoOw-unsplash.jpg"
                alt="the"
              />
              ${product.title}
            </div>
          </td>
          <td class="section__table-data">
            ${product.category}
          </td>
          <td class="section__table-data">
            ${product.quantity}
          </td>
          <td class="section__table-data">
            0
          </td>
          <td class="section__table-data">
            ${product.price}
          </td>
          <td class="section__table-data">
            In Stock
          </td>
          <td>
            <div class="action__but">
              <div class="action__buttons action__buttons-add">
                <i class="fas fa-plus"></i>
              </div>
              <div class="action__buttons action__buttons-remove">
                <i class="fas fa-minus"></i>
              </div>
            </div>
          </td>
          <td class="section__table-data"></td>
        </tr>`)
      })
    })
    .catch(err => {
      console.log(err)
    })
})
