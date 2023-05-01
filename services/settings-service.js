// Define uma função chamada getSettings sem nenhum parâmetro
const getSettings = () => {
    // Realiza uma chamada para a API através do método fetch e retorna uma promessa
    return fetch(`http://localhost:3000/settings`)
        .then(response => {
            // Verifica se a resposta da API foi bem sucedida através da propriedade "ok"
            if (response.ok) {
                // Se a resposta foi bem sucedida, retorna os dados no formato JSON através do método "json()"
                return response.json();
            }
            // Caso contrário, lança uma exceção com a mensagem "Não foi possível listar as configurações."
            throw new Error('Não foi possível listar as configurações.');
        });
};
// a função getSettingsByKey recebe uma chave como parâmetro
const getSettingsByKey = (key) => {
    // retorna uma nova Promise com dois parâmetros: resolve e reject
    return new Promise((resolve, reject) => {
        // chama a função getSettings, que retorna uma Promise, e trata o resultado
        getSettings()
            .then(settings => {
                // filtra as configurações e retorna a configuração cuja chave é igual ao parâmetro key
                const setting = settings.find(setting => setting.key === key);
                // verifica se encontrou uma configuração e resolve a Promise com a configuração encontrada
                if (setting) {
                    resolve(setting);
                } else {
                    // caso contrário, rejeita a Promise com uma mensagem de erro
                    reject('Não foi possível encontrar a configuração.');
                }
            })
            // trata o erro, caso a Promise seja rejeitada, e passa o erro para a próxima Promise
            .catch(error => reject(error));
    })
}

// cria um objeto settingsService com duas funções: getSettings e getSettingsByKey
const settingsService = {
    getSettings,
    getSettingsByKey
}
