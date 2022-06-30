import {erro,isEmail,sucesso} from "./funcaoPadrao.js"

var inputs = document.querySelectorAll("input");
var botao = document.querySelector("button");
var caixaMensagem = document.querySelectorAll(".mensagem")
var msmApi=document.querySelector(".msm-Api")
var textoApi=document.querySelector(".texto-api")


// localStorage.clear()

botao.addEventListener("click",function(){
    validaçaoNome();
    validaçaoSobrenome();
    validaçaoEmail();
    validaçaoSenha();
    validaçaoConfirmeSenha();
    
    function validaçaoNome(){
    return /[0-9]/.test(inputs[0].value)?erro(inputs[0],
        caixaMensagem[0],"Não pode ter numero"):/[^A-Za-z0-9]/.test(inputs[0].value)?
        erro(inputs[0],caixaMensagem[0],"Não pode ter caractere especial"):inputs[0].value===""?
        erro(inputs[0],caixaMensagem[0],"Campo obrigatorio"):sucesso(inputs[0],caixaMensagem[0])
    }
    function validaçaoSobrenome(){
        return /[0-9]/.test(inputs[1].value)?erro(inputs[1],caixaMensagem[1],
            "Não pode ter numero"):/[^A-Za-z0-9]/.test(inputs[1].value)?
            erro(inputs[1],caixaMensagem[1],"Não pode ter caractere especial"):
            inputs[1].value===""?erro(inputs[1],caixaMensagem[1],"Campo obrigatorio"):
            sucesso(inputs[1],caixaMensagem[1])
    }
    function validaçaoEmail(){
       return inputs[2].value===""?erro(inputs[2],caixaMensagem[2],"Campo obrigatorio"):
       !isEmail(inputs[2].value)?erro(inputs[2],caixaMensagem[2],"Você digitou o email errado"):
       sucesso(inputs[2],caixaMensagem[2])
    }
    function validaçaoSenha(){
       return inputs[3].value===""?erro(inputs[3],caixaMensagem[3],"Campo obrigatorio"):
       inputs[3].value.length<6?erro(inputs[3],caixaMensagem[3],"A senha deve conter mais de 6 caracteres"):
       inputs[3].value.length>15?erro(inputs[3],caixaMensagem[3],"A senha não deve conter mais de que 15 caracteres"):
       !/[0-9]/.test(inputs[3].value)||!/[^A-Za-z0-9]/.test(inputs[3].value)||!/[A-Z]/.test(inputs[3].value)?erro
       (inputs[3],caixaMensagem[3],"A senha deve ter uma letra maíuscula,um número e um caracter especial (-,*,#,>)"):
       sucesso(inputs[3],caixaMensagem[3])
    }
    function validaçaoConfirmeSenha(){
       return inputs[4].value===""?erro(inputs[4],caixaMensagem[4],"Campo obrigatorio"):
       inputs[4].value!=inputs[3].value?erro(inputs[4],caixaMensagem[4],"Senhas diferentes"):
       sucesso(inputs[4],caixaMensagem[4])
    }
    // console.log("nome "+validaçaoNome())
    // console.log("sobrenome "+validaçaoSobrenome())
    // console.log("email "+validaçaoEmail())
    // console.log("senha "+validaçaoSenha())

    // função de api
    // localStorage.clear()
    function fetchApi(){
        fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
            method: "post",
            headers: {
              "Accept": "*/* , application/json, text/plain",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              firstName: `${inputs[0].value}`,
              lastName: `${inputs[1].value}`,
              email: `${inputs[2].value}`,
              password: `${inputs[3].value}`,
            }),
          })
          .then((resposta) => {
            console.log(resposta)


            
            if(resposta.statusText=="Bad Request"){
                msmApi.style=`
                border-radius: 5px;
                background-color: rgb(195, 0, 0);
                text-align: center;
                padding-top: 5px;
                width: 95px;
                height: 50px;
                color: white;
                `
                textoApi.innerHTML="Usuario Existente"
            }
            
            if(resposta.ok){
                resposta.json()
                .then((data) => localStorage.setItem('jwt', data.jwt))
                msmApi.style=`
                border-radius: 5px;
                background-color: rgb(0, 130, 22);
                text-align: center;
                padding-top: 5px;
                width: 95px;
                height: 50px;
                color: white;
                `
                textoApi.innerHTML="Usuario Criado"

                //em manutenção
                setTimeout(function(){
                    window.location.href = "/ToDo/tarefas.html"
                },6000)
                
            }

        })
          
    }

    validaçaoConfirmeSenha()&&validaçaoEmail()&&validaçaoNome()&&validaçaoSenha()&&validaçaoSobrenome()?fetchApi():""

})

/*

VERIFICADOR DE SENHA(FORTE, MEDIA E FRACA.)

não cloque esse codigo para rodar, a não ser que você altere as variaveis!!!

password.onkeyup=function(){
    error[2].innerText = "";
    let senha=password.value
    let num=0

    // conta os requisitos
    !/[0-9]/.test(senha)?"":num+=1
    !/[a-z]/.test(senha)?"":num+=1
    !/[A-Z]/.test(senha)?"":num+=1
    !/[^A-Za-z0-9]/.test(senha)?"":num+=1

    //coloca a cor de acordo com o requisito
    senha==""?mensagem.style="color:red;":
    num==1?mensagem.style="color:red;":
    num==2?mensagem.style="color:yellow;":
    num>=4?mensagem.style="color:green;":""

    // coloca a mensagem de acordo com requisito
    senha.length<6?mensagem.innerHTML="minimo 6 digitos": 
    num==1? mensagem.innerHTML="fraca":num==2? mensagem.innerHTML="média":
    num==3?mensagem.innerHTML="media":num==4?mensagem.innerHTML="forte":""; 
}
*/