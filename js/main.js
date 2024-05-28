import emitInfoToast from './toasts.js'

const formValidate = document.getElementById("form-validate");
let humorCliente = document.getElementById("humor");
let areaUpsell = document.getElementById("clienteUpsell");

let radiosUpsell = document.formChamado.radioUpsell;
let radiosTipo = document.formChamado.radioTipo;
let radiosAnexo = document.formChamado.radioAnexo;
let respostas = [];
let copiar = [];
let formatar = "";

let getTipo = "";
let getUpsell = "";
let getAnexo = "";

//Validação de Tipo de Chamado
for(let i = 0; i < radiosTipo.length; i++) {
    radiosTipo[i].addEventListener('change', function() {
        let tipoCheck = this.value;
        getTipo = "";
        getTipo = tipoCheck;
        respostas.push({
            nome: "tipo",
            resposta: tipoCheck
        })
    })
}

//Validação de Oportunidade de Upsell
for(let i = 0; i < radiosUpsell.length; i++) {
    radiosUpsell[i].addEventListener('change', function () {
        let upsellCheck = this.value;

        if(upsellCheck == "Sim") {
            document.getElementById("areaUpsell").style.display = "block";
            getUpsell = "";
            getUpsell = upsellCheck;
        } else {
            getUpsell = "";
            getUpsell = upsellCheck;
            document.getElementById("areaUpsell").style.display = "block";
        }
    })
}

//Validação de conteúdo anexado
for(let i = 0; i <  radiosAnexo.length; i++) {
    radiosAnexo[i].addEventListener('change', function() {
        let anexoCheck = this.value;
        getAnexo = "";
        getAnexo = anexoCheck;
    })
}

if(formValidate) {
    document.addEventListener("submit", async (e) => {
        e.preventDefault();
        let validator = document.querySelectorAll(".input-validate");

        for(let i = 0; i < validator.length; i++) {
            const inputFields = validator[i];

            const nameInput = inputFields.classList[0];
            
            let valueInput = document.getElementById(nameInput).value;

            if(valueInput === "") {
                e.preventDefault();
                let listInput = listInputValidate();
                
                if(listInput.hasOwnProperty(nameInput)) {
                    emitInfoToast(listInput[nameInput], "info-toast");
                } 
            } else {

                respostas.push({
                    nome: validator[i].name,
                    resposta: validator[i].value,
                })
            }
        }

        function listInputValidate() {
            var listInput = {
                'input-number' : "Preencha o número do chamado!",
                'input-message' : "Preencha a mensagem do erro!",
                'input-problem' : "Informe a causa do problema!",
                'input-solution' : "Descreve a solução do problema!",
                'input-feedback' : "Descreva o feedback do cliente!"
            }
            return listInput;
        }

        if(radiosTipo.value === "") {
            emitInfoToast("Selecione o tipo do chamado!", "error-toast");
            return;
        }

        if(radiosUpsell.value === "") {
            emitInfoToast("Selecione se houve oportunidade de Upsell", "error-toast");
            return;
        }

        if(radiosUpsell.value === "Sim") {
            if(areaUpsell.value === "") {
                emitInfoToast("Informe a situação do Upsell!", "error-toast");
                return;
            } else {
                respostas.push({
                    nome: "upsell",
                    resposta: "SIM. " + areaUpsell.value,
                });
            }
        } else if(radiosUpsell.value === "Não") {
            if(areaUpsell.value === "") {
                emitInfoToast("Informe a situação do Upsell!", "error-toast");
                return;
            } else {
                respostas.push({
                    nome: "upsell",
                    resposta: "NÃO. " + areaUpsell.value,
                });
            }
        }

        if(radiosAnexo.value === "") {
            emitInfoToast("Selecione se vai haver ou não Anexos!", "error-toast");
            return;
        } else {
            respostas.push({
                nome: "anexo",
                resposta: radiosAnexo.value
            })
        }

        let humor = humorCliente.options[humorCliente.selectedIndex].value;

        if(humor === "0") {
            emitInfoToast("Selecione o Humor do Cliente!", "error-toast");
        } else {
            let humorTexto = humorCliente.options[humorCliente.selectedIndex].text;
            respostas.push({
                nome: "humor",
                resposta: humorTexto
            })
        }

        for(let i = 0; i < respostas.length; i++) {
            if(respostas[i].nome == "tipo") {
                copiar.push({
                    label: "PROBLEMA / DÚVIDA: ",
                    valor: respostas[i].resposta
                });
            }

            if(respostas[i].nome == "numero") {
                copiar.push({
                    label: "NÚMERO DO DOCUMENTO COM ERRO: ",
                    valor: respostas[i].resposta
                });
            }

            if(respostas[i].nome == "mensagem") {
                copiar.push({
                    label: "MENSAGEM DO ERRO: ",
                    valor: respostas[i].resposta
                });
            }

            if(respostas[i].nome == "problema") {
                copiar.push({
                    label: "CAUSA DO PROBLEMA: ",
                    valor: respostas[i].resposta
                });
            }
            
            if(respostas[i].nome == "solucao") {
                copiar.push({
                    label: "SOLUÇÃO APRESENTADA: ",
                    valor: respostas[i].resposta
                });
            }

            if(respostas[i].nome == "feedback") {
                copiar.push({
                    label: "FEEDBACK DO CLIENTE: ",
                    valor: respostas[i].resposta
                });
            }

            if(respostas[i].nome == "humor") {
                copiar.push({
                    label: "HUMOR DO CLIENTE: ",
                    valor: respostas[i].resposta
                });
            }

            if(respostas[i].nome == "upsell") {
                copiar.push({
                    label: "OPORTUNIDADE DE UPSELL: ",
                    valor: respostas[i].resposta
                });
            }

            if(respostas[i].nome == "anexo") {
                copiar.push({
                    label: "PRINTS DE ERRO OU DE MENSAGENS RELEVANTES: ",
                    valor: respostas[i].resposta
                });
            }
        }

        for(let i = 0; i < copiar.length; i++) {
            formatar += copiar[i].label + " " + copiar[i].valor + "\n\n";
        }
        
        navigator.clipboard.writeText(formatar.trim()).then((e) => {
            
            emitInfoToast("Copiado para Área de Transferência!", "success-toast");
            
            setTimeout(() => {
                location.reload(true);
            }, 5000);
            
        }).then(() => {
            
        }).catch((error) => {
            console.log(error);
        })

        
        document.getElementById("input-number").value = "";
        document.getElementById("input-message").value = "";
        document.getElementById("input-message").value = "";
        document.getElementById("input-problem").value = "";
        document.getElementById("input-solution").value = "";
        document.getElementById("input-feedback").value = "";
        document.getElementById("humor").selectedIndex = 0
        document.getElementById("areaUpsell").value = "";
        document.getElementById("clienteUpsell").value = "";

        var tipos = document.querySelectorAll("input[name=radioTipo]");
        for (var i = 0; i < tipos.length; i++) {
            tipos[i].checked = false;
        }

        var upsells = document.querySelectorAll("input[name=radioUpsell]");
        for (var i = 0; i < upsells.length; i++) {
            upsells[i].checked = false;
        }

        var anexos = document.querySelectorAll("input[name=radioAnexo]");
        for (var i = 0; i < anexos.length; i++) {
            anexos[i].checked = false;
        }

    })
}