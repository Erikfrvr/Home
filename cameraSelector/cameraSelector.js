const equipe = JSON.parse(localStorage.getItem("equipeAtual"));

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

const modal = document.getElementById("modalConfirmacao");
const btnCancelar = document.getElementById("btnCancelarModal");
const btnConfirmar = document.getElementById("btnConfirmarModal");

const modalErro = document.getElementById("modalErro");
const mensagemErro = document.getElementById("mensagemErro");
const btnFecharErro = document.getElementById("btnFecharErro");

/* ======================================================
   FIREFLIES
====================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const firefliesWrap = document.getElementById("fireflies");

if (firefliesWrap && !prefersReducedMotion) {

    const COUNT = 20;

    for (let i = 0; i < COUNT; i++) {

        const f = document.createElement("span");

        f.className = "firefly";

        const startX = Math.random() * 100;
        const startY = 20 + Math.random() * 70;

        const dx = (Math.random() - 0.5) * 160;
        const dy = -(60 + Math.random() * 140);

        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * 8;

        f.style.left = `${startX}%`;
        f.style.top = `${startY}%`;

        f.style.setProperty("--dx", `${dx}px`);
        f.style.setProperty("--dy", `${dy}px`);

        f.style.animationDuration = `${duration}s`;
        f.style.animationDelay = `${delay}s`;

        firefliesWrap.appendChild(f);

    }

}

/* ======================================================
   DADOS DA EQUIPE
====================================================== */

if (!equipe) {

    window.location.href = "../cadastro/cadastro.html";

}

nomeEquipe.textContent = equipe.nomeEquipe;

jogadores[0].textContent = equipe.jogadores[0];
jogadores[1].textContent = equipe.jogadores[1];
jogadores[2].textContent = equipe.jogadores[2];
jogadores[3].textContent = equipe.jogadores[3];

/* ======================================================
   CARREGAR WEBCAMS
====================================================== */

async function carregarWebcams() {

    try {

        await navigator.mediaDevices.getUserMedia({ video: true });

        const devices = await navigator.mediaDevices.enumerateDevices();

        const cameras = devices.filter(device => device.kind === "videoinput");

        selects.forEach(select => {

            select.innerHTML = "";

            const primeira = document.createElement("option");

            primeira.value = "";
            primeira.textContent = "Selecione uma câmera";

            select.appendChild(primeira);

            cameras.forEach((camera, index) => {

                const option = document.createElement("option");

                option.value = camera.deviceId;
                option.textContent = camera.label || `Webcam ${index + 1}`;

                select.appendChild(option);

            });

        });

    }

    catch {

        mostrarErro("Nenhuma webcam encontrada.");

    }

}

carregarWebcams();



/* ======================================================
   MODAL DE ERRO
====================================================== */

function mostrarErro(msg) {

    mensagemErro.textContent = msg;

    modalErro.style.display = "flex";

}

btnFecharErro.onclick = () => {

    modalErro.style.display = "none";

};

/* ======================================================
   BOTÃO VOLTAR
====================================================== */

btnVoltar.onclick = () => {

    window.location.href = "../cadastro/cadastro.html";

};

/* ======================================================
   BOTÃO INICIAR
====================================================== */

btnIniciar.onclick = () => {

    const escolhidas = selects.map(select => select.value);

    if (escolhidas.includes("")) {

        mostrarErro("Selecione todas as webcams.");

        return;

    }

    const repetidas = new Set(escolhidas);

    if (repetidas.size !== 4) {

        mostrarErro("Cada jogador deve utilizar uma webcam diferente.");

        return;

    }

    modal.style.display = "flex";

};

/* ======================================================
   ENTER
====================================================== */

document.addEventListener("keydown", (e) => {

    if (e.key !== "Enter") return;

    // Se o modal de confirmação estiver aberto
    if (modal.style.display === "flex") {

        e.preventDefault();
        btnConfirmar.click();
        return;

    }

    // Se o modal de erro estiver aberto
    if (modalErro.style.display === "flex") {

        e.preventDefault();
        btnFecharErro.click();
        return;

    }

    // Se nenhum modal estiver aberto
    e.preventDefault();
    btnIniciar.click();

});

/* ======================================================
   MODAL CONFIRMAR
====================================================== */

btnCancelar.onclick = () => {

    modal.style.display = "none";

};

btnConfirmar.onclick = () => {

    const cameras = {

        jogador1: selects[0].value,
        jogador2: selects[1].value,
        jogador3: selects[2].value,
        jogador4: selects[3].value

    };

    localStorage.setItem("camerasEquipe", JSON.stringify(cameras));

    modal.style.display = "none";

    window.location.href = "../game/game.html";

};

/* ======================================================
   FECHAR MODAIS
====================================================== */

window.onclick = (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

    if (e.target === modalErro) {

        modalErro.style.display = "none";

    }

};