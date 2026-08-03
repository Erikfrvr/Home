/* ==========================================
   Motion Verse
   cameraSelector.js
========================================== */

let equipe = null;
let cameras = [];


// ==========================================
// INICIALIZAÇÃO
// ==========================================

window.addEventListener("DOMContentLoaded", async () => {

    equipe = JSON.parse(
        localStorage.getItem("equipeAtual")
    );

    if (!equipe) {

        alert("Nenhuma equipe encontrada.");

        window.location.href = "../cadastro.html";

        return;

    }

    carregarEquipe();

    await carregarCameras();

});


// ==========================================
// CARREGA DADOS DA EQUIPE
// ==========================================

function carregarEquipe() {

    document.getElementById("nomeEquipe").textContent =
        `Equipe: ${equipe.equipe}`;

    document.getElementById("nomeJogador1").textContent =
        equipe.jogadores[0].nome;

    document.getElementById("nomeJogador2").textContent =
        equipe.jogadores[1].nome;

    document.getElementById("nomeJogador3").textContent =
        equipe.jogadores[2].nome;

    document.getElementById("nomeJogador4").textContent =
        equipe.jogadores[3].nome;

}


// ==========================================
// CARREGA AS WEBCAMS
// ==========================================

async function carregarCameras() {

    try {

        // Solicita permissão
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        // Fecha imediatamente
        stream.getTracks().forEach(track => track.stop());

        const devices =
            await navigator.mediaDevices.enumerateDevices();

        cameras = devices.filter(device =>
            device.kind === "videoinput"
        );

        preencherSelect("camera1");
        preencherSelect("camera2");
        preencherSelect("camera3");
        preencherSelect("camera4");

    }

    catch (erro) {

        console.error(erro);

        alert("Não foi possível acessar as webcams.");

    }

}


// ==========================================
// PREENCHE UM SELECT
// ==========================================

function preencherSelect(idSelect) {

    const select =
        document.getElementById(idSelect);

    select.innerHTML = "";

    cameras.forEach((camera, indice) => {

        const option =
            document.createElement("option");

        option.value = camera.deviceId;

        option.textContent =
            camera.label || `Webcam ${indice + 1}`;

        select.appendChild(option);

    });

}


// ==========================================
// SALVA CONFIGURAÇÃO
// ==========================================

function salvarConfiguracao() {

    const selects = [

        document.getElementById("camera1"),
        document.getElementById("camera2"),
        document.getElementById("camera3"),
        document.getElementById("camera4")

    ];

    const usados = [];

    for (let i = 0; i < selects.length; i++) {

        const deviceId = selects[i].value;

        if (usados.includes(deviceId)) {

            alert("Uma mesma webcam não pode ser usada por dois jogadores.");

            return false;

        }

        usados.push(deviceId);

        const camera = cameras.find(c =>
            c.deviceId === deviceId
        );

        equipe.jogadores[i].camera = {

            id: deviceId,

            nome: camera.label

        };

    }

    // Atualiza equipe atual

    localStorage.setItem(

        "equipeAtual",

        JSON.stringify(equipe)

    );

    // Atualiza ranking

    let ranking = JSON.parse(
        localStorage.getItem("ranking")
    ) || [];

    const indice = ranking.findIndex(item =>
        item.id === equipe.id
    );

    if (indice !== -1) {

        ranking[indice] = equipe;

    }

    localStorage.setItem(
        "ranking",
        JSON.stringify(ranking)
    );

    return true;

}


// ==========================================
// BOTÃO INICIAR
// ==========================================

document
.getElementById("btnIniciar")
.addEventListener("click", () => {

    if (!salvarConfiguracao()) {

        return;

    }

    window.location.href = "../jogo.html";

});


// ==========================================
// BOTÃO VOLTAR
// ==========================================

document
.getElementById("btnVoltar")
.addEventListener("click", () => {

    history.back();

});