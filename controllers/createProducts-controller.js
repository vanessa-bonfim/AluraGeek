const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    try {
        const nome = evento.target.querySelector('[data-nome]').value;
        const email = evento.target.querySelector('[data-email]').value;
     
        await clienteService.criaCliente(nome, email)
        window.location.href = '../html/cadastra_cliente_concluido.html';
    }
    catch(error) {
        console.log(error);
            window.location.href = '../html/erro.html';
    }
});