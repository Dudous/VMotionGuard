document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário
    const forms = document.querySelector('.formLogin');

    // Verifica se o formulário foi encontrado antes de adicionar o ouvinte de evento
    if (forms) {
        forms.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio do formulário

            const user = document.getElementById('user').value;
            const senha = document.getElementById('senha').value;

            console.log(`Usuário: ${user}`);
            console.log(`Senha: ${senha}`);
        });
    } else {
        console.error('Formulário não encontrado.');
    }
});
