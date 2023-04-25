
validators.category = function (input) {
  const receivedName = input.value;
  let message = '';

  if (receivedName.length > 20) {
      message = 'O campo Categoria deve conter no máximo 25 caracteres.'
  }

  input.setCustomValidity(message);
}

validators.productName = function (input) {
  const receivedName = input.value;
  let message = '';

  if (receivedName.length > 20) {
      message = 'O campo Nome deve conter no máximo 20 caracteres.'
  }

  input.setCustomValidity(message);
}

validators.productPrice = function (input) {
/*   debugger */
  const receivedPrice = input.value;
let message = "";
  if(receivedPrice == "R$ 0,00") {
    message = 'O campo preço não tem valor.'
  }
  /* const [receivedPrice] = input.value.match(/[0-9,]+/);
  const priceNormalized = receivedPrice.replace(',', '.');
  const price = parseFloat(priceNormalized);

  if (price) {
    return true;
  }*/
  input.setCustomValidity(message);
  
}
validators.productDescription = function (input) {
  const receivedName = input.value;
  let message = '';

  if (receivedName.length > 375) {
      message = 'O campo Nome deve conter no máximo 375 caracteres.'
  }

  input.setCustomValidity(message);
}

const valueMissingText = 'O campo [field] não pode estar vazio.';

errorMessages.image = {
  valueMissing: valueMissingText.replace('[field]', 'Imagem')
  //customError: 'O campo não pode ser menor que 2'
}
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