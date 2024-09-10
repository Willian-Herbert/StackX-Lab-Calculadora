// - - - VARIÁVEIS - - -

const visor = document.getElementById('visor');
const botoes = document.querySelectorAll('.numero');
const limpar = document.getElementById('reset')
const executar = document.getElementById('efetuar');
const operacoes = document.querySelectorAll('.operador')
const historico = document.getElementById('historico')
let itemHistorico = document.querySelectorAll('.item_historico')
let valor1
let valor2
let operador
let total

// - - - EVENTOS - - -

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

function limpaVisor() {
    visor.innerHTML = '0';
};

function operacao(operando) {
    valor1 = parseFloat(visor.innerHTML);
    operador = operando;
    visor.innerHTML = '0';
};

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

function inserirHistorico(valor1, valor2, operador, total) {
    let data = new Date();
    let dataCompleta = `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;

    historico.innerHTML += `
        <tr>
            <td>${dataCompleta}</td>
            <td class="item_historico" value="${total}">${valor1} ${operador} ${valor2}</td>
        </tr>`;

    itemHistorico = document.querySelectorAll('.item_historico')
    itemHistorico.forEach((btn) => {
        btn.addEventListener('click', () => {
            visor.innerHTML = btn.getAttribute('value');
        })
    });
};