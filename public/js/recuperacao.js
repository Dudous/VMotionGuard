const loginUrl = 'https://cluster.apigratis.com/api/v2/login';

// Credenciais para autenticação
const loginData = {
    email: 'sampaioeeduardo36@gmail.com',
    password: '#Copodagua123'
};

// Configuração da requisição para obter o token
const loginOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
};

// Função para obter o token
async function getToken() {
    try {
        const response = await fetch(loginUrl, loginOptions);
        if (!response.ok) {
            // Detalhamento do erro para ajudar na depuração
            const errorDetails = await response.text();
            throw new Error('Failed to authenticate: ' + response.statusText + ' - ' + errorDetails);
        }
        const data = await response.json();
        return(data.authorization.token); 
    } catch (error) {
        console.error('Erro ao obter o token:', error);
    }
}

const url = 'https://gateway.apibrasil.io/api/v2/whatsapp/sendText';


async function sendMail(token, code, telefone){

    const data = {
      number: telefone,
      text: `Olá, seu código de verificação é: ${code}`
    };

    const headers = {
      'Content-Type': 'application/json',
      'DeviceToken': '3e018ab5-4237-4896-bff2-b854b3c51026',
      'Authorization': `Bearer ${token}`
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => console.log(responseData))
    .catch(error => console.error(error));
}

async function main(code, telefone) {
    const token = await getToken();

    if (token) {
        await sendMail(token, code, telefone);
    }
}


function moveToNext(currentInput, nextInputID) {
    if (currentInput.value.length === 1) {
        document.getElementById(nextInputID).focus();
    }
}
