// Define uma função validadora para o campo "categoria" do formulário.
validators.category = function (input) {
  // Armazena o valor atual do campo "categoria".
  const receivedName = input.value;
  // Define uma variável vazia para a mensagem de erro.
  let message = '';
  // Verifica se o valor atual do campo "categoria" tem mais de 20 caracteres.
  if (receivedName.length > 20) {
    // Define a mensagem de erro caso o valor do campo "categoria" tenha mais de 20 caracteres.
    message = 'O campo Categoria deve conter no máximo 25 caracteres.'
  }
  // Define a mensagem de erro no campo "categoria" do formulário.
  input.setCustomValidity(message);
}


// Define uma função validadora para o campo "Nome do produto" do formulário.
validators.productName = function (input) {
  // Armazena o valor atual do campo "Nome do produto".
  const receivedName = input.value;
  // Define uma variável vazia para a mensagem de erro.
  let message = '';
  // Verifica se o valor atual do campo "Nome do produto" tem mais de 20 caracteres.
  if (receivedName.length > 20) {
    // Define a mensagem de erro caso o valor do campo "Nome do produto" tenha mais de 20 caracteres.
    message = 'O campo Nome deve conter no máximo 20 caracteres.'
  }
  // Define a mensagem de erro no campo "Nome do produto" do formulário.
  input.setCustomValidity(message);
}


// Define uma função validadora para o campo "Preço do produto" do formulário.
validators.productPrice = function (input) {
  // Armazena o valor atual do campo "Preço do produto".
  const receivedPrice = input.value;
  // Define uma variável vazia para a mensagem de erro.
  let message = "";
  // Verifica se o valor atual do campo "Preço do produto" é igual a "R$ 0,00".
  if (receivedPrice == "R$ 0,00") {
    // Define a mensagem de erro para o caso em que o valor do campo "Preço do produto" é igual a "R$ 0,00".
    message = 'O campo preço não tem valor.'
  }
  /* const [receivedPrice] = input.value.match(/[0-9,]+/);
    const priceNormalized = receivedPrice.replace(',', '.');
    const price = parseFloat(priceNormalized);
  
    if (price) {
      return true;
    }*/

  // Define a mensagem de erro no campo "Preço do produto" do formulário.
  input.setCustomValidity(message);
}

// Define uma função validadora para o campo "Descrição do produto" do formulário.
validators.productDescription = function (input) {
  // Armazena o valor atual do campo "Descrição do produto".
  const receivedName = input.value;
  // Define uma variável vazia para a mensagem de erro.
  let message = '';
  // Verifica se o valor atual do campo "Descrição do produto" tem mais de 375 caracteres.
  if (receivedName.length > 375) {
    // Define a mensagem de erro caso o valor do campo "Descrição do produto" tenha mais de 375 caracteres.
    message = 'O campo Nome deve conter no máximo 375 caracteres.'
  }
  // Define a mensagem de erro no campo "Descrição do produto" do formulário.
  input.setCustomValidity(message);
}

// Define uma mensagem de erro padrão para quando um campo obrigatório do formulário estiver vazio.
const valueMissingText = 'O campo [field] não pode estar vazio.';

// Define as mensagens de erro personalizadas para cada campo
errorMessages.image = {
  valueMissing: valueMissingText.replace('[field]', 'Imagem')
  //customError: 'O campo não pode ser menor que 2'
}

/* 
Estes são os objetos que contêm as 
mensagens de erro personalizadas para cada campo do formulário. 
As mensagens de erro são definidas com base no nome do campo e
nos requisitos de validação correspondentes.
`valueMissingText` é uma variável que contém o texto padrão para
o erro de campo vazio, e `[field]` é uma tag que será substituída
pelo nome do campo correspondente.
Os objetos `errorMessages` são usados posteriormente
para exibir as mensagens de erro ao usuário.
 */
errorMessages.category = {
  valueMissing: valueMissingText.replace('[field]', 'Categoria'),
  customError: 'O campo Categoria deve conter no máximo 25 caracteres.'
}
errorMessages.productName = {
  valueMissing: valueMissingText.replace('[field]', 'Nome do produto'),
  customError: 'O campo Nome deve conter no máximo 20 caracteres.'
}
errorMessages.productPrice = {
  valueMissing: valueMissingText.replace('[field]', 'Preço do produto'),
  customError: 'O campo preço não tem valor.'
}
errorMessages.productDescription = {
  valueMissing: valueMissingText.replace('[field]', 'Descrição do produto'),
  customError: 'O campo Nome deve conter no máximo 375 caracteres.'
}