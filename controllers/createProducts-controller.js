// Seleciona o elemento HTML do formulário com o atributo 'data-form'
const form = document.querySelector('[data-form]');

// Adiciona um evento de escuta ao formulário para capturar o envio de dados
form.addEventListener('submit', async (event) => {
    // Prevenir o comportamento padrão do evento de envio de formulário
    event.preventDefault();
    try {
        // Seleciona cada campo do formulário pelos seus atributos 'data-type' e obtém seus valores
        const image = event.target.querySelector('[data-type="image"]').value;
        const category = event.target.querySelector('[data-type="category"]').value;
        const title = event.target.querySelector('[data-type="productName"]').value;
        const price = event.target.querySelector('[data-type="productPrice"]').value;
        const description = event.target.querySelector('[data-type="productDescription"]').value;

        // Chama a função 'createProduct' do módulo 'productService' para criar um novo produto com as informações obtidas do formulário
        await productService.createProduct(image, category, title, price, description);

        // Redireciona o usuário para a página 'products.html'
        window.location.href = 'products.html';

        // Exibe uma mensagem de alerta ao usuário informando que o produto foi criado com sucesso
        alert("O produto foi criado!");
    }
    catch(error) {
        // Em caso de erro, exibe o erro no console e redireciona o usuário para a página 'register_product.html'
        console.log(error);
        window.location.href = 'register_product.html';
        // Exibe uma mensagem de alerta ao usuário informando que não foi possível criar o produto
        alert("Não foi possível criar o produto!");
    }
});
