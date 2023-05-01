(function() {
// Atribuindo ao objeto "search" a referência do elemento com id "search"
let search = document.querySelector("#search");

// Atribuindo ao objeto "boxSearch" a referência do elemento com id "box-search"
let boxSearch = document.querySelector("#box-search");

// Atribuindo ao objeto "glass" a referência do elemento com id "glass"
let glass = document.querySelector('#glass');

// Atribuindo ao objeto "btnLogin" a referência do elemento com id "btn-login"
let btnLogin = document.querySelector('#btn-login');

// Adicionando um listener de "click" ao elemento com id "glass"
glass.addEventListener("click", function(){

    // Verificando se o objeto "btnLogin" existe e ocultando o elemento
    if (btnLogin) {
      btnLogin.style.display = "none";
    }

    // Ocultando o elemento "glass"
    glass.style.display = "none";

    // Exibindo o elemento "boxSearch"
    boxSearch.style.display = "block";
})

// Adicionando um listener de "keyup" ao objeto "search"
search.addEventListener('keyup', (event) => {

    // Prevenindo o comportamento padrão do evento "keyup"
    event.preventDefault();

    // Verificando se a tecla pressionada é "enter"
    if (event.keyCode === 13) {

        // Redirecionando para a página "search_product.html" com o parâmetro "q" na URL
        window.location.href = `search_product.html?q=${event.target.value.replace(" ", "+").toLowerCase()}`;
    }
});
// Define a função createCategory recebendo os parâmetros category e items
const createCategory = (category, items) => {
  // Cria um elemento HTML section
  const categorySection =  document.createElement('section');
  // Adiciona as classes 'borda', 'product', 'container', 'flex', 'flex--column' ao section criado
  categorySection.classList.add('borda', 'product', 'container', 'flex', 'flex--column');
  // Define o id do section criado com o valor da category, substituindo os espaços por hifens e convertendo tudo para minúsculo
  categorySection.setAttribute('id', category.replace(' ', '-').toLowerCase());

  // Cria uma string HTML com um título h2 contendo a category e uma div para os itens
  const subject = `
          <div class="borda products__box-section-title flex flex--column">
              <div class="borda products__box-title">
                  <h2 class="borda products__title">${category}</h2>
              </div>
          </div>
          <div class="borda products__box-section-itens flex flex--wrap" data-products>
          ${items.map(item => createNewLine(item)).join('')}
          </div>`
  ;

  // Insere a string HTML criada acima como conteúdo HTML do section criado
  categorySection.innerHTML = subject;
  // Retorna o section criado
  return categorySection;
}

// Define a função createNewLine recebendo o parâmetro item
const createNewLine = (item) => {
  // Retorna uma string HTML com os detalhes do item
  return `
  <div class="borda products__box-item">
  <div class="borda products__box-image-product">
      <img class="products__image-product" src="${item.image}"
          alt="Product Star Wars 1">
  </div>
  <div class="borda products__box-product-describe">
      <h3 class="products__product-title">${item.title}</h3>
      <p class="products__product-price">${item.price}</p>
      <a class="category__product-view" href="page_product.html?id=${item.id}">Ver produto</a>
  </div>
</div> `;
}

// Definindo uma função assíncrona chamada "render" que recebe um parâmetro "q"
const render = async(q) => {
    
  try {
    // Obtendo a referência para o elemento <main> do HTML
    const main = document.querySelector('main');
    // Chamando o método "listProducts" da variável "productService" para obter a lista de produtos
    const listProducts = await productService.listProducts();
    // Criando um objeto vazio para armazenar as categorias encontradas
    const listCategories = {};
    // Criando um array vazio para armazenar os produtos encontrados
    const listProductsFound = [];
    // Criando uma variável booleana "resultsFound" para verificar se resultados foram encontrados
    let resultsFound = false;
    
    // Loop pelos produtos da lista
    for (let i = 0; i < listProducts.length; i++) {
      // Armazenando o produto atual em uma variável "element"
      const element = listProducts[i];
      // Separando as palavras da busca (q) em um array e verificando se alguma palavra está incluída no título do produto
      const result = q.split(' ').filter(word => element.title.toLowerCase().includes(word.toLowerCase()));
      // Se a busca encontrar alguma palavra no título, adiciona o produto ao array "listProductsFound" e define a variável "resultsFound" como verdadeira
      if (result.length > 0) {
        listProductsFound.push(element);
        resultsFound = true;
      }
    }
    
    // Criando uma seção com a categoria "Resultado da pesquisa" ou "Produto não encontrado" (dependendo dos resultados encontrados) e os produtos encontrados
    const categorySection = createCategory((resultsFound ? 'Resultado da pesquisa' : 'Produto não encontrado.'), listProductsFound);
    // Adicionando a seção criada acima ao elemento <main> do HTML
    main.appendChild(categorySection);
  
  } catch (error) {
    console.log(error);
  }
};

// Criando um novo objeto URL com a URL atual da página
const takeURL = new URL(window.location);
// Obtendo o valor do parâmetro "q" da URL, ou definindo como uma string vazia caso o parâmetro não exista
const q = takeURL.searchParams.get('q') || '';

// Chamando a função "render" com o parâmetro "q"
if (q) {
  render(q);
}

})();