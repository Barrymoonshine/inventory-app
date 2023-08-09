const editProdForm = document.querySelector('.edit-product-form');
const inStock = document.getElementById('in-stock');
const quantityInput = document.getElementById('quantity');
const productImgUpload = document.getElementById('product-image-upload');
const errorMessages = document.querySelectorAll('.errors');

const getValue = (input) => document.getElementById(`${input}`).value;

editProdForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const endpoint = `/products/${e.target.dataset.doc}`;
    const formData = new FormData();
    formData.append('_id', e.target.dataset.doc);
    formData.append('name', getValue('name'));
    formData.append('productImage', productImgUpload.files[0]);
    formData.append('sku', getValue('sku'));
    formData.append('description', getValue('description'));
    formData.append('price', getValue('price'));
    formData.append('inStock', inStock.checked);
    formData.append('quantity', getValue('quantity'));
    formData.append('category', getValue('category'));
    formData.append('password', getValue('password'));

    const response = await fetch(endpoint, {
      method: 'PUT',
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

      // Add new error messages
      data.forEach((err) => {
        const element = document.querySelector(`.${err.path}-error`);
        element.textContent = err.msg;
      });
    }
  } catch (err) {
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
