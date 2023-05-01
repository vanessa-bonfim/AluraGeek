const productService = {};

productService.listProducts = () => { // Declaração da função listProducts
    return fetch(`http://localhost:3000/products`) // Realiza uma requisição GET para a URL especificada, que retorna uma promessa
        .then(response => { // Trata a promessa retornada pela requisição GET
            if (response.ok) { // Verifica se a resposta da requisição foi bem sucedida
                return response.json(); // Se sim, retorna o corpo da resposta em formato JSON, que retorna uma nova promessa
            }
            throw new Error('Não foi possível listar os produtos.'); // Se não, lança um erro com uma mensagem
        });
};

productService.createProduct = (image, categoty, productName, productPrice, productDescription) => { // Declaração da função createProduct com os parâmetros image, categoty, productName, productPrice e productDescription
    return fetch(`http://localhost:3000/products`, { // Realiza uma requisição POST para a URL especificada, que retorna uma promessa
        method: 'POST', // Especifica o método da requisição como POST
        headers: { // Define os cabeçalhos da requisição
            'Content-type': 'application/json' // Define o tipo do conteúdo como JSON
        },
        body: JSON.stringify({ // Define o corpo da requisição como um objeto JSON com as propriedades image, category, title, price e description
            image: image,
            category: categoty,
            title: productName,
            price: productPrice,
            description: productDescription
        })
    })
        .then(response => { // Trata a promessa retornada pela requisição POST
            if (response.ok) { // Verifica se a resposta da requisição foi bem sucedida
                return response.body; // Se sim, retorna o corpo da resposta
            }
            throw new Error('Não foi possível criar um produto.'); // Se não, lança um erro com uma mensagem
        })
};

productService.removeProduct = (id) => { // Declaração da função removeProduct com o parâmetro id
    return fetch(`http://localhost:3000/products/${id}`, { // Realiza uma requisição DELETE para a URL especificada, que retorna uma promessa
        method: 'DELETE' // Especifica o método da requisição como DELETE
    }).then(response => { // Trata a promessa retornada pela requisição DELETE
        if (!response.ok) { // Verifica se a resposta da requisição não foi bem sucedida
            throw new Error('Não foi possível remover um produto.'); // Se não, lança um erro com uma mensagem
        }
    })
};

productService.detailProduct = (id) => { // Declaração da função detailProduct com o parâmetro id
    return fetch(`http://localhost:3000/products/${id}`) // Realiza uma requisição GET para a URL especificada, que retorna uma promessa
        .then(response => { // Trata a promessa retornada pela requisição GET
            if (response.ok) { // Verifica se a resposta da requisição foi bem sucedida
                return response.json(); // Se sim, retorna o corpo da resposta em formato JSON, que retorna uma nova promessa
            }
            throw new Error('Não foi possível detalhar um produto.'); // Se não, lança um erro com uma mensagem
        });
};
// Esta função recebe como parâmetros os dados do produto que serão atualizados
productService.updateProduct = (id, image, category, productName, productPrice, productDescription) => {
    // A função fetch é usada para fazer uma requisição HTTP PUT ao servidor,
    // informando a URL da API RESTful que receberá a atualização
    return fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',// Especifica o método HTTP da requisição como PUT
        headers: { // Define o cabeçalho da requisição como "application/json"
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ // O corpo da requisição contém os novos dados do produto em formato JSON
            image: image,
            category: category,
            title: productName,
            price: productPrice,
            description: productDescription
        })
    })
        .then(response => { // A função then() é usada para tratar a resposta da requisição

            // Se a resposta HTTP for 200 OK, retorna a resposta em formato JSON
            if (response.ok) {
                return response.json();
            }

            // Caso contrário, lança um erro com a mensagem personalizada abaixo
            throw new Error('Não foi possível atualizar os produtos.');
        });
};


//// Este objeto encapsula várias funções relacionadas à API RESTful de gerenciamento de produtos
//const productService = {
//    listProducts,    // função para listar todos os produtos
//    createProduct,   // função para criar um novo produto
//    removeProduct,   // função para remover um produto existente
//    detailProduct,   // função para obter detalhes de um produto
//    updateProduct    // função para atualizar um produto existente
//};