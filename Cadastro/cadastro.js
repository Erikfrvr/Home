/* ==========================================
   CASA ABERTA
   cadastro.js
========================================== */

// ------------------------------
// GERA O PRÓXIMO ID
// ------------------------------

function gerarIdEquipe() {

    let ultimoId = localStorage.getItem("ultimoId");

    if (ultimoId === null) {

        ultimoId = 1;

    } else {

        ultimoId = parseInt(ultimoId) + 1;

    }

    localStorage.setItem("ultimoId", ultimoId);

    return "CA-" + ultimoId.toString().padStart(6, "0");

}

// ------------------------------
// CADASTRAR EQUIPE
// ------------------------------

document
.getElementById("formCadastro")
.addEventListener("submit", function(event){

    event.preventDefault();

    const nomeEquipe = document.getElementById("nomeEquipe");
    const jogador1 = document.getElementById("jogador1");
    const jogador2 = document.getElementById("jogador2");
    const jogador3 = document.getElementById("jogador3");
    const jogador4 = document.getElementById("jogador4");

    const equipe = nomeEquipe.value.trim();

    // --------------------------
    // VALIDAÇÃO
    // --------------------------

    if(

        equipe === "" ||

        jogador1 === "" ||

        jogador2 === "" ||

        jogador3 === "" ||

        jogador4 === ""

    ){

        alert("Preencha todos os campos!");

        return;

    }

    // --------------------------
    // CONFIRMAR SALVAMENTO
    // --------------------------

    const confirmar = confirm(
        "Deseja salvar as informações da equipe?\n\n" +
        "Clique em Ok para Salvar.\n" +
        "Clique em Cancelar para alterar alguma informação."
    );

    if(!confirmar){
        return;
    }

    // --------------------------
    // GERAR ID
    // --------------------------

    const id = gerarIdEquipe();

    // --------------------------
    // OBJETO
    // --------------------------

    const novaEquipe = {

        id:id,

        equipe:equipe,

        jogadores:[

            jogador1,

            jogador2,

            jogador3,

            jogador4

        ]

    };

    // --------------------------
    // PEGAR DADOS EXISTENTES
    // --------------------------

    let ranking = JSON.parse(

        localStorage.getItem("ranking")

    ) || [];

    // --------------------------
    // VERIFICAR DUPLICIDADE
    // --------------------------

    const existeEquipe = ranking.find(

        item => item.equipe.toLowerCase() === equipe.toLowerCase()

    );

    if(existeEquipe){

        alert("Já existe uma equipe com esse nome.");

        return;

    }

    // --------------------------
    // ADICIONAR NOVA EQUIPE
    // --------------------------

    ranking.push(novaEquipe);

    // --------------------------
    // SALVAR
    // --------------------------

    localStorage.setItem(

        "ranking",

        JSON.stringify(ranking)

    );

    // --------------------------
    // MENSAGEM
    // --------------------------

    alert("Equipe cadastrada com sucesso!");

    // --------------------------
    // LIMPAR FORMULÁRIO
    // --------------------------

    document.getElementById("formCadastro").reset();

});

    // ------------------------------
    // BOTÃO VOLTAR
    // ------------------------------

    document.getElementById("btnVoltar").addEventListener("click", function () {

    window.location.href = "../index.html";

});