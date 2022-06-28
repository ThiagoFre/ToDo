var form = document.querySelector('.nova-tarefa')
var input = document.getElementById('novaTarefa')
var pendentes = document.querySelector('.tarefas-pendentes')


if (localStorage.getItem('jwt') == null || localStorage.getItem('jwt') == '') {
    alert('Você precisa estar logado para acessar essa pagina');
    window.location.href = 'index.html'
}



form.addEventListener("submit", (e) => {
    
    if (input.value.length > 0 ) {
        function colocaTarefa() {
            fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
              method: 'POST',
              headers: {
                'Accept': '*/* , application/json, text/plain',
                'Content-Type':  'application/json',
                'authorization': `${localStorage.getItem('jwt')}`
              },
              
              body: JSON.stringify({
                "description": `${input.value}`,
                "completed": false
              })
            })
            .then(resposta => resposta.json())
            .then(data => {
                pendentes.innerHTML += `
                <li class="tarefa">
                 <div class="not-done"></div>
                <div class="descricao">
                <p class="nome">${data.description}</p>
                <p class="timestamp">${data.createdAt}</p>
                </div>
                </li>

                `
            })
          }

          colocaTarefa();

          e.preventDefault();


    }

    else {
        e.preventDefault();
        alert('O campo precisa ser preenchido')
    }


})