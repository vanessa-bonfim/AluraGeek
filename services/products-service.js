const productsList = () => {
    return fetch(`http://localhost:3000/products`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Não foi possível listar os produtos.')
        });
};

const createProduct = (image, categoty, productName, productPrice, productDescription) => {
    return fetch(`http://localhost:3000/products`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            image: image,
            category: categoty, 
            name: productName, 
            price: productPrice, 
            decription: productDescription
        })
    })
        .then(response => {
            if (response.ok) {
                return response.body;
            }
            throw new Error('Não foi possível criar um produto.')
        })
};

const removeProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível remover um produto.')
        }
    })
};

const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/products/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Não foi possível detalhar um produto.')
        });
};

const updateProduct = (id, nome, email) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Não foi possível atualizar os produtos.')
        })
};

export const clienteService = {
    productsList,
    createProduct,
    removeProduct,
    detalhaCliente,
    updateProduct
};