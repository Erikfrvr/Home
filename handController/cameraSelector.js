/* ==========================================
   Motion Verse
   cameraSelector.js
========================================== */


let equipe = null;
let cameras = [];


// ==========================================
// ELEMENTOS
// ==========================================

const nomeEquipe = document.getElementById("nomeEquipe");

const jogadores = [

    document.getElementById("nomeJogador1"),
    document.getElementById("nomeJogador2"),
    document.getElementById("nomeJogador3"),
    document.getElementById("nomeJogador4")

];


const selects = [

    document.getElementById("camera1"),
    document.getElementById("camera2"),
    document.getElementById("camera3"),
    document.getElementById("camera4")

];


const btnVoltar = document.getElementById("btnVoltar");
const btnIniciar = document.getElementById("btnIniciar");


// Modal confirmação

const modal = document.getElementById("modalConfirmacao");

const btnCancelar = document.getElementById("btnCancelarModal");

const btnConfirmar = document.getElementById("btnConfirmarModal");


// Modal erro

const modalErro = document.getElementById("modalErro");

const mensagemErro = document.getElementById("mensagemErro");

const btnFecharErro = document.getElementById("btnFecharErro");



// ==========================================
// INICIALIZAÇÃO
// ==========================================


window.addEventListener("DOMContentLoaded", async () => {


    equipe = JSON.parse(
        localStorage.getItem("equipeAtual")
    );


    if (!equipe) {


        mostrarErro(
            "Nenhuma equipe encontrada."
        );


        setTimeout(() => {

            window.location.href =
                "../cadastro/cadastro.html";

        },2000);


        return;

    }


    carregarEquipe();


    criarFireflies();


    await carregarCameras();


});




// ==========================================
// CARREGAR EQUIPE
// ==========================================


function carregarEquipe(){


    nomeEquipe.textContent =
        equipe.equipe ||
        equipe.nomeEquipe;



    jogadores.forEach((elemento,index)=>{


        if(
            equipe.jogadores[index]
        ){


            if(
                typeof equipe.jogadores[index] === "object"
            ){

                elemento.textContent =
                    equipe.jogadores[index].nome;

            }

            else{


                elemento.textContent =
                    equipe.jogadores[index];

            }


        }


    });


}



// ==========================================
// FIRELIES
// ==========================================


function criarFireflies(){


    const area =
        document.getElementById("fireflies");


    if(!area) return;



    const reduzir =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    if(reduzir) return;



    for(let i=0;i<20;i++){


        const f =
            document.createElement("span");


        f.className =
            "firefly";



        f.style.left =
            Math.random()*100+"%";


        f.style.top =
            (20+
            Math.random()*70)+"%";



        f.style.setProperty(
            "--dx",
            `${(Math.random()-0.5)*160}px`
        );


        f.style.setProperty(
            "--dy",
            `${-(60+Math.random()*140)}px`
        );



        f.style.animationDuration =
            `${6+Math.random()*8}s`;



        f.style.animationDelay =
            `${Math.random()*8}s`;



        area.appendChild(f);


    }


}




// ==========================================
// CARREGAR WEBCAMS
// ==========================================


async function carregarCameras(){


    try{


        const stream =
            await navigator.mediaDevices.getUserMedia({

                video:true

            });



        stream
        .getTracks()
        .forEach(track=>track.stop());



        const devices =
            await navigator.mediaDevices.enumerateDevices();



        cameras =
            devices.filter(device=>

                device.kind === "videoinput"

            );



        selects.forEach(select=>{


            preencherSelect(select);


        });



    }


    catch(error){


        console.error(error);


        mostrarErro(
            "Não foi possível acessar as webcams."
        );


    }


}



// ==========================================
// PREENCHE SELECT
// ==========================================


function preencherSelect(select){


    select.innerHTML="";



    const primeira =
        document.createElement("option");


    primeira.value="";

    primeira.textContent =
        "Selecione uma câmera";


    select.appendChild(primeira);




    cameras.forEach((camera,index)=>{


        const option =
            document.createElement("option");



        option.value =
            camera.deviceId;



        option.textContent =
            camera.label ||
            `Webcam ${index+1}`;



        select.appendChild(option);


    });


}




// ==========================================
// SALVAR CONFIGURAÇÃO
// ==========================================


function salvarConfiguracao(){


    const usados=[];



    for(let i=0;i<selects.length;i++){



        const idCamera =
            selects[i].value;



        if(!idCamera){


            mostrarErro(
                "Selecione todas as webcams."
            );


            return false;


        }



        if(
            usados.includes(idCamera)
        ){


            mostrarErro(
                "Cada jogador deve usar uma webcam diferente."
            );


            return false;


        }



        usados.push(idCamera);



        const camera =
            cameras.find(c=>

                c.deviceId === idCamera

            );



        equipe.jogadores[i].camera = {


            id:idCamera,


            nome:
            camera.label ||
            `Webcam ${i+1}`


        };


    }



    localStorage.setItem(

        "equipeAtual",

        JSON.stringify(equipe)

    );



    atualizarRanking();



    return true;


}




// ==========================================
// ATUALIZAR RANKING
// ==========================================


function atualizarRanking(){


    let ranking =
        JSON.parse(
            localStorage.getItem("ranking")
        )
        || [];



    const indice =
        ranking.findIndex(item=>

            item.id === equipe.id

        );



    if(indice !== -1){


        ranking[indice]=equipe;


    }


    else{


        ranking.push(equipe);


    }



    localStorage.setItem(

        "ranking",

        JSON.stringify(ranking)

    );


}




// ==========================================
// ERRO
// ==========================================


function mostrarErro(msg){


    mensagemErro.textContent =
        msg;


    modalErro.style.display =
        "flex";


}




btnFecharErro.onclick=()=>{


    modalErro.style.display =
        "none";


};




// ==========================================
// BOTÕES
// ==========================================


btnVoltar.onclick=()=>{


    window.location.href =
        "../cadastro/cadastro.html";


};





btnIniciar.onclick=()=>{


    if(
        salvarConfiguracao()
    ){


        modal.style.display =
            "flex";


    }


};




// ==========================================
// CONFIRMAÇÃO
// ==========================================


btnCancelar.onclick=()=>{


    modal.style.display =
        "none";


};




btnConfirmar.onclick=()=>{


    modal.style.display =
        "none";



    window.location.href =
        "../game/game.html";


};




// ==========================================
// ENTER
// ==========================================


document.addEventListener(
"keydown",
(e)=>{


    if(e.key !== "Enter")
        return;



    if(
        modal.style.display==="flex"
    ){


        btnConfirmar.click();

        return;


    }



    if(
        modalErro.style.display==="flex"
    ){


        btnFecharErro.click();

        return;


    }



    btnIniciar.click();


});




// ==========================================
// FECHAR MODAIS
// ==========================================


window.onclick=(e)=>{


    if(
        e.target === modal
    ){


        modal.style.display =
            "none";


    }



    if(
        e.target === modalErro
    ){


        modalErro.style.display =
            "none";


    }


};