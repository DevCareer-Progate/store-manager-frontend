window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('user')) {
    location.href = './index.html'
  } else {
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user.role
    if (role.includes('admin') && location.pathname !== '/dashboard.html') {
      location.href = './dashboard.html'
    }
  }
  // Logout
  const logoutBtn = document.querySelector('.logout')
  logoutBtn.addEventListener('click', e => {
    e.preventDefault()
    if (localStorage.getItem('user')) {
      localStorage.clear()
      location.href = '../../index.html'
    }
  })
})
