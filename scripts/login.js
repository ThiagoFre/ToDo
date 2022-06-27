import { erro,sucesso,isEmail } from "./script.js"


var inputs=document.querySelectorAll("input");
var btn=document.querySelector("button")
var caixaMensagem=document.querySelectorAll(".mensagem")
console.log(inputs[0])
btn.addEventListener("click",function(){

    verificaçaoEmail();
    verificaçaoSenha();

    function verificaçaoEmail(){
        return inputs[0].value===""?erro(inputs[0],caixaMensagem[0],"Campo obrigatorio"):!isEmail(inputs[0].value)?erro(inputs[0],caixaMensagem[0],"Você digitou o email errado"):sucesso(inputs[0],caixaMensagem[0])
     }

    //  function verificaçaoSenha(){
    //     return inputs[1].value===""?erro(inputs[1],caixaMensagem[1],"Campo obrigatorio"):inputs[1].value.length<6?erro(inputs[1],caixaMensagem[1],"A senha deve conter mais de 6 caracteres"):inputs[1].value.length>15?erro(inputs[1],caixaMensagem[1],"A senha não deve conter mais de que 15 caracteres"):!/[0-9]/.test(inputs[1].value)||!/[^A-Za-z0-9]/.test(inputs[1].value)||!/[A-Z]/.test(inputs[1].value)?erro(inputs[1],caixaMensagem[1],"A senha deve ter uma letra maíuscula,um número e um caracter especial (-,*,#,>)"):sucesso(inputs[1],caixaMensagem[1])
    //  }
})
