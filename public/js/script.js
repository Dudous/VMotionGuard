// Inicializa o mapa
const map = L.map('map').setView([0, 0], 13); // Inicialmente centralizado em [0, 0]

// Adiciona uma camada de mapa (usando o OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Cria um marcador no mapa (inicialmente sem posição)
const marker = L.marker([0, 0]).addTo(map);

// Função para atualizar a posição do marcador
function updateMarker(lat, lng) {
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 13); // Centraliza o mapa na nova posição
}

// Função para enviar posição para o banco de dados e chamar função updateMarker
const sendData = () => { 
    if('geolocation' in navigator){
        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                updateMarker(latitude, longitude);
                
                fetch('/' + latitude + '/' + longitude, {method: "POST"});
            },
            (error) => {
                console.error('Erro ao obter a localização:', error);
            },
            { enableHighAccuracy: true }
        );
    }
    else{
        alert('n deu :(')
    }
}

setInterval(() => {
    sendData();
}, 5000);