const login = () => {
  return fetch(`http://localhost:3000/users`).then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Não foi possível concluir o seu pedido.')
  })
}

const usersService = {
  login
}