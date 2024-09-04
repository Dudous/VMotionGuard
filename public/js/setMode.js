document.addEventListener('DOMContentLoaded', () => {
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
}
});

function toggleDarkMode() {
const darkModeEnabled = document.body.classList.toggle('dark-mode');
localStorage.setItem('dark-mode', darkModeEnabled ? 'enabled' : 'disabled');
}