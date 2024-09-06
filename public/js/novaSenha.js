function validateForm() {
    const password = document.getElementById("novaSenha");
    const passwordConfirm = document.getElementById("confirmSenha");
    
    if(password.value != passwordConfirm.value)
        {
            alert("As senhas não conferem");
            return false;
        }
};