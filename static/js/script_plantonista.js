


function limparFilaEspera(){
    const button = document.getElementById('limparButtonEspera');
    button.disabled = true;
    button.style.backgroundColor = "#306754";
    fetch('/limparFilaEspera', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        atualizarBotao()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
        button.style.backgroundColor = "#3b874c";
    }, 2000); 
}

function limparFilaAtendimento(){
    const button = document.getElementById('limparButtonAtendimento');
    button.disabled = true;
    button.style.backgroundColor = "#306754";
    fetch('/limparFilaAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        atualizarBotao()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
        button.style.backgroundColor = "#3b874c";
    }, 2000); 
}

function capturarAluno(){
    const button = document.getElementById('capturarAlunoButton');
    button.disabled = true;
    button.style.backgroundColor = "#306754";
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
        atualizarBotao()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
        button.style.backgroundColor = "#3b874c";
    }, 2000); 
}

function iniciarAtendimento(){
    const dropdownAtendimento = document.getElementById("dropdownAtendimento");
    const id = dropdownAtendimento.value;
    const aluno = dropdownAtendimento.textContent;
    if (aluno.trim() === '' || id === null){return;}
    const button = document.getElementById('iniciarAtendimentoButton');
    button.disabled = true;
    button.style.backgroundColor = "#306754";
    fetch('/iniciarAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': `${id}`})
    })
    .then(response => response.json())
    .then(data => {
        atualizarBotao()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
        button.style.backgroundColor = "#3b874c";
    }, 2000); 
}

function finalizarAtendimento(){
    const dropdownEmAtendimento = document.getElementById("dropdownEmAtendimento");
    const id = dropdownEmAtendimento.value;
    const aluno = dropdownEmAtendimento.textContent;
    if (aluno.trim() === '' || id === null){return;}
    const button = document.getElementById('finalizarAtendimentoButton');
    button.disabled = true;
    button.style.backgroundColor = "#306754";
    fetch('/finalizarAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': `${id}`})
    })
    .then(response => response.json())
    .then(data => {
        atualizarBotao()
        console.log(data);
        const retornoControle = document.getElementById('retornoControle')
        retornoControle.textContent = data.message
    }).catch(error => {
        console.error('Error:', error);
    });
    setTimeout(function() {
        button.disabled = false;
        button.style.backgroundColor = "#3b874c";
    }, 2000); 
}




function preencherDropDownEspera(){
        const setor = document.getElementById('dropdownSetores').value;
        const dropdownEspera = document.getElementById('dropdownEspera');
        dropdownEspera.innerHTML = '';
        fetch('/filaEspera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'id': `${setor}` })
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
    const setor = document.getElementById('dropdownSetores').value;
    const dropdownAtendimento = document.getElementById('dropdownAtendimento');
    dropdownAtendimento.innerHTML = '';
    const dropdownEmAtendimento = document.getElementById('dropdownEmAtendimento');
    dropdownEmAtendimento.innerHTML = '';
    fetch('/filaAtendimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'id': `${setor}` })
    })
    .then(response => response.json())
    .then(data => {
        const alunos = Object.values(data.fa_aluno);
        const ids = Object.values(data.fa_id);
        const ematendimento = Object.values(data.fa_ematendimento);
        
        for (let i=0 ; i < ids.length ; i++){
            const novoAtendimento = document.createElement('option');
            novoAtendimento.value = ids[i];
            novoAtendimento.text = alunos[i];
            if (ematendimento[i] === 0){
            dropdownAtendimento.appendChild(novoAtendimento);
            }
            else {
                dropdownEmAtendimento.appendChild(novoAtendimento);
            }
            console.log(alunos[i]);
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });

}

