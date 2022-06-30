import { erro,sucesso,isEmail } from "./funcaoPadrao.js"

var inputs=document.querySelectorAll("input");
var btn=document.querySelector("button")
var caixaMensagem=document.querySelectorAll(".mensagem")
//Tag textoApi-Login responsavel pela validação "Usuario Criado" & "Usuario Existente" no login
var textoApi=document.querySelector(".textoApi-Login")


btn.addEventListener("click",function(){

    verificaçaoEmail();
    verificaçaoSenha();

    function verificaçaoEmail(){
        return inputs[0].value===""?erro(inputs[0],caixaMensagem[0],"Campo obrigatorio"):
        !isEmail(inputs[0].value)?erro(inputs[0],caixaMensagem[0],"Você digitou o email errado"):
        sucesso(inputs[0],caixaMensagem[0])
     }

     function verificaçaoSenha(){
        return inputs[1].value===""?erro(inputs[1],caixaMensagem[1],"Campo obrigatorio"):
        inputs[1].value.length<6?erro(inputs[1],caixaMensagem[1],"A senha deve conter mais de 6 caracteres"):
        inputs[1].value.length>15?erro(inputs[1],caixaMensagem[1],"A senha não deve conter mais de que 15 caracteres"):
        !/[0-9]/.test(inputs[1].value)||!/[^A-Za-z0-9]/.test(inputs[1].value)||!/[A-Z]/.test(inputs[1].value)?erro(inputs[1],caixaMensagem[1],
        "A senha deve ter uma letra maíuscula,um número e um caracter especial (-,*,#,>)"):sucesso(inputs[1],caixaMensagem[1])
     }

     if(verificaçaoEmail()&&verificaçaoSenha()){
        fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
            method: "POST",
            headers: {
              "Accept": "*/* , application/json, text/plain",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: `${inputs[0].value}`,
              password: `${inputs[1].value}`,
            }),
          })
            .then((resposta) => {
                console.log(resposta)
                if (resposta.statusText == 'Not Found') {
                    //aplicação de para mostrar para o usuario que usuario não existe
                    console.log("teste usuario não existe")
                }
                if(resposta.statusText=="Bad Request"){
                    // aplicação para mostrar para o usuario que senha ou email esta incorreto
                    console.log("teste dados incorretos")
                }
                else if (resposta.ok) {
                    resposta.json()
                    .then((data) => {
                      console.log(data)
                      localStorage.setItem('jwt', data.jwt)})

                    
                    // window.location.href = '/ToDo/tarefas.html?'
                }
                
            })
        
    }
})