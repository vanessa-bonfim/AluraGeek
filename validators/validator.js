const inputs = document.querySelectorAll('[data-type]'); // Seleciona todos os elementos do documento HTML que possuem o atributo "data-type" e armazena em uma variável chamada "inputs".

inputs.forEach(input => { // Itera sobre todos os elementos selecionados na variável "inputs".

    // Antes de enviar, adiciona a máscara monetária para o campo de preço do produto.
    if (input.dataset.type == 'productPrice') {
        /*
        Essas opções da máscara podem variar de acordo com
        a biblioteca ou o plugin utilizado para formatar inputs.*/

        SimpleMaskMoney.setMask(input, { // Chamada do método setMask da biblioteca SimpleMaskMoney, que aplica uma máscara de formatação ao input especificado
            prefix: 'R$ ', // Define o prefixo da máscara como 'R$'
            fixed: true, // Define que o número de casas decimais será fixo
            fractionDigits: 2, // Define que a máscara terá 2 casas decimais
            decimalSeparator: ',', // Define a vírgula como separador decimal
            thousandsSeparator: '.', // Define o ponto como separador de milhares
            cursor: 'end' // Define a posição do cursor após a formatação como o final do input
        });
        
    }

    input.addEventListener('blur', (event) => { // Adiciona um evento de "blur" (quando o campo perde o foco) para o elemento atual e executa a função "validates".
        validates(event.target);
    });
});

function validates(input) { // Função que valida o campo de entrada recebido.

    const typoOfInput = input.dataset.type; // Armazena o tipo de entrada na variável "typoOfInput".

    if (validators[typoOfInput]) { // Verifica se a entrada possui um validador definido na lista "validators" e executa-o, se houver.
        validators[typoOfInput](input);
    }

    if (input.validity.valid) { // Verifica se o campo é válido.
        input.parentElement.classList.remove('input-container--invalid'); // Remove a classe "input-container--invalid" do elemento pai.
        input.parentElement.querySelector('.input-message-error').innerHTML = ''; // Limpa a mensagem de erro exibida.
    } else { // Caso contrário, adiciona a classe "input-container--invalid" ao elemento pai e exibe a mensagem de erro correspondente.
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = showErrorMessage(typoOfInput, input);
    }
}

const typoOfError = [ // Lista de tipos de erro possíveis.
    'valueMissing', // erro quando o valor é obrigatório mas não foi preenchido
    'typeMismatch', // erro quando o valor não corresponde ao tipo esperado (por exemplo, um e-mail inválido)
    'patternMismatch', // erro quando o valor não corresponde ao padrão especificado (usado para validação de regex)
    'customError' // erro personalizado, definido pelo desenvolvedor
];


// Um objeto chamado errorMessages que contém mensagens de erro para cada tipo de input
const errorMessages = { 
    // Para o input de nome
    name: {
        // Mensagem de erro caso o campo esteja vazio
        valueMissing: 'O campo Nome não pode estar vazio.',
        // Mensagem de erro caso o campo tenha mais de 40 caracteres
        customError: 'Deve conter no máximo 40 caracteres.'
    },
    // Para o input de mensagem
    text: {
        // Mensagem de erro caso o campo esteja vazio
        valueMissing: 'O campo Mensagem não pode estar vazio.',
        // Mensagem de erro caso o campo tenha mais de 120 caracteres
        customError: 'O campo Mensagem deve conter no máximo 120 caracteres.'
    }
};


// Objeto "validators" contendo duas propriedades (name e text) que possuem funções como valores.
/* A função "validateName" será usada para validar
o campo de entrada cujo atributo "data-type" seja "name",
enquanto a função "validateText" será usada para validar
o campo de entrada cujo atributo "data-type" seja "text".*/
const validators = {
    // A propriedade "name" tem como valor a função "validateName".
    name: input => validateName(input),
    // A propriedade "text" tem como valor a função "validateText".
    text: input => validateText(input)
};


function showErrorMessage(typoOfInput, input) { // Função para mostrar a mensagem de erro de validação.
    let message = ''; // Inicializa a variável message com uma string vazia.
    typoOfError.forEach(error => { // Itera sobre o array typoOfError, que contém os tipos de erros a serem validados.
        if (input.validity[error] && !message) { // Se a validação do input retorna verdadeiro para o tipo de erro e não há mensagem de erro, atualiza a variável message com a mensagem correspondente.
            message = errorMessages[typoOfInput][error];//errorMessages é um objeto aninhado, onde cada chave principal (name ou text) possui um objeto associado com possíveis erros (valueMissing ou customError) e a mensagem de erro correspondente a esse erro.
        }
    });

    return message; // Retorna a mensagem de erro, que pode ser uma string vazia caso não haja erro.
}


// Função que valida o campo nome recebido.
function validateName(input) {
    const receivedName = input.value; // Armazena o valor do input na variável receivedName
    let message = ''; // Cria uma string vazia para armazenar a mensagem de erro, caso exista

    if (receivedName.length > 40) { // Se o comprimento do nome for maior que 40
        message = 'O campo Nome deve conter no máximo 40 caracteres.' // Define a mensagem de erro
    }

    input.setCustomValidity(message) // Define a mensagem de erro personalizada no input usando o método setCustomValidity
}

// Função que valida o campo texto recebido.
function validateText(input) {
    const textoRecebido = input.value // Armazena o valor do input na variável textoRecebido
    let message = '' // Cria uma string vazia para armazenar a mensagem de erro, caso exista

    if (textoRecebido.length > 120) { // Se o comprimento do texto for maior que 120
        message = 'O campo Mensagem deve conter no máximo 120 caracteres.' // Define a mensagem de erro
    }

    input.setCustomValidity(message) // Define a mensagem de erro personalizada no input usando o método setCustomValidity
}
