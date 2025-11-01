// assets/js/formValidator.js

/**
 * Função utilitária para limpar e validar CPF.
 * @param {string} cpf - CPF no formato 000.000.000-00.
 * @returns {boolean} - true se o CPF é válido, false caso contrário.
 */
function isValidCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, ''); 

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Evita CPFs inválidos conhecidos (todos repetidos)
    if (/^(\d)\1{10}$/.test(cpf)) return false; 

    let sum;
    let remainder;

    // Validação do primeiro dígito
    sum = 0;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // Validação do segundo dígito
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

/**
 * Inicializa a validação do formulário de cadastro.
 */
export function initFormValidation() {
    const form = document.querySelector('form');
    const cpfInput = document.getElementById('cpf');
    
    if (form && cpfInput) {
        
        cpfInput.addEventListener('input', (e) => {
            // Apenas para feedback visual imediato
            const isCpfValid = isValidCPF(e.target.value);
            e.target.setCustomValidity(isCpfValid ? "" : "CPF inválido. Verifique o formato e a consistência.");
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão para validar

            // Força a validação de todos os campos
            if (!form.checkValidity()) {
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                return;
            }

            // Validação de Consistência (CPF)
            if (!isValidCPF(cpfInput.value)) {
                // Aviso ao usuário de preenchimento incorreto
                alert('Erro de Consistência: O CPF inserido é inválido. Por favor, corrija antes de enviar.');
                cpfInput.focus();
                return;
            }

            // Se tudo estiver OK, simula o envio e dá feedback
            alert('Cadastro enviado com sucesso! Obrigado por se juntar ao Caminho Interior.');
            form.reset();
        });
    }
}
