// assets/js/themeToggle.js

function applyTheme(theme) {
    const body = document.body;
    // Remove as classes existentes para evitar conflito (ex: dark-mode + high-contrast)
    body.classList.remove('dark-mode', 'high-contrast'); 

    if (theme === 'dark') {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'contrast') {
        body.classList.add('high-contrast');
        localStorage.setItem('theme', 'contrast');
    } else {
        localStorage.removeItem('theme'); // Modo padrão
    }
}

function initThemeFromStorage() {
    // Aplica o tema salvo (persistência)
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme);
}

export function initThemeToggle() {
    initThemeFromStorage(); 

    // 1. Alternar Modo Escuro
    document.getElementById('toggle-dark-mode')?.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const currentTheme = isDarkMode ? 'light' : 'dark';
        applyTheme(currentTheme); 
    });

    // 2. Alternar Alto Contraste
    document.getElementById('toggle-high-contrast')?.addEventListener('click', () => {
        const isHighContrast = document.body.classList.contains('high-contrast');
        const currentTheme = isHighContrast ? 'light' : 'contrast';
        applyTheme(currentTheme); 
    });
}
