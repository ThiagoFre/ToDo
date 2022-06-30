var form = document.querySelector(".nova-tarefa")
var input = document.getElementById("novaTarefa")
var pendentes = document.querySelector(".tarefas-pendentes")
var tarefasRealizada=document.querySelector(".tarefas-terminadas")
var nome=document.querySelector(".nomeU")
var btnPronto=document.querySelector(".not-done")

if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == "") {
    alert("Você precisa estar logado para acessar essa pagina");
    window.location.href = "index.html"
}

//===============================================================\\

form.addEventListener("submit", (e) => {
    
    if (input.value.length > 0 ) {
        function colocaTarefa() {
            fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
              method: "POST",
              headers: {
                "Accept": "*/* , application/json, text/plain",
                "Content-Type":  "application/json",
                "authorization": `${localStorage.getItem("jwt")}`
              },
              
              body: JSON.stringify({
                "description": `${input.value}`,
                "completed": false
              })
            })
            .then(resposta => resposta.json())
            .then(data => {
              console.log(data)
                pendentes.innerHTML += `
                <li id="${data.id}" class="tarefa">
                 <div class="not-done"></div>
                <div class="descricao">
                <p class="nome">ID: ${data.id}</p>
                <p class="nome">${data.description}</p>
                <p class="timestamp">${dayjs(data.createdAt).format('DD/MM/YYYY') }</p>
                <button class="btnTarefas" onclick="apagarTarefa(${data.id})">apagar</button>
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
        alert("Campo não pode esta vazio")
    }


})




//==========================================================================\\



//usar ${}
fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
  method: 'GET',
  headers: {
    'Accept': '*/* , application/json, text/plain',
    'Content-Type':  'application/json',
    'authorization': `${localStorage.getItem('jwt')}`
  }
}).then(resposta=>
  resposta.json()).then(data=>{
  console.log(data)
  
  
  for(let tarefas of data){
    if(!tarefas.completed){
      pendentes.innerHTML += `
                <li id="${tarefas.id}" class="tarefa">
                 <div id="${tarefas.id}" onclick="terminarTarefa(${tarefas.id}"class="not-done"></div>
                <div class="descricao">
                <p class="nome">ID: ${tarefas.id}</p>
                <p class="nome">${tarefas.description}</p>
                <p class="timestamp">${dayjs(tarefas.createdAt).format('DD/MM/YYYY') }</p>
                
                </div>
                
                </li>
                `
    }else{
      tarefasRealizada.innerHTML += `
          <li id="${tarefas.id}" class="tarefa">
          
          <div class="descricao">
          <p class="nome">ID: ${tarefas.id}</p>
          <p class="nome">${tarefas.description}</p>
          
          <img id="voltar" src="./img/botao-de-seta-curva-para-a-esquerda.png" alt="">
          <img onclick="apagarTarefa(${tarefas.id})" id="lixeira" src="./img/excluir.png" alt="">
          </div>
     
     </li>

              `
    }
    
  }

  
})

//função chamada pelo o evento onclick
function apagarTarefa(id){
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': '*/* , application/json, text/plain',
      'Content-Type':  'application/json',
      'authorization': `${localStorage.getItem('jwt')}`
    }
  })
  
  document.getElementById(`${id}`).remove();// usado para apagar as tarefa do ToDo
  
  
}

//============================================\\

//pegar dados do usuario
fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', {
  method: 'GET',
  headers: {
    'Accept': '*/* , application/json, text/plain',
    'Content-Type':  'application/json',
    'authorization': `${localStorage.getItem('jwt')}`
  }
}).then(resposta=>
  resposta.json()).then(data=>{
    
  // coloca o nome do cliente no ToDo
  var nomeUsuario=document.createTextNode(`${data.firstName} ${data.lastName}`)
  nome.append(nomeUsuario)
  console.log(nomeUsuario)
  
})

// em manutenção
function terminarTarefa(id){
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': '*/* , application/json, text/plain',
      'Content-Type':  'application/json',
      'authorization': `${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      "completed": true
    })
  }).then(resposta=>resposta.json()).then(data=>{
    console.log(data)
  })
}
