console.log('hello world');

const dynamicProdContainer = document.querySelector(
  '.dynamic-products-container'
);

dynamicProdContainer.addEventListener('click', (e) => {
  const targetElement = e.target.id;
  const endpoint = `/products/${e.target.dataset.doc}`;
  switch (targetElement) {
    case 'edit':
      console.log(`edit clicked, endpoint: ${endpoint}`);
      break;
    case 'delete':
      console.log(`delete clicked, endpoint: ${endpoint}`);
      break;
    case 'view':
      console.log(`view clicked, endpoint: ${endpoint}`);
      break;
    default:
      console.log('default case');
  }
});
