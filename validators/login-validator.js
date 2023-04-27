 /*Login*/

 /*
 email: input => validateEmail(input)*/
// Função para validar o formato de um endereço de email
validators.email = function(input) {
  const receivedEmail = input.value.trim();
  let message = '';

  // Expressão regular para validar o formato do email
  const expressao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Se o email não estiver no formato válido, adiciona mensagem de erro
  if (!expressao.test(receivedEmail)) {
      message = 'Insira um endereço de e-mail válido: "exemplo@exemplo.com".';
  }

  // Define mensagem de erro customizada para o input
  input.setCustomValidity(message);
}

// Define a mensagem de erro para campos obrigatórios não preenchidos
const valueMissingText = 'O campo [field] não pode estar vazio.';

// Define as mensagens de erro customizadas para cada campo do formulário
errorMessages.email = {
  valueMissing: valueMissingText.replace('[field]', 'Email'),
  customError: 'Verifique se o email está correto: "exemplo@exemplo.com".'
}
errorMessages.password = {
  valueMissing: valueMissingText.replace('[field]', 'Senha'),
  customError: 'O campo preço não tem valores corretos!'
}
