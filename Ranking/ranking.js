const corpoTabela = document.getElementById("corpoTabela");
const pesquisa = document.getElementById("pesquisa");
const btnLimpar = document.getElementById("btnLimpar");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function obterRanking() {
  try {
    const dados = JSON.parse(localStorage.getItem("ranking"));
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvarRanking(ranking) {
  localStorage.setItem("ranking", JSON.stringify(ranking));
}

function criarCelula(texto) {
  const td = document.createElement("td");
  td.textContent = texto || "-";
  return td;
}

function carregarRanking() {
  const ranking = obterRanking();
  corpoTabela.innerHTML = "";

  if (ranking.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 9;
    td.className = "vazio";
    td.textContent = "Nenhuma equipe cadastrada.";
    tr.appendChild(td);
    corpoTabela.appendChild(tr);
    return;
  }

  ranking.forEach((equipe, indice) => {
    const tr = document.createElement("tr");
    const jogadores = Array.isArray(equipe.jogadores) ? equipe.jogadores : [];

    
    tr.appendChild(criarCelula(equipe.equipe));
    tr.appendChild(criarCelula(jogadores[0]));
    tr.appendChild(criarCelula(jogadores[1]));
    tr.appendChild(criarCelula(jogadores[2]));
    tr.appendChild(criarCelula(jogadores[3]));
    tr.appendChild(criarCelula(equipe.pontuacao || 0));
    tr.appendChild(criarCelula(equipe.tempo || "00:00"));

    const tdAcoes = document.createElement("td");
    const btn = document.createElement("button");
    btn.className = "btn-excluir";
    btn.textContent = "Excluir";
    btn.addEventListener("click", () => excluirEquipe(indice));
    tdAcoes.appendChild(btn);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  });
}

function excluirEquipe(indice) {
  const senhaCorreta = "Senacsala21@"; // Altere para a senha que desejar

  const senha = prompt("Digite a senha para excluir esta equipe:");

  if (senha === null) {
    return; // Usuário cancelou
  }

  if (senha !== senhaCorreta) {
    alert("Senha incorreta!");
    return;
  }

  const confirmar = confirm("Deseja excluir esta equipe?");
  if (!confirmar) return;

  const ranking = obterRanking();
  ranking.splice(indice, 1);
  salvarRanking(ranking);
  carregarRanking();
}

btnLimpar.addEventListener("click", () => {
  const senhaCorreta = "Senacsala21@"; // Mesma senha

  const senha = prompt("Digite a senha para limpar o ranking:");

  if (senha === null) {
    return;
  }

  if (senha !== senhaCorreta) {
    alert("Senha incorreta!");
    return;
  }

  const confirmar = confirm("Deseja apagar TODAS as equipes?");
  if (!confirmar) return;

  localStorage.removeItem("ranking");
  carregarRanking();
});

pesquisa.addEventListener("keyup", () => {
  const texto = pesquisa.value.toLowerCase();
  const linhas = corpoTabela.querySelectorAll("tr");

  linhas.forEach((linha) => {
    const conteudo = linha.innerText.toLowerCase();
    linha.style.display = conteudo.includes(texto) ? "" : "none";
  });
});

window.addEventListener("DOMContentLoaded", carregarRanking);

try {
  const firefliesWrap = document.getElementById('fireflies');
  if (firefliesWrap && !prefersReducedMotion) {
    const COUNT = 20;
    for (let i = 0; i < COUNT; i++) {
      const f = document.createElement('span');
      f.className = 'firefly';
      const startX = Math.random() * 100;
      const startY = 20 + Math.random() * 70;
      const dx = (Math.random() - 0.5) * 160;
      const dy = -(60 + Math.random() * 140);
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 8;
      f.style.left = `${startX}%`;
      f.style.top = `${startY}%`;
      f.style.setProperty('--dx', `${dx}px`);
      f.style.setProperty('--dy', `${dy}px`);
      f.style.animationDuration = `${duration}s`;
      f.style.animationDelay = `${delay}s`;
      firefliesWrap.appendChild(f);
    }
  }
} catch (err) {}
