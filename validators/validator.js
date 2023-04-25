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
    }
}

const validators = {
    /*Contact*/
    name: input => validateName(input),
    text: input => validateText(input)
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

