/* ==========================================================
   CONFIGURAÇÃO — a Marisa só precisa mexer nesta parte
   ========================================================== */
const CONFIG = {
    whatsapp: "5551983245908",

    // Data no formato AAAA-MM-DD. Deixe "" se ainda não estiver definida.
    proximaEncomenda: {
        data: "2026-11-20",
        origem: "São Paulo",
        aviso: "Reserve sua peça pelo WhatsApp antes da chegada."
    },

    // Medidas em centímetros (CONFIRMAR com a Marisa)
    medidas: [
        { tam: "P", numero: "36-38", busto: "86-90",   cintura: "66-70", quadril: "92-96" },
        { tam: "M", numero: "40-42", busto: "94-98",   cintura: "74-78", quadril: "100-104" },
        { tam: "G", numero: "44",    busto: "102-106", cintura: "82-86", quadril: "108-112" }
    ],

    comoComprar: [
        "Escolha o tamanho e adicione as peças ao seu pedido.",
        "Toque em Finalizar no WhatsApp: o pedido já vai pronto na conversa.",
        "A Marisa confirma a disponibilidade, o pagamento e a entrega com você."
    ]
};

/* status: "disponivel" | "esgotado" | "encomenda" */
const produtos = [
    { id: 1,  nome: "Casaco Pelinho",          preco: 120, tamanhos: ["P", "M", "G"], cor: "Caramelo", status: "disponivel", imagem: "img/imagem1.jpg" },
    { id: 2,  nome: "Jaqueta Preta",           preco: 150, tamanhos: ["P", "M"],      cor: "Preto",    status: "disponivel", imagem: "img/imagem2.jpg" },
    { id: 3,  nome: "Calça Jeans Wide Leg",    preco: 120, tamanhos: ["M", "G"],      cor: "Jeans",    status: "disponivel", imagem: "img/imagem3.jpg" },
    { id: 4,  nome: "Calça Courino Preta",     preco: 80,  tamanhos: ["M", "G"],      cor: "Preto",    status: "disponivel", imagem: "img/imagem4.jpg" },
    { id: 5,  nome: "Suéter Cinza",            preco: 60,  tamanhos: ["P", "M"],      cor: "Cinza",    status: "esgotado",   imagem: "img/imagem5.jpg" },
    { id: 6,  nome: "Blusa de Tricô",          preco: 90,  tamanhos: ["M", "G"],      cor: "Roxo",     status: "disponivel", imagem: "img/imagem6.jpg" },
    { id: 7,  nome: "Saia Plissada Preta",     preco: 70,  tamanhos: ["P", "M", "G"], cor: "Preto",    status: "disponivel", imagem: "img/imagem7.jpg" },
    { id: 8,  nome: "Poncho Gola Alta",        preco: 170, tamanhos: ["M", "G"],      cor: "Vinho",    status: "disponivel", imagem: "img/imagem8.jpg" },
    { id: 9,  nome: "Sobretudo Alfaiataria",   preco: 190, tamanhos: ["M", "G"],      cor: "Off-white",status: "disponivel", imagem: "img/imagem9.jpg" },
    { id: 10, nome: "Vestido Longo Decote V",  preco: 130, tamanhos: ["P", "M"],      cor: "Caramelo", status: "disponivel", imagem: "img/imagem10.jpg" },
    { id: 11, nome: "Vestido Longo Tricot",    preco: 150, tamanhos: ["M", "G"],      cor: "Azul-marinho", status: "encomenda", imagem: "img/imagem11.jpg" }
];

/* ==========================================================
   LÓGICA DO SITE
   ========================================================== */
let pedido = [];
const escolhido = {};   // tamanho escolhido em cada card: { idDoProduto: "M" }

const dinheiro = v => "R$ " + v.toFixed(2).replace(".", ",");

function mostrarSecao(secao) {
    const el = document.getElementById("conteudo");
    document.querySelectorAll("#menu button").forEach(b =>
        b.classList.toggle("ativo", b.dataset.secao === secao));

    if (secao === "looks") el.innerHTML = htmlLooks();
    else if (secao === "encomendas") el.innerHTML = htmlEncomendas();
    else if (secao === "tamanhos") el.innerHTML = htmlTamanhos();
    else el.innerHTML = htmlComoComprar();
}

