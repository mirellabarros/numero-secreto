let listaDeNumerosSorteados = [];
let numeroMaximo = 3;
let numeroSecreto = geraNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function exibeTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibeTexto('h1', 'Jogo do número secreto');
    exibeTexto('p', 'Escolha um número entre 1 e ' + numeroMaximo);
}

function verificarChute() {

    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibeTexto('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`
        exibeTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibeTexto('p', 'O número secreto é menor.')
        } else {
            exibeTexto('p', 'O número secreto é maior.')
        }
        tentativas++;
        limparCampo();
    }
}

function geraNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return geraNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = geraNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}