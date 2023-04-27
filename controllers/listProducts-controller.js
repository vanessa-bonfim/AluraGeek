// Cria uma função chamada createNewLine que recebe quatro parâmetros: image, title, price e id
const createNewLine = (image, title, price, id) => {
    // Cria um novo elemento div e adiciona a classe 'products__box-item'
    const boxItem = document.createElement('div');
    boxItem.classList.add('products__box-item');
    
    // Cria uma string de template com o HTML para cada linha do produto
    const subject = 
                  `<div class="borda products__box-item">
                      <div class="borda products__box-image-product">
                          <img class="products__image-product" src="${image}" alt="${title}">
                      </div>
                      <div class="borda products__box-product-describe">
                          <h3 class="products__product-title">${title}</h3>
                          <p class="products__product-price">R$ ${price}</p>
                          <p class="products__product-id">${id}</p>
                      </div>
                      <div class="borda products__box-actions flex flex--row">
                          <a class="borda fontawesome products__action-delete" onclick="del(${id});" href=""><i
                                  class="fa-solid fa-trash"></i></a>
                          <a class="borda fontawesome products__action-edit" href="update_product.html?id=${id}"><i class="fa-solid fa-pen"></i></a>
                      </div>
                  </div>`;
    
    // Define o conteúdo HTML do elemento div com a string de template criada acima
    boxItem.innerHTML = subject;    
    
    // Define o atributo de dados do elemento div como o id do produto
    boxItem.dataset.id = id;
    
    // Retorna o elemento div criado com todos os elementos filho e atributos
    return boxItem;
  }
  
  // Cria uma função chamada del que recebe o id do produto a ser excluído como parâmetro
  async function del(id) {
    try {
      // Pede confirmação antes de excluir o produto
      const confirmDelete = confirm('Você tem certeza de que deseja excluir este produto?');
      if (!confirmDelete) {
        // Se o usuário não confirmar a exclusão, retorna
        return;
      }
      
      // Remove o produto do servidor
      await productService.removeProduct(id)
      
      // Remove a linha do produto da lista
      lineProduct.remove()
    }
    catch(error){
      // Se ocorrer um erro, exibe uma mensagem de alerta
      console.log(error)
      alert("Não foi possível remover o produto!")
    }
  }
  
  // Seleciona o elemento HTML com o atributo de dados "data-products"
  const section = document.querySelector('[data-products]');
  /* section.addEventListener('click', async (event) => {
    event.preventDefault();
    let isButtomDelete = event.target.className === 'products__action-delete';
    if (isButtomDelete) {
        try {
            
            const lineProduct = event.target.closest('[data-id]');
            let id = lineProduct.dataset.id;
            
            // Pede confirmação antes de excluir o produto
            const confirmDelete = confirm('Você tem certeza de que deseja excluir este produto?');
            if (!confirmDelete) {
                return;
            }
            
            await productService.removeProduct(id)
            lineProduct.remove()
    
        }
        catch(error){
            console.log(error)
            alert("Não foi possível remover o produto!")
        }
    }
}) */
  
  // Cria uma função assíncrona chamada render
  const render = async() => {
    try {
      // Pede ao servidor a lista de produtos
      const listProducts = await productService.listProducts()
      
      // Itera pela lista de produtos e adiciona uma nova linha de produto para cada um
      listProducts.forEach(element => {
        section.appendChild(createNewLine(element.image, element.title, element.price, element.id))
      });
    } catch (error) {
      // Se ocorrer um erro, exibe uma mensagem de alerta
      console.log(error);
      alert("Não foi possível listar o produto!")
    }
  };
  
  // Chama a função render para exibir a lista de produtos na página
  render();
  