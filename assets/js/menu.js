// assets/js/menu.js

/**
 * Módulo para controlar a funcionalidade do menu hambúrguer responsivo.
 */
export function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Adiciona/Remove a classe 'active' que controla a exibição no CSS (_header.css)
            navMenu.classList.toggle('active');

            // Troca o ícone do botão
            const isMenuOpen = navMenu.classList.contains('active');
            menuToggle.textContent = isMenuOpen ? '✕' : '☰'; // X quando aberto, Hambúrguer quando fechado
            menuToggle.setAttribute('aria-expanded', isMenuOpen);
        });
    }
}
