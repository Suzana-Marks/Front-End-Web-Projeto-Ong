// assets/js/spa.js (CORRIGIDO)

// Mapeamento de rotas e o caminho dos arquivos de conteúdo
const routes = {
    '/': 'index.html', 
    '/projetos.html': 'projetos.html',
    '/cadastro.html': 'cadastro.html'
};

/**
 * Carrega o conteúdo de uma rota (arquivo HTML) na área principal do DOM.
 * @param {string} path - O caminho da rota a ser carregada.
 */
async function loadContent(path) {
    const contentArea = document.getElementById('app-content');
    
    let routeFile = routes[path];

    if (!routeFile || path.endsWith('index.html') || path.endsWith('/')) {
        routeFile = 'index.html'; 
    } 

    if (!routeFile) {
        contentArea.innerHTML = '<h1>404 | Página não encontrada</h1>';
        return;
    }
    
    try {
        const response = await fetch(routeFile);
        
        if (routeFile === 'index.html') {
             // Carrega o index.html e extrai o conteúdo da MAIN
             const tempResponse = await fetch('index.html');
             const fullHtml = await tempResponse.text();
             
             const parser = new DOMParser();
             const doc = parser.parseFromString(fullHtml, 'text/html');
             
             // Injeta o conteúdo completo do MAIN (que inclui os botões de tema!)
             const mainContent = doc.querySelector('#app-content').innerHTML;
             contentArea.innerHTML = mainContent;

        } else {
            // Carrega o conteúdo parcial (projetos.html ou cadastro.html)
            const htmlContent = await response.text();
            contentArea.innerHTML = htmlContent;
        }

        // --- CORREÇÃO CRUCIAL AQUI ---
        // 1. Re-inicializa a validação do formulário se o conteúdo for o cadastro.
        if (routeFile === 'cadastro.html') {
            const { initFormValidation } = await import('./formValidator.js');
            initFormValidation();
        }
        
        // 2. Re-inicializa os botões de TEMA após a injeção (Garante que o tema funcione)
        const { initThemeToggle } = await import('./themeToggle.js');
        initThemeToggle();


    } catch (error) {
        console.error('Erro ao carregar o conteúdo da rota:', error);
        contentArea.innerHTML = '<h1>Erro ao carregar o conteúdo. Verifique o console.</h1>';
    }
}

/**
 * Intercepta o clique nos links para simular a navegação SPA.
 */
export function initSPA() {
    let initialPath = window.location.pathname;

    // Se estiver em um ambiente local como o Codespace (que não reconhece a raiz /)
    if (initialPath.endsWith('index.html') || initialPath === '/') {
        loadContent('index.html'); // Carrega o index.html como ponto de partida
    } else {
        loadContent(initialPath);
    }
    

    // Event listener global para cliques em links
    document.body.addEventListener('click', async (event) => {
        const target = event.target;
        if (target.tagName === 'A' && target.href.startsWith(window.location.origin) && !target.classList.contains('btn-cta')) {
            event.preventDefault(); 
            const path = target.pathname;

            window.history.pushState({}, '', path); 

            loadContent(path); 
        }
    });

    window.addEventListener('popstate', () => {
        loadContent(window.location.pathname);
    });
}
