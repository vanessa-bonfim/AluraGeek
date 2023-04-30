const getSettings = () => { // Declaração da função listProducts
    return fetch(`http://localhost:3000/settings`) // Realiza uma requisição GET para a URL especificada, que retorna uma promessa
        .then(response => { // Trata a promessa retornada pela requisição GET
            if (response.ok) { // Verifica se a resposta da requisição foi bem sucedida
                return response.json(); // Se sim, retorna o corpo da resposta em formato JSON, que retorna uma nova promessa
            }
            throw new Error('Não foi possível listar as configurações.'); // Se não, lança um erro com uma mensagem
        });
};

const getSettingsByKey = (key) => {
    return new Promise((resolve, reject) => {
        getSettings()
            .then(settings => {
                const setting = settings.find(setting => setting.key === key);
                if (setting) {
                    resolve(setting);
                } else {
                    reject('Não foi possível encontrar a configuração.');
                }
            })
            .catch(error => reject(error));
    })
}

// Este objeto encapsula várias funções relacionadas à API RESTful de gerenciamento de produtos
const settingsService = {
    getSettings,
    getSettingsByKey
}
