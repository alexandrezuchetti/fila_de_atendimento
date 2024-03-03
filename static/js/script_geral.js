window.onload = function() {
    atualizarGeral();
    const atualizacao_fila = setInterval(mostrarFilas(1), 30000);
    if (window.location.href.includes('plantonista')){
    const intevaloAtualizaDropdownEspera = setInterval(preencherDropDownEspera, 30000);
    const intevaloAtualizaDropdownAtendimentos = setInterval(preencherDropDownAtendimentos, 30000);
    }
}


function atualizarBotao() {
    const s_id = document.getElementById('dropdownSetores').value
    mostrarFilas(s_id);
    if (window.location.href.includes('plantonista')){
        preencherDropDownEspera();
        preencherDropDownAtendimentos();
    }
}


function atualizarGeral() {
    
    preencherDropDownSetores().then(function() {
        const s_id = document.getElementById('dropdownSetores').value
        console.log(s_id)
        mostrarFilas(s_id);
        if (window.location.href.includes('plantonista')){
            preencherDropDownEspera();
            preencherDropDownAtendimentos();
        }
    }).catch(function(error) {
        console.error('Error:', error);
    });
}

function mostrarFilas(id) {
    

    fetch('/filaEspera', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': `${id}`})
    })
    .then(response => response.json())
    .then(data => {
        const valoresAluno = Object.values(data.fe_aluno);
        const tabelaEspera = document.getElementById('esperaTable');
        const tbody = tabelaEspera.querySelector('tbody');
        tbody.innerHTML = '';
        for (let i=0 ; i < valoresAluno.length ; i++){
            const linha = document.createElement('tr');
            const celulaAluno = document.createElement('td');
            celulaAluno.textContent = valoresAluno[i];
            linha.appendChild(celulaAluno);
            tbody.appendChild(linha);
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });
    fetch('/filaAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': `${id}`})
    })
    .then(response => response.json())
    .then(data => {
        const valoresAluno = Object.values(data.fa_aluno);
        const valoresPlantonista = Object.values(data.fa_plantonista);
        const valoresEmAtendimento = Object.values(data.fa_ematendimento);
        const tabelaAtendimento = document.getElementById('atendimentoTable');
        const tbody = tabelaAtendimento.querySelector('tbody');
        tbody.innerHTML = '';
        for (let i = 0; i < valoresAluno.length; i++) {
            const aluno = valoresAluno[i];
            const plantonista = valoresPlantonista[i];
            const emAtendimento = valoresEmAtendimento[i];          
            const linha = document.createElement('tr');
            const celula = document.createElement('td');
            if (emAtendimento === 1) {
                linha.style.backgroundColor = "#7aff73";
                celula.style.backgroundColor = "#7aff73";
            }
            else {
                linha.style.backgroundColor = "#f3ff73"
                celula.style.backgroundColor = "#f3ff73";
            }
            celula.textContent = `${aluno} => ${plantonista}`;
            linha.appendChild(celula);
            tbody.appendChild(linha);
        };
    })
    .catch(error => {
        console.error('Error:', error);
    });

}


function preencherDropDownSetores(){
    const dropdownSetores = document.getElementById('dropdownSetores');
    dropdownSetores.innerHTML = '';
    return fetch('/getSetores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const nomes = Object.values(data.s_nome);
        const ids = Object.values(data.s_id);
        for (let i=0 ; i < ids.length ; i++){
            const novoSetor = document.createElement('option');
            novoSetor.value = ids[i];
            novoSetor.text = nomes[i];
            dropdownSetores.appendChild(novoSetor);
            console.log(nomes[i]);
        }
    })
    .catch(error => {
        console.error('Error:', error)
        throw error;
    });
}