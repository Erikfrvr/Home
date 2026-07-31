/* ==========================================
   Motion Verse
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
// ENVIO DO FORMULÁRIO
// ------------------------------

document
.getElementById("formCadastro")
.addEventListener("submit", function(event){


    event.preventDefault();



    const nomeEquipe =
    document.getElementById("nomeEquipe");


    const jogador1 =
    document.getElementById("jogador1");


    const jogador2 =
    document.getElementById("jogador2");


    const jogador3 =
    document.getElementById("jogador3");


    const jogador4 =
    document.getElementById("jogador4");



    const equipe =
    nomeEquipe.value.trim();



    // --------------------------
    // VALIDAÇÃO
    // --------------------------

    if(

        equipe === "" ||

        jogador1.value.trim() === "" ||

        jogador2.value.trim() === "" ||

        jogador3.value.trim() === "" ||

        jogador4.value.trim() === ""

    ){

        alert("Preencha todos os campos!");

        return;

    }



    // ABRE MODAL DE CONFIRMAÇÃO

    abrirModal();



});





// ------------------------------
// SALVAR EQUIPE
// ------------------------------

function salvarEquipe(){


    const nomeEquipe =
    document.getElementById("nomeEquipe");


    const jogador1 =
    document.getElementById("jogador1");


    const jogador2 =
    document.getElementById("jogador2");


    const jogador3 =
    document.getElementById("jogador3");


    const jogador4 =
    document.getElementById("jogador4");



    const equipe =
    nomeEquipe.value.trim();



    // --------------------------
    // GERAR ID
    // --------------------------

    const id = gerarIdEquipe();



    // --------------------------
    // OBJETO DA EQUIPE
    // --------------------------

    const novaEquipe = {


        id:id,


        equipe:equipe,


        jogadores:[

            jogador1.value.trim(),

            jogador2.value.trim(),

            jogador3.value.trim(),

            jogador4.value.trim()

        ],


        pontuacao:0,


        tempo:"00:00"


    };




    // --------------------------
    // PEGAR RANKING EXISTENTE
    // --------------------------

    let ranking = JSON.parse(

        localStorage.getItem("ranking")

    ) || [];





    // --------------------------
    // VERIFICAR DUPLICIDADE
    // --------------------------

    const existeEquipe = ranking.find(

        item => 
        item.equipe.toLowerCase() === equipe.toLowerCase()

    );



    if(existeEquipe){


        alert("Já existe uma equipe com esse nome.");


        return;


    }





    // --------------------------
    // SALVAR
    // --------------------------

    ranking.push(novaEquipe);



    localStorage.setItem(

        "ranking",

        JSON.stringify(ranking)

    );





    // --------------------------
    // MOSTRAR SUCESSO
    // --------------------------

    abrirModalSucesso();




    // --------------------------
    // LIMPAR FORMULÁRIO
    // --------------------------

    document
    .getElementById("formCadastro")
    .reset();



}





// ======================================================
// MODAL CONFIRMAÇÃO
// ======================================================


const modal =
document.getElementById("modalConfirmacao");


const btnConfirmarModal =
document.getElementById("btnConfirmarModal");


const btnCancelarModal =
document.getElementById("btnCancelarModal");




function abrirModal(){


    modal.style.display="flex";


}




function fecharModal(){


    modal.style.display="none";


}





btnCancelarModal.addEventListener("click",function(){


    fecharModal();


});





btnConfirmarModal.addEventListener("click",function(){


    fecharModal();


    salvarEquipe();


});





// ======================================================
// MODAL SUCESSO
// ======================================================


const modalSucesso =
document.getElementById("modalSucesso");


const btnFecharSucesso =
document.getElementById("btnFecharSucesso");





function abrirModalSucesso(){


    modalSucesso.style.display="flex";


}





function fecharModalSucesso(){


    modalSucesso.style.display="none";


}





btnFecharSucesso.addEventListener("click",function(){


    fecharModalSucesso();


});







// ------------------------------
// BOTÃO VOLTAR
// ------------------------------

document
.getElementById("btnVoltar")
.addEventListener("click", function(){


    window.location.href="../index.html";


});






// ------------------------------
// VAGALUMES
// ------------------------------


const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;



try {


    const firefliesWrap =
    document.getElementById("fireflies");



    if(
        firefliesWrap &&
        !prefersReducedMotion
    ){


        const COUNT = 20;



        for(let i = 0; i < COUNT; i++){



            const f =
            document.createElement("span");



            f.className="firefly";



            const startX =
            Math.random()*100;



            const startY =
            20 + Math.random()*70;



            const dx =
            (Math.random()-0.5)*160;



            const dy =
            -(60 + Math.random()*140);



            const duration =
            6 + Math.random()*8;



            const delay =
            Math.random()*8;




            f.style.left =
            `${startX}%`;



            f.style.top =
            `${startY}%`;



            f.style.setProperty(
                "--dx",
                `${dx}px`
            );



            f.style.setProperty(
                "--dy",
                `${dy}px`
            );



            f.style.animationDuration =
            `${duration}s`;



            f.style.animationDelay =
            `${delay}s`;



            firefliesWrap.appendChild(f);


        }


    }


} catch(err){

    console.error(err);

}