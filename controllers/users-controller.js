const form = document.querySelector('[data-form]'); // Seleciona o elemento do formulário do DOM usando o atributo data-form

/*let userInfo = storage.get('userInfo'); Obtém os dados do usuário do armazenamento local (localStorage)

if (userInfo) { Se houver dados do usuário no armazenamento local
  userInfo = JSON.parse(userInfo); Converte a string em objeto usando JSON.parse
  document.querySelector('.user').textContent = userInfo.password; Atualiza o conteúdo do elemento HTML com a classe 'user' com a senha do usuário
}*/

form.addEventListener('submit', (event) => { // Adiciona um ouvinte de eventos para o evento de envio do formulário
  event.preventDefault(); // Previne o comportamento padrão do envio do formulário

  const email = document.querySelector('input[name=email]'); // Seleciona o campo de entrada de email do formulário
  const pass = document.querySelector('input[name=password]'); // Seleciona o campo de entrada de senha do formulário

  const formData = { // Cria um objeto com os dados do formulário
    email: email.value, // Atribui o valor do campo de entrada de email ao atributo email do objeto
    password: pass.value // Atribui o valor do campo de entrada de senha ao atributo password do objeto
  }

  usersService.login().then((users) => { // Faz uma solicitação HTTP GET para a API de usuários e, em seguida, executa uma função de retorno de chamada quando a resposta é recebida
    /* É feita uma busca pelo usuário que possui o email informado no campo de entrada do formulário. Se o usuário não for encontrado,
    uma exceção é lançada com uma mensagem de erro. Se o usuário for encontrado, mas a senha estiver incorreta, outra exceção é lançada.
    Se o usuário for encontrado e a senha estiver correta, o objeto de usuário encontrado é armazenado no armazenamento local (localStorage)
    e a página é redirecionada para 'products.html' */
    const userFound = users.find(user => user.email == formData.email); // Procura um usuário com o email fornecido no array de usuários

    if (!userFound) { // Se o usuário não foi encontrado
      throw new Error('Usuário não encontrado!'); // Lança uma exceção com a mensagem de erro
    }

    if (userFound.password != formData.password) { // Se a senha do usuário não corresponder à senha fornecida no formulário
      throw new Error('Senha incorreta!'); // Lança uma exceção com a mensagem de erro
    }

    //storage.set('userInfo', JSON.stringify(userFound)); Armazena o objeto de usuário encontrado no armazenamento local como uma string JSON

    window.location.href = 'products.html'; // Redireciona a página para 'products.html'

  }).catch(function (error) { // Captura e trata exceções lançadas pela solicitação HTTP GET
    alert(error.message); // Exibe uma mensagem de erro ao usuário com a mensagem da exceção lançada
    console.log('Ocorreu o seguinte erro -> ', error); // Exibe informações adicionais de erro no console do navegador
  })
});
