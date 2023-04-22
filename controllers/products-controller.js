const form = document.querySelector('[data-form]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    image: document.querySelector('input[name=image]').value,
    category: document.querySelector('input[name=category]').value,
    name: document.querySelector('input[name=productName]').value,
    price: document.querySelector('input[name=productPrice]').value,
    description: document.querySelector('input[name=productDescription]').value
  }
  console.log(formData);
});
