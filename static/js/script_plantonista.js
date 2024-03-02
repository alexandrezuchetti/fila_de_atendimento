
window.onload = function() {
    atualizaDadosPlantonista();
    const atualizacao_fila = setInterval(mostrarFilas, 30000);

    const intevaloAtualizaDropdownEspera = setInterval(preencherDropDownEspera, 30000);

    const intevaloAtualizaDropdownAtendimentos = setInterval(preencherDropDownAtendimentos, 30000);
}
function atualizaDadosPlantonista(){
    atualizarGeral();
    preencherDropDownEspera();
    preencherDropDownAtendimentos();
}

function atualizaDadosPlantonistaBotao(){
    atualizarBotao();
    preencherDropDownEspera();
    preencherDropDownAtendimentos();
}

function limparFilaEspera(){
    const button = document.getElementById('limparButtonEspera');
    button.disabled = true;
    fetch('/limparFilaEspera', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //algum tipo de log, ou até negação com base em alguma caracteristica do envio.
        //a principio assume-se que vamos pegar mac
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        atualizaDadosPlantonista()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
    }, 2000); 
}

function limparFilaAtendimento(){
    const button = document.getElementById('limparButtonAtendimento');
    button.disabled = true;
    fetch('/limparFilaAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //algum tipo de log, ou até negação com base em alguma caracteristica do envio.
        //a principio assume-se que vamos pegar mac
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        atualizaDadosPlantonista()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
    }, 2000); 
}

function capturarAluno(){
    const button = document.getElementById('capturarAlunoButton');
    button.disabled = true;
    const inputPlantonista = document.getElementById("inputPlantonista");
    const dropdownEspera = document.getElementById("dropdownEspera");
    const id = dropdownEspera.value;
    const aluno = dropdownEspera.options[dropdownEspera.selectedIndex].textContent;
    const plantonista = inputPlantonista.value;
    if (id === null || aluno.trim() === '' || plantonista.trim() === ''){
        return;
    }
    fetch('/capturarAluno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': `${id}`, 'plantonista':`${plantonista}`, 'aluno':`${aluno}`})
    })
    .then(response => response.json())
    .then(data => {
        atualizaDadosPlantonista()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
    }, 2000); 
}

function iniciarAtendimento(){
    const dropdownAtendimento = document.getElementById("dropdownAtendimento");
    const id = dropdownAtendimento.value;
    const aluno = dropdownAtendimento.textContent;
    if (aluno.trim() === '' || id === null){return;}
    const button = document.getElementById('iniciarAtendimentoButton');
    button.disabled = true;
    fetch('/iniciarAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': `${id}`})
    })
    .then(response => response.json())
    .then(data => {
        atualizaDadosPlantonista()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
    }, 2000); 
}

function finalizarAtendimento(){
    const dropdownEmAtendimento = document.getElementById("dropdownEmAtendimento");
    const id = dropdownEmAtendimento.value;
    const aluno = dropdownEmAtendimento.textContent;
    if (aluno.trim() === '' || id === null){return;}
    const button = document.getElementById('finalizarAtendimentoButton');
    button.disabled = true;
    fetch('/finalizarAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': `${id}`})
    })
    .then(response => response.json())
    .then(data => {
        atualizaDadosPlantonista()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
    }, 2000); 
}




function preencherDropDownEspera(){
    const dropdownEspera = document.getElementById('dropdownEspera');
    dropdownEspera.innerHTML = '';
    fetch('/getFilaEspera', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const nomes = Object.values(data.fe_aluno);
        const ids = Object.values(data.fe_id);
        for (let i=0 ; i < ids.length ; i++){
            const novoAluno = document.createElement('option');
            novoAluno.value = ids[i];
            novoAluno.text = nomes[i];
            dropdownEspera.appendChild(novoAluno)
            console.log(nomes[i]);
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });

}


function preencherDropDownAtendimentos(){
    const dropdownAtendimento = document.getElementById('dropdownAtendimento');
    dropdownAtendimento.innerHTML = '';
    const dropdownEmAtendimento = document.getElementById('dropdownEmAtendimento');
    dropdownEmAtendimento.innerHTML = '';
    fetch('/getFilaAtendimento', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const alunos = Object.values(data.fa_aluno);
        const ids = Object.values(data.fa_id);
        const ematendimento = Object.values(data.fa_ematendimento);
        for (let i=0 ; i < ids.length ; i++){
            if (ematendimento[i] === 0){
            const novoAtendimento = document.createElement('option');
            novoAtendimento.value = ids[i];
            novoAtendimento.text = alunos[i];
            dropdownAtendimento.appendChild(novoAtendimento);
            console.log(alunos[i]);
            }
            else {
                const novoAtendimento = document.createElement('option');
                novoAtendimento.value = ids[i];
                novoAtendimento.text = alunos[i];
                dropdownEmAtendimento.appendChild(novoAtendimento);
                console.log(alunos[i]);
            }
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });

}

