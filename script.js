// - - - VARIÁVEIS - - -

const visor = document.getElementById('visor');
const botoes = document.querySelectorAll('.numero');
const limpar = document.getElementById('reset');
const executar = document.getElementById('efetuar');
const operacoes = document.querySelectorAll('.operador');
const historico = document.getElementById('historico');
let itemHistorico = document.querySelectorAll('.item_historico');
let arrayHistorico = [];
let valor1;
let valor2;
let operador;
let total;

// - - - EVENTOS - - -

// Visualiza o botão clicado e adiciona o valor dele na tela
botoes.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (visor.innerHTML == '0') {
            visor.innerHTML = btn.value;
        } else {
            visor.innerHTML += btn.value;
        };
    });
});

limpar.addEventListener('click', () => {
    limpaVisor();
});

executar.addEventListener('click', () => {
    executarCalculo();
})

// - - - FUNÇÕES - - -

// Define o visor como zero
function limpaVisor() {
    visor.innerHTML = '0';
};

// Grava o primeiro valor e a operação a ser realizada. Executa ao clicar em um botão de operação
function operacao(operando) {
    valor1 = parseFloat(visor.innerHTML);
    operador = operando;
    visor.innerHTML = '0';
};


// Define o segundo valor do visor, executa o cálculo da operação e apresenta no visor. Após isso, insere no histórico
function executarCalculo() {
    valor2 = parseFloat(visor.innerHTML);

    switch (operador) {
        case '+':
            total = (valor1 + valor2);
            break;
        
        case '-':
            total = (valor1 - valor2);
            break;
        
        case '*':
            total = (valor1 * valor2);
            break;
        
        case '/':
            total = (valor1 / valor2);
            break;

        default:
            window.alert('Operação inválida');
            break;
    }
        
    if (Number.isInteger(total)) {
        visor.innerHTML = total.toFixed();
    } else {
        visor.innerHTML = total.toFixed(2);
    }

    inserirHistorico(valor1, valor2, operador, total);
};

// Insere a conta feita no array do histórico, com informações de data e hora e operação realizada
function inserirHistorico(valor1, valor2, operador, total) {
    let data = new Date();
    let dataCompleta = `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;

    arrayHistorico.push(`
        <tr>
            <td>${dataCompleta}</td>
            <td class="item_historico" value="${total}">${valor1} ${operador} ${valor2}</td>
        </tr>`);

    atualizaHistorico();

    itemHistorico = document.querySelectorAll('.item_historico')
    itemHistorico.forEach((btn) => {
        btn.addEventListener('click', () => {
            visor.innerHTML = btn.getAttribute('value');
        })
    });
};

// Atualiza as informações do histórico com base no array, quando passa de 4 informações, remove a mais antiga.
function atualizaHistorico() {
    historico.innerHTML = `
        <tr>
            <th colspan="2">HISTÓRICO</th>
        </tr>`;

    if (arrayHistorico.length > 4) {
        arrayHistorico.shift();
    };

    arrayHistorico.forEach((info) => {
        historico.innerHTML += info;
    });
}