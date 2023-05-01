// Define uma função que recebe uma categoria e seus respectivos itens como argumentos
const createCategory = (category, items) => {
    // Cria um elemento HTML <section>
    const categorySection = document.createElement('section');
    // Adiciona classes ao elemento criado
    categorySection.classList.add('borda', 'category', 'container', 'flex', 'flex--column');
    // Define um atributo de ID com base na categoria recebida como argumento
    categorySection.setAttribute('id', category.replace(' ', '-').toLowerCase());

    // Cria uma string HTML com o título da categoria e seus itens, com base no array de itens recebido como argumento
    const subject = `
    <div class="borda category__box-section-title flex flex--row">
        <div class="borda category__box-title">
            <h2 class="borda category__title">${category}</h2>
        </div>
        <div class="borda category__box-all-products-view">
            <a href="products.html"> Ver tudo <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
    <div class="borda category__box-section-itens flex flex--wrap">${items.map(item => createNewLine(item)).join('')
        }</div>`; // abre a interpolação de string; chama o método map que percorre o array de items; para cada item, chama a função createNewLine; que retorna uma string; converte o array de strings em uma única string; fecha a interpolação de string;
        

    // Define a string HTML criada como conteúdo do elemento <section> criado anteriormente
    categorySection.innerHTML = subject;
    // Retorna o elemento criado com o conteúdo da categoria e seus itens
    return categorySection;
}

// Função para criar o template de um item de produto para ser utilizado em uma lista
const createNewLine = (item) => {
    return `
     <div class="borda category__box-item">
         <div class="borda category__box-image-product">
             <img class="category__image-product" src="${item.image}"
                 alt="${item.title}">
         </div>
         <div class="borda category__box-product-describe">
             <h3 class="category__product-title">${item.title}</h3>
             <p class="category__product-price">${item.price}</p>
             <a class="category__product-view" href="page_product.html?id=${item.id}">Ver produto</a>
         </div>
     </div>`;
}

// Função para renderizar as categorias e seus respectivos produtos
const render = async () => {
    try {
        // Obter o número de produtos por página da chave "product_per_category" armazenada no serviço de configurações
        const productsPerPage = await settingsService.getSettingsByKey('product_per_category');

        // Selecionar o elemento <main> do DOM
        const main = document.querySelector('main');

        // Obter a lista completa de produtos do serviço de produtos
        const listOfProducts = await productService.listProducts();

        // Inicializar um objeto para armazenar as categorias e seus respectivos produtos
        const listCategories = {};

        // Percorrer a lista de produtos e agrupá-los por categoria em um objeto
        for (let i = 0; i < listOfProducts.length; i++) {
            // Iterando sobre cada elemento na lista de produtos.
            const element = listOfProducts[i];
            // Armazena o elemento atual em uma constante chamada 'element'.

            if (listCategories[element.category] === undefined) {
                // Se não houver uma chave na lista de categorias que corresponda à categoria do elemento atual...
                listCategories[element.category] = [];
                // ...cria uma nova chave na lista de categorias com a categoria do elemento atual como chave e inicializa com um array vazio.
            }

            if (listCategories[element.category].length < productsPerPage.value) {
                // Se o número de itens já adicionados para esta categoria for menor que o número máximo de itens por categoria...
                listCategories[element.category].push(element);
                // ...adiciona o elemento atual à lista de itens para essa categoria.
            }
        }


        // Percorrer o objeto com as categorias e renderizar o template HTML de cada categoria com seus respectivos produtos
        // Loop através de cada categoria na lista de categorias
        for (const category in listCategories) {
            // Chama a função 'createCategory' para criar uma nova seção para a categoria atual
            // passando como parâmetro o nome da categoria e a lista de produtos associados a ela
            const categorySection = createCategory(category, listCategories[category]);
            // Adiciona a nova seção criada no passo anterior ao elemento principal da página
            main.appendChild(categorySection);
        }


    } catch (error) {
        console.log(error);
    }
};

// Chamar a função render() para iniciar a renderização dos produtos
render();
