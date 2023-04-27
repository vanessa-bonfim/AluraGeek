//  Seleciona o elemento do formulário usando o atributo data-form e guarda da constante form
const form = document.querySelector('[data-form]');

// Adiciona um evento ao formulário que é acionado quando o formulário é enviado
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o comportamento padrão de enviar o formulário

  // Cria um objeto com os valores dos campos do formulário
  const formData = {
    image: document.querySelector('input[name=image]').value, // Obtém o valor do campo de entrada de imagem
    category: document.querySelector('input[name=category]').value, // Obtém o valor do campo de entrada de categoria
    name: document.querySelector('input[name=productName]').value, // Obtém o valor do campo de entrada de nome do produto
    price: document.querySelector('input[name=productPrice]').value, // Obtém o valor do campo de entrada de preço do produto
    description: document.querySelector('textarea[name=productDescription]').value // Obtém o valor do campo de entrada de descrição do produto
  }

  console.log(formData); // Imprime o objeto formData no console
});
