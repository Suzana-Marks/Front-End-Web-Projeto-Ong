// assets/js/main.js

import { initMenuToggle } from './menu.js';
import { initSPA } from './spa.js';
import { initFormValidation } from './formValidator.js';
import { initThemeToggle } from './themeToggle.js'; // <-- NOVO IMPORT AQUI

// Inicializa todas as funcionalidades do projeto
document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Responsivo
    initMenuToggle();

    // 2. Aplicação SPA Básica
    initSPA();
    
    // 3. Validação de Formulário 
    initFormValidation(); 

    // 4. Controle de Temas de Acessibilidade (NOVA INICIALIZAÇÃO)
    initThemeToggle(); 
});
