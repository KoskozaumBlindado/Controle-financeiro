const $ = (selector) => document.querySelector(selector);

$('#login-form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    if ($('#usuario').value === 'admin' && $('#senha').value === '1234') {
        $('#tela-login').classList.remove('ativa');
        $('#tela-principal').classList.add('ativa');
    } else {
        alert('Credenciais incorretas!');
    }
});

let despesas = [];
const rendaInput = $('#renda-mensal');
const listaUl = $('#lista-despesas');
const formatarMoeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function atualizarTela() {
    const renda = parseFloat(rendaInput.value) || 0;
    const total = despesas.reduce((acc, d) => acc + d.valor, 0);
    const saldo = renda - total;

    $('#total-despesas').textContent = formatarMoeda(total);
    $('#saldo').textContent = formatarMoeda(saldo);
    $('#saldo').classList.toggle('negativo', saldo < 0);

    listaUl.innerHTML = '';
    if (despesas.length === 0) {
        listaUl.innerHTML = '<p style="text-align:center; color:#718096;">Nenhuma despesa cadastrada.</p>';
    } else {
        despesas.forEach((d, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${d.desc} - ${formatarMoeda(d.valor)}</span> <button data-index="${index}">Excluir</button>`;
            listaUl.appendChild(li);
        });
    }
}

$('#despesa-form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const desc = $('#descricao-despesa').value.trim();
    const valor = parseFloat($('#valor-despesa').value);
    if (desc && valor > 0) {
        despesas.push({ desc, valor });
        $('#descricao-despesa').value = '';
        $('#valor-despesa').value = '';
        atualizarTela();
    } else {
        alert('Por favor, preencha a descrição e um valor válido.');
    }
});

listaUl.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        despesas.splice(e.target.dataset.index, 1);
        atualizarTela();
    }
});

rendaInput.addEventListener('input', atualizarTela);
atualizarTela();