function htmlLooks() {
    const livres = produtos.filter(p => p.status !== "esgotado").length;
    const rotulo = { disponivel: "Disponível", esgotado: "Esgotado", encomenda: "Sob encomenda" };

    const cards = produtos.map(p => {
        const chips = p.tamanhos.map(t =>
            `<button class="chip" data-t="${t}" onclick="escolherTamanho(${p.id}, '${t}')">${t}</button>`).join("");
        const acao = p.status === "esgotado"
            ? `<button disabled>Esgotado</button>`
            : `<button onclick="adicionar(${p.id})">Adicionar</button>`;

        return `
        <article class="card ${p.status}" id="card-${p.id}">
            <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
            <span class="selo selo-${p.status}">${rotulo[p.status]}</span>
            <h3>${p.nome}</h3>
            <p class="cor">${p.cor}</p>
            <p class="preco">${dinheiro(p.preco)}</p>
            <div class="tamanhos">${chips}</div>
            ${acao}
        </article>`;
    }).join("");

    return `<h2>Looks Disponíveis</h2>
        <p class="destaque">${livres} de ${produtos.length} looks disponíveis agora</p>
        <div class="grid-produtos">${cards}</div>`;
}

function htmlEncomendas() {
    const e = CONFIG.proximaEncomenda;
    let texto = "Data a definir. Fique de olho aqui ou no Instagram.";
    let dias = "";

    if (e.data) {
        const alvo = new Date(e.data + "T00:00:00");
        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const falta = Math.round((alvo - hoje) / 86400000);
        texto = `Chegada prevista: ${alvo.toLocaleDateString("pt-BR")} — encomenda de ${e.origem}`;
        dias = falta > 0 ? `Faltam ${falta} dias` : falta === 0 ? "Chega hoje!" : "Data já passou. Consulte a Marisa.";
    }
    return `<h2>Próximas Encomendas</h2>
        <p class="destaque">${texto}</p>
        ${dias ? `<p class="dias">${dias}</p>` : ""}
        <p>${e.aviso}</p>`;
}

function htmlTamanhos() {
    const linhas = CONFIG.medidas.map(m =>
        `<tr><td>${m.tam}</td><td>${m.numero}</td><td>${m.busto}</td><td>${m.cintura}</td><td>${m.quadril}</td></tr>`).join("");
    return `<h2>Tabela de Medidas</h2>
        <div class="tabela-wrap"><table>
            <thead><tr><th>Tam.</th><th>Número</th><th>Busto (cm)</th><th>Cintura (cm)</th><th>Quadril (cm)</th></tr></thead>
            <tbody>${linhas}</tbody>
        </table></div>`;
}

function htmlComoComprar() {
    return `<h2>Como Comprar</h2>
        <ol class="passos">${CONFIG.comoComprar.map(t => `<li>${t}</li>`).join("")}</ol>`;
}

function escolherTamanho(id, t) {
    escolhido[id] = t;
    document.querySelectorAll(`#card-${id} .chip`).forEach(c =>
        c.classList.toggle("ativo", c.dataset.t === t));
}

function adicionar(id) {
    const p = produtos.find(x => x.id === id);
    const tamanho = escolhido[id] || (p.tamanhos.length === 1 ? p.tamanhos[0] : null);

    if (!tamanho) { aviso("Escolha o tamanho de " + p.nome); return; }

    pedido.push({ nome: p.nome, preco: p.preco, tamanho, status: p.status });
    atualizarCarrinho();
    aviso(p.nome + " (" + tamanho + ") adicionado");
}

function remover(index) {
    pedido.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    document.getElementById("qtd").textContent = pedido.length;

    const lista = document.getElementById("lista-pedido");
    lista.innerHTML = pedido.length === 0
        ? "<li class='vazio'>Nenhuma peça ainda.</li>"
        : pedido.map((i, n) => `
            <li>
                <span>${i.nome} (${i.tamanho})${i.status === "encomenda" ? " · sob encomenda" : ""}<br><strong>${dinheiro(i.preco)}</strong></span>
                <button class="lixeira" onclick="remover(${n})" aria-label="Remover">🗑️</button>
            </li>`).join("");

    const total = pedido.reduce((s, i) => s + i.preco, 0);
    document.getElementById("total").textContent = "Total: " + dinheiro(total);
}

function abrirCarrinho()  { document.getElementById("carrinho").classList.remove("oculto"); }
function fecharCarrinho() { document.getElementById("carrinho").classList.add("oculto"); }

function aviso(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("visivel");
    clearTimeout(aviso.timer);
    aviso.timer = setTimeout(() => t.classList.remove("visivel"), 2200);
}

function finalizarNoWhatsApp() {
    if (pedido.length === 0) { aviso("Seu pedido está vazio"); return; }

    const linhas = pedido.map(i =>
        `• ${i.nome} (tam. ${i.tamanho}) - ${dinheiro(i.preco)}${i.status === "encomenda" ? " [sob encomenda]" : ""}`);
    const total = pedido.reduce((s, i) => s + i.preco, 0);
    const msg = `Olá! Gostaria de encomendar:\n${linhas.join("\n")}\n\nTotal: ${dinheiro(total)}`;

    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

// Abre já na vitrine
mostrarSecao("looks");
atualizarCarrinho();