//SCRIPTS PARA INSERIR NOME NA FILA
window.onload = function() {
    atualizarGeral();
}

function inserirNomeEspera() {
    const nomeInput = document.getElementById("nomeInput");
    const inserirButton = document.getElementById("inserirButton")
    const id_setor = document.getElementById("dropdownSetores").value
    
    var nome = nomeInput.value;
    if (nome.trim() === ''){return;}
    nomeInput.value = '';
    inserirButton.disabled = true;
    inserirButton.style.backgroundColor = "#306754";
    fetch('/inserirNomeEspera', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'nome': `${nome}`, 'id': `${id_setor}`})
    })
    .then(response => response.json())
    .then(data => {
        mostrarFilas(id_setor)
        console.log(data);
        const retorno = document.getElementById("retornoInserir");
        nomeInput.value = ''
        retorno.textContent = data.message;
        
        
    })
    .catch(error => {
        console.error('Error:', error);
        const retorno = document.getElementById("retornoInserir");
        retorno.textContent = `${nome} não foi inserido na fila...`;
        retorno.style.color = '#d16464'
    });
    setTimeout(function() {
        inserirButton.disabled = false;
        inserirButton.style.backgroundColor = "#3b874c";
    }, 2000); 
}


