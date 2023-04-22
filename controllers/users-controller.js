const form = document.querySelector('[data-form]');

/*let userInfo = storage.get('userInfo');

if (userInfo) {
  userInfo = JSON.parse(userInfo);
  document.querySelector('.user').textContent = userInfo.password;
}*/

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name=email]');
  const pass = document.querySelector('input[name=password]');

  const formData = {
    email: email.value,
    password: pass.value
  }

  usersService.login().then((users) => {
    // find, filter, forEach, for...
    // [{id: 1, email: 'a@aa.com'}, {id: 2, email: 'bb@bb.com'}].find(user => user.email == 'cc@cc.com') // null
   
   
    /*const userFound = users.find(function(user) {
      return user.email == formData.email
    });*/
    const userFound = users.find(user => user.email == formData.email);
    
    if (!userFound) {
      throw new Error('Usuário não encontrado!');
    }

    if (userFound.password != formData.password) {
      throw new Error('Senha incorreta!');
    }

    //storage.set('userInfo', JSON.stringify(userFound));

    window.location.href = 'products.html';
    
  }).catch(function(error) {
    alert(error.message);
    console.log('Ocorreu o seguinte erro -> ', error);
  })
});
