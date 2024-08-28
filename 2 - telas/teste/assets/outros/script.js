document.addEventListener('DOMContentLoaded', function() {
    const cpf = document.getElementById('cpf');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmarSenha');
    const termos = document.getElementById('termos');
    const criarConta = document.getElementById('criarConta');

    function validateForm() {
        if (
            cpf.value.trim() !== '' &&
            name.value.trim() !== '' &&
            email.value.trim() !== '' &&
            senha.value.trim() !== '' &&
            confirmarSenha.value.trim() !== '' &&
            termos.checked
        ) {
            criarConta.disabled = false;
        } else {
            criarConta.disabled = true;
        }
    }

    function updateButtonStyle() {
        if (criarConta.disabled) {
            criarConta.classList.add('disabled');
        } else {
            criarConta.classList.remove('disabled');
        }
    }

    cpf.addEventListener('input', () => { validateForm(); updateButtonStyle(); });
    name.addEventListener('input', () => { validateForm(); updateButtonStyle(); });
    email.addEventListener('input', () => { validateForm(); updateButtonStyle(); });
    senha.addEventListener('input', () => { validateForm(); updateButtonStyle(); });
    confirmarSenha.addEventListener('input', () => { validateForm(); updateButtonStyle(); });
    termos.addEventListener('change', () => { validateForm(); updateButtonStyle(); });

    validateForm();
    updateButtonStyle();
});