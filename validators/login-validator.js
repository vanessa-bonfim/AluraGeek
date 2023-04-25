 /*Login*/

 /*
 email: input => validateEmail(input)*/
 validators.email = function(input) {
  const receivedEmail = input.value.trim();
  let message = '';

  const expressao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!expressao.test(receivedEmail)) {
      message = 'Insira um endereço de e-mail válido: "exemplo@exemplo.com".';
  }

  input.setCustomValidity(message);
}

const valueMissingText = 'O campo [field] não pode estar vazio.';

errorMessages.email = {
  valueMissing: valueMissingText.replace('[field]', 'Email'),
  customError: 'Verifique se o email está correto: "exemplo@exemplo.com".'
}
errorMessages.password = {
  valueMissing: valueMissingText.replace('[field]', 'Senha'),
  customError: 'O campo preço não tem valores corretos!'
}