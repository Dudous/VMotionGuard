function validateForm() {
    const emailConfirm = document.getElementById("userEmailConfirm");
    const email = document.getElementById("userEmail");
    const cpf = document.getElementById("userCPF")
    const password = document.getElementById("userPassword");
    const passwordConfirm = document.getElementById("userPasswordConfirm");
    const tel = document.getElementById("userTel")
    
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
    if(cpf.value.length < 14)
    {
        alert("o CPF precisa ter 11 dígitos")
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

function formatPhone(input) {
    let phone = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (phone.length <= 13) { 
      const formatted = phone.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4');
      input.value = formatted;
    } else {
      input.value = input.value.slice(0, input.maxLength); 
    }
  }

