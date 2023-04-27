// Função responsável por fazer a requisição HTTP para a rota de usuários no servidor local
const login = () => {
  return fetch(`http://localhost:3000/users`).then(response => {
    // Verifica se a resposta da requisição foi bem sucedida
    if (response.ok) {
        // Converte a resposta para JSON e retorna
        return response.json();
    }
    // Caso contrário, lança um erro informando que não foi possível concluir o pedido
    throw new Error('Não foi possível concluir o seu pedido.')
  })
}

// Objeto responsável por agrupar os serviços relacionados aos usuários
const usersService = {
  login
}
