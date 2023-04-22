const inputs = document.querySelectorAll('[data-type]');

inputs.forEach(input => {
    //Antes de enviar, adiciona a mascara.
    if (input.dataset.type == 'productPrice') {
        SimpleMaskMoney.setMask(input, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        })
    }

    input.addEventListener('blur', (event) => {
        validates(event.target)
    })
})

function validates(input) {

    const typoOfInput = input.dataset.type;

    if (validators[typoOfInput]) {
        validators[typoOfInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = showErrorMessage(typoOfInput, input)
    }
}

const typoOfError = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const errorMessages = {
    name: {
        valueMissing: 'O campo Nome não pode estar vazio.',
        customError: 'Deve conter no máximo 40 caracteres.'
    },
    text: {
        valueMissing: 'O campo Mensagem não pode estar vazio.',
        customError: 'O campo Mensagem deve conter no máximo 120 caracteres.'
    },
    email: {
        valueMissing: 'O campo Email não pode estar vazio.',
        customError: 'Verifique se o email está correto: "exemplo@exemplo.com".'
    },
    password: {
        valueMissing: 'O campo password não pode estar vazio.'
    },
    description: {
        valueMissing: 'O campo Assunto não pode estar vazio.',
        customError: 'O campo Assunto deve conter no máximo 50 caracteres.'
    },
    price: {
        valueMissing: 'O campo Preço não pode estar vazio.'
    }
}

const validators = {
    /*Contact*/
    name: input => validateName(input),
    text: input => validateText(input),

    /*Login*/
    email: input => validateEmail(input),

    /*Register product */
    //: input => validateSubject(input),
    texto: input => validateText(input)
}


function showErrorMessage(typoOfInput, input) {
    let message = '';
    typoOfError.forEach(error => {
        if (input.validity[error] && !message) {
            message = errorMessages[typoOfInput][error];
        }
    })
    return message
}
function validateName(input) {
    const receivedName = input.value;
    let message = '';

    if (receivedName.length > 40) {
        message = 'O campo Nome deve conter no máximo 40 caracteres.'
    }

    input.setCustomValidity(message) /*função específica do input que retorna uma string  */
}
function validateText(input) {
    const textoRecebido = input.value
    let message = ''

    if (textoRecebido.length > 120) {
        message = 'O campo Mensagem deve conter no máximo 120 caracteres.'
    }

    input.setCustomValidity(message)
}

function validateEmail(input) {

    const receivedEmail = input.value.trim();
    let message = '';

    const expressao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expressao.test(receivedEmail)) {
        message = 'Insira um endereço de e-mail válido: "exemplo@exemplo.com".';
    }

    /*if(!receivedEmail === ?) {
        message = 'Endereço não registrado.';
    }*/

    input.setCustomValidity(message);
}

/* function validatePassword(input) {
    const receivedPassword = input.value.trim();
    let message = ''

    if (!receivedPassword.length === ?) {
        message = 'Senha invalida.'
    }
    input.setCustomValidity(message)
} */


