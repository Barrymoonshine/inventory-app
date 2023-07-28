console.log('hello world');

const dynamicProdContainer = document.querySelector(
  '.dynamic-products-container'
);

dynamicProdContainer.addEventListener('click', (e) => {
  const targetElement = e.target.id;
  switch (targetElement) {
    case 'delete':
      console.log('delete clicked');
      break;
    default:
      console.log('default case');
  }
});
