marca = $("#carBrand")
modelo = $("#carModel")
ano = $("#carYear")

// URL do endpoint de login
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
        // Substitua 'token' pelo nome correto do campo que contém o token
        return(data.authorization.token); 
    } catch (error) {
        console.error('Erro ao obter o token:', error);
    }
}

// Função principal para autenticar
getToken().then(token => {
    if (token) {
        console.log('Token obtido:', token);
    }
});


// URL do endpoint de dados do veículo
const vehicleDataUrl = 'https://cluster.apigratis.com/api/v2/vehicles/dados';

// Função para requisitar dados do veículo
async function fetchVehicleData(token, plate) {
    
    try {
        const response = await fetch(vehicleDataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'DeviceToken': 'b05da8fa-524d-402e-86b8-b4c4633a368a' // Substitua com o token real do dispositivo
            },
            body: JSON.stringify({placa: $('#carPlate').val()})
        });
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle data: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Dados do veículo:', data);
        marca.val(data.response.MARCA)
        modelo.val(data.response.MODELO)
        ano.val(data.response.ano)
    } catch (error) {
        console.error('Erro ao requisitar dados do veículo:', error);
    }
}

// Função principal para autenticar e obter dados do veículo
// async function main() {
//     const token = await getToken();
//     if (token) {
//         await fetchVehicleData(token);
//     }
// }


