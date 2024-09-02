function validateForm() {
    const emailConfirm = document.getElementById("userEmailConfirm");
    const email = document.getElementById("userEmail");
    const password = document.getElementById("userPassword");
    const passwordConfirm = document.getElementById("userPasswordConfirm");
    
    if(email.value != emailConfirm.value)
        {
            alert("Os campos 'E-mail' e 'Confirmar e-mail' devem ser iguais!");
            return false;
        }

    if(password.value != passwordConfirm.value)
        {
            alert("As senhas não conferem");
            return false;
        }
};


function formatCPF(cpfField) {
    const cpf = cpfField.value.replace(/\D/g, '');
    let formattedCPF = '';

    if (cpf.length > 0) {
        formattedCPF = cpf.substring(0, 3);
    }
    if (cpf.length >= 4) {
        formattedCPF += '.' + cpf.substring(3, 6); 
    }
    if (cpf.length >= 7) {
        formattedCPF += '.' + cpf.substring(6, 9); 
    }
    if (cpf.length >= 10) {
        formattedCPF += '-' + cpf.substring(9, 11);
    }

    cpfField.value = formattedCPF; 
}