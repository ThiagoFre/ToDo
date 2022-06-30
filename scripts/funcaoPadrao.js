export function erro(input,caixaMensagem,mensagem){
    input.style="border: red solid 1px;"
    caixaMensagem.innerHTML=mensagem
    return false;
    
}
export function sucesso(input,caixaMensagem,){
    input.style="border: green solid 1px;"
    caixaMensagem.innerHTML=""
    return true;
}

export function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//