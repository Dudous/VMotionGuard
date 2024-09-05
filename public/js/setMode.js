document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('light-mode') === 'enabled') {
      document.body.classList.add('light-mode');
      document.getElementById('modeToggle').src = '../img/sun.png';
    }
  });

function toggleDarkMode() {
    const lightModeEnabled = document.body.classList.toggle('light-mode');
    localStorage.setItem('light-mode', lightModeEnabled ? 'enabled' : 'disabled');
    document.getElementById('modeToggle').src = lightModeEnabled ? '../img/sun.png' : '../img/moon.png';
}

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

