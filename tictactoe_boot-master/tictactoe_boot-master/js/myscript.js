// Configurando o monitor de eventos do Javascript
document.addEventListener('DOMContentLoaded', function() {

    // Elementos do HTML
    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status p');
    const resetBtn = document.getElementById('reset-button');

    // Definição dos jogadores
    const JOGADOR_1 = 'Changeman';
    const JOGADOR_2 = 'Kamen Rider Black';

    let jogadorAtual = JOGADOR_1;
    let jogoAtivo = true;

    // Tabuleiro começa completamente vazio
    let tabuleiro = ['', '', '', '', '', '', '', '', ''];

    // Possibilidades de vitória
    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Função para atualizar o status
    function atualizarStatus() {
        status.textContent = `É a vez do jogador ${jogadorAtual}`;
    }

    // Função executada ao clicar em uma casa
    function clica(event) {

        // Identifica a casa clicada
        const celula = event.currentTarget;
        const indice = Array.from(celulas).indexOf(celula);

        // Impede jogar em casas ocupadas ou após o fim
        if (tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
        }

        // Registra o jogador na casa escolhida
        tabuleiro[indice] = jogadorAtual;

        // Coloca a imagem do personagem
        celula.appendChild(carregaImagem(jogadorAtual));

        // Verifica se o jogador venceu
        if (verifica(jogadorAtual)) {
            jogoAtivo = false;
            status.textContent = `${jogadorAtual} venceu!`;
            return;
        }

        // Verifica se ainda existem casas vazias
        if (tabuleiro.includes('')) {

            // Alterna os jogadores
            jogadorAtual = jogadorAtual === JOGADOR_1
                ? JOGADOR_2
                : JOGADOR_1;

            atualizarStatus();

        } else {

            // Se todas as casas estiverem ocupadas, é empate
            jogoAtivo = false;
            status.textContent = 'Empate!';
        }
    }

    // Verifica as combinações vencedoras
    function verifica(jogador) {

        for (const jogadas of possibilidades) {

            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                return true;
            }
        }

        return false;
    }

    // Carrega a imagem de cada personagem
    function carregaImagem(jogador) {

        const imagem = new Image();

        imagem.src = jogador === JOGADOR_1
            ? 'images/Change Dragon.jpg'
            : 'images/Kamen Rider Black.jpg';

        imagem.alt = jogador;

        return imagem;
    }

    // Reinicia a partida
    function resetJogo() {

        tabuleiro = ['', '', '', '', '', '', '', '', ''];
        jogoAtivo = true;
        jogadorAtual = JOGADOR_1;

        // Limpa todas as casas
        celulas.forEach((celula) => {
            celula.innerHTML = '';
        });

        atualizarStatus();
    }

    // Adiciona os eventos de clique às casas
    celulas.forEach((celula) => {
        celula.addEventListener('click', clica);
    });

    // Evento do botão Reiniciar
    resetBtn.addEventListener('click', resetJogo);

    // Mensagem inicial
    atualizarStatus();

});