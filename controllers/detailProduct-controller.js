// Função anônima assíncrona imediatamente invocada
(async () => {
    // Cria um objeto URL baseado na URL atual da janela
    const takeURL = new URL(window.location);
    // Obtém o valor do parâmetro 'id' da query string da URL
    const id = takeURL.searchParams.get('id');

    try {
        // Obtém o número de produtos por página a partir de um serviço de configuração
        const productsPerPage = await settingsService.getSettingsByKey('product_per_category');
        // Obtém uma referência ao elemento 'main' do documento HTML
        const main = document.querySelector('main');
        // Obtém os detalhes do produto com o ID especificado
        const product = await productService.detailProduct(id);
        // Cria um array vazio para armazenar produtos similares encontrados
        const similarProductsFound = [];
        
        // Obtém uma lista de todos os produtos do serviço de produto
        const listOfProducts = await productService.listProducts();
        // Itera sobre cada produto na lista de produtos
        for (let i = 0; i < listOfProducts.length; i++) {
            // Obtém a referência ao elemento atual do loop
            const element = listOfProducts[i];
            // Separa as palavras do título do produto atual e filtra por aqueles que estão incluídos no título do produto detalhado atual
            const result = product.title.split(' ').filter(word => element.title.toLowerCase().includes(word.toLowerCase()));
            // Se houver palavras em comum entre os títulos dos produtos e o array de produtos similares ainda não atingiu o número máximo de produtos por página
            if (result.length > 0 && similarProductsFound.length < productsPerPage.value) {
                // Adiciona o elemento atual ao array de produtos similares
                similarProductsFound.push(element);
            }
        }

        // Imprime o array de produtos similares encontrados no console
        console.log(similarProductsFound);

        // Adiciona os detalhes do produto e a seção de produtos similares ao elemento 'main' do documento HTML
        main.appendChild(detailsProduct(product));
        main.appendChild(similarProducts(similarProductsFound));
    }
    catch(error) {
        // Imprime o erro no console e exibe uma mensagem de alerta
        console.log(error);
        alert('Não foi possível detalhar produto!');
    }
})();
// Declaração de uma função que recebe um objeto produto como parâmetro
const detailsProduct = (product) => {
    // Cria um novo elemento HTML section
    const productSection = document.createElement('section');
    // Adiciona as classes 'borda' e 'product' ao elemento section criado acima
    productSection.classList.add('borda', 'product');

    // Cria uma template string com HTML dentro dela, incluindo as propriedades do objeto produto
    const subject = `
            <div class="borda product__box flex flex--column">
                <div class="borda product__box-image">
                    <img class="product__image" src="${product.image}" alt="${product.title}">
                </div>
                <div class="borda product__box-product-describe flex flex--column">
                    <h3 class="product__title">${product.title}</h3>
                    <p class="product__price">${product.price}</p>
                    <p class="product__description">
                    ${product.description}
                    </p>
                </div>
            </div>`;

    // Insere o HTML criado acima na seção recém-criada
    productSection.innerHTML = subject;
    // Retorna a seção com as informações do produto
    return productSection;
}

// Declaração de uma função que recebe um array de objetos produtos como parâmetro
const similarProducts = (products) => {
    // Cria um novo elemento HTML section
    const similarSection = document.createElement('section');
    // Adiciona as classes 'borda', 'similar-product', 'container', 'flex', 'flex--column' ao elemento section criado acima
    similarSection.classList.add( 'borda', 'similar-product', 'container', 'flex', 'flex--column',);

    // Cria uma template string com HTML dentro dela, que contém um título e uma lista de produtos
    const subject = `
    <div class="borda similar-product__box-section-title flex flex--row">
        <div class="borda similar-product__box-title">
            <h2 class="borda similar-product__title">Produtos similares</h2>
        </div>
    </div>
    <div class="borda similar-product__box-section-itens flex flex--wrap">
    ${products.map((product)=> createNewLine(product)).join('')}
    </div>`;

    // Insere o HTML criado acima na seção recém-criada
    similarSection.innerHTML = subject;
    // Retorna a seção com os produtos similares
    return similarSection;
}

// Função que recebe um objeto produto como parâmetro e retorna o HTML com informações do produto em uma nova linha
const createNewLine = (product) => {
    return `
    <div class="borda similar-product__box-item">
        <div class="borda similar-product__box-image-product">
            <img class="similar-product__image-product" src="${product.image}" alt="Product Console 1">
        </div>
        <div class="borda similar-product__box-product-describe">
            <h3 class="similar-product__product-title">${product.title}</h3>
            <p class="similar-product__product-price">${product.price}</p>
            <a class="similar-product__product-view" href="page_product.html?id=${product.id}">Ver produto</a>
        </div>
    </div>
`;
} 
