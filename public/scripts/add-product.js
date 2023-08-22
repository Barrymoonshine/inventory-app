const addProdForm = document.querySelector('.add-prod-form');
const inStock = document.getElementById('in-stock');
const quantityInput = document.getElementById('quantity');
const errorMessages = document.querySelectorAll('.errors');
const productImgUpload = document.getElementById('product-image');
const categoryError = document.getElementById('category-error');

const getValue = (input) => document.getElementById(`${input}`).value;

addProdForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', getValue('name'));
    formData.append('productImage', productImgUpload.files[0]);
    formData.append('sku', getValue('sku'));
    formData.append('description', getValue('description'));
    formData.append('price', getValue('price'));
    formData.append('inStock', inStock.checked);
    formData.append('quantity', getValue('quantity'));
    formData.append('category', getValue('category'));

    const response = await fetch('/products', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = data.redirect;
    } else {
      // Clear previous error message(s)
      Array.from(errorMessages).forEach((msg) => {
        msg.textContent = '';
      });

      // Add new error message(s)
      data.forEach((err) => {
        const element = document.querySelector(`.${err.path}-error`);
        element.textContent = err.msg;
      });
    }
  } catch (err) {
    categoryError.textContent = `There was an error with adding your new product, please try again. Error code: ${err}`;
    console.log(err);
  }
});

inStock.addEventListener('click', () => {
  if (inStock.checked) {
    quantityInput.value = 0;
    quantityInput.removeAttribute('readonly');
  } else {
    quantityInput.value = 0;
    quantityInput.setAttribute('readonly', true);
  }
});
