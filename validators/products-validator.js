validators.productPrice = function(input) {
  const [receivedPrice] = input.value.match(/[0-9,]+/);
  const priceNormalized = receivedPrice.replace(',','.');
  const price = parseFloat(priceNormalized);

  if (price) {
      return true;
  }

  input.setCustomValidity('');
}

const valueMissingText = 'O campo [field] não pode estar vazio.';

errorMessages.image = {
  valueMissing: valueMissingText.replace('[field]', 'Imagem'),
  //customError: 'O campo não pode ser menor que 2'
}
errorMessages.category = {
  valueMissing: valueMissingText.replace('[field]', 'Categoria'),
  //customError: 'O campo não pode ser menor que 2'
}
errorMessages.productName = {
  valueMissing: valueMissingText.replace('[field]', 'Nome do produto'),
  //customError: 'O campo não pode ser menor que 2'
}
errorMessages.productPrice = {
  valueMissing: valueMissingText.replace('[field]', 'Preço do produto'),
  customError: 'O campo preço não tem valores corretos!'
}
errorMessages.productDescription = {
  valueMissing: valueMissingText.replace('[field]', 'Descrição do produto'),
  //customError: 'O campo não pode ser menor que 2'
}