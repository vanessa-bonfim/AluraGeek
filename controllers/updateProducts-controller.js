// Criação de uma função assíncrona anônima que será executada imediatamente após sua criação
// Este é um IIFE (Immediately Invoked Function Expression) que é executado imediatamente após ser declarado. Ele contém todo o código dentro dele.
(async () => {
    // Aqui é criado um objeto URL a partir do URL atual da página.
    const takeURL = new URL(window.location);
    // O método searchParams.get() é usado para obter o valor do parâmetro "id" na URL.
    const id = takeURL.searchParams.get('id');

    // Aqui são obtidos os elementos de entrada (input) e área de texto (textarea) do formulário HTML pelo nome.
    const inputImage = document.querySelector('input[name=image]');
    const inputCategory = document.querySelector('input[name=category]');
    const inputTitle = document.querySelector('input[name=productName]');
    const inputPrice = document.querySelector('input[name=productPrice]');
    const inputDescription = document.querySelector('textarea[name=productDescription]');

    try{
        // É chamado o método "detailProduct" do objeto "productService" para obter os detalhes do produto pelo ID.
        const datas = await productService.detailProduct(id);

        // Aqui são definidos os valores dos campos do formulário com os dados obtidos do produto.
        inputImage.value = datas.image;
        inputCategory.value = datas.category;
        inputTitle.value = datas.title;
        inputPrice.value = datas.price;
        inputDescription.value = datas.description;

    }
    catch(error){
        // Em caso de erro, é registrado no console e uma mensagem de alerta é exibida.
        console.log(error);
        alert('Não foi possível detalhar produto!')
    }

    // Aqui é obtido o formulário HTML pelo atributo "data-form".
    const form = document.querySelector('[data-form]');

    // Aqui é adicionado um listener de evento para o evento "submit" do formulário.
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Este método previne o comportamento padrão do evento de atualizar a página.

        try{
            // É chamado o método "updateProduct" do objeto "productService" para atualizar o produto no servidor.
            await productService.updateProduct(id, inputImage.value, inputCategory.value, inputTitle.value, inputPrice.value, inputDescription.value)
            // É exibida uma mensagem de alerta em caso de sucesso e a página é redirecionada para "products.html".
            //alert('Produto atualizado com sucesso!')
            window.location.href = 'products.html';
        }
        catch(error){
            // Em caso de erro, é registrado no console e uma mensagem de alerta é exibida.
            console.log(error);
            alert('Não foi possível atualizar produto!')
            // A página é redirecionada para "products.html".
            window.location.href = 'products.html';
        }

    });

})()
