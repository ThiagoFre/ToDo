var input=document.getElementById("novaTarefa")
var form = document.getElementById('nova-tarefa')
var pendentes = document.getElementById('pendentes')

if (localStorage.getItem("jwt") == null || localStorage.getItem("jwt") == "") {
    alert("você não realizou o login");
    window.location.href = "/index.html"
}
form.addEventListener("click",function(e){
    if (inputTarefa.value.length != 0 ) {
        function colocarTarefa() {
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
            .then(res => res.json())
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

          

          


    }
})