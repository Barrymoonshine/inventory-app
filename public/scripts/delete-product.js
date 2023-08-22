const deleteForm = document.querySelector('.delete-form');
const passwordError = document.querySelector('.password-error');

deleteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const passwordObj = {
    password: document.getElementById('password').value,
  };

  const endpoint = `/products/delete-product/${e.target.dataset.doc}`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordObj),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = data.redirect;
    } else {
      passwordError.textContent = data[0].msg;
    }
  } catch (err) {
    passwordError.textContent = `There was an error with deleting this product, please try again. Error: ${err.message}`;
    console.log(err);
  }
});
