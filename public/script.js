console.log('hello world');

const dynamicProdContainer = document.querySelector(
  '.dynamic-products-container'
);

dynamicProdContainer.addEventListener('click', (e) => {
  const targetElement = e.target.id;
  const endpoint = `/products/${e.target.dataset.doc}`;
  switch (targetElement) {
    case 'delete':
      fetch(endpoint, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => (window.location.href = data.redirect))
        .catch((err) => {
          console.log(err);
        });
      break;
    default:
      console.log('default case');
  }
});
