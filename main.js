let contextoAtual = document.querySelector('html').dataset;
let nomeContexto = [
    {nome:'foco', tempo: 1500},
    {nome:'descanso-curto', tempo: 30},
    {nome:'descanso-longo', tempo: 900}
];
let imgPrincipal = document.querySelector('.app__image');
let nomeDoArquivoImg = { Pausar: 'pause', Começar: 'play_arrow' };
let seletorDeContextos = document.querySelectorAll('.app__card-button');
let relogio = document.getElementById('timer');
let tempoAtual = nomeContexto[0]['tempo'];
let crons = null;
let checkBoxMusica = document.getElementById('alternar-musica');
let buttonComecarPausar = document.querySelector('.app__card-primary-button'); 
let situacaoStartPause = buttonComecarPausar.innerText;
const musica = {
    play: new Audio('/sons/play.wav'),
    pause: new Audio('/sons/pause.mp3'),
    beep: new Audio('/sons/beep.mp3'),
    luna: new Audio('sons/luna-rise-part-one.mp3')
};
musica['luna'].loop = true; // Musica toca em loop

// Funções --------------------------------------------------

function selecionaContexto(indiceLista){
    seletorDeContextos.forEach( function(contexto) {
        contexto.classList.remove('active');
    });
    
    seletorDeContextos[indiceLista].classList.add('active');
    contextoAtual.contexto = nomeContexto[indiceLista]['nome'];
}

function alteraContexto(indiceLista) {
    mudaImgEFundo(contextoAtual.contexto);

    if (indiceLista == 0) {
        mudaTextoH1('Otimize sua produtividade,', 'mergulhe no que importa.');

    } else if (indiceLista == 1) {
        mudaTextoH1('Que tal dar uma respirada?', 'Faça uma pausa curta!');

    } else if (indiceLista == 2) {
        mudaTextoH1('Hora de voltar à superfície.', 'Faça uma pausa longa.');
    }

    tempoAtual = nomeContexto[indiceLista]['tempo'];
    mudaRelogio();
}

function mudaImgEFundo(nomeDataContexto) {
    contextoAtual.contexto = nomeDataContexto;
    imgPrincipal.setAttribute('src', `imagens/${nomeDataContexto}.png`);

/* Outra forma usando Switch no lugar da function mudaTextoH1
    switch (parametro) {
        case 'foco':
            document.querySelector('h1').innerHTML =
                `Otimize sua produtividade,<br> 
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
                
        case 'descanso-curto':
            document.querySelector('h1').innerHTML =
                `Que tal dar uma respirada?<br> 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            document.querySelector('h1').innerHTML =
                `Hora de voltar à superfície.<br> 
                <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
*/
}

function mudaTextoH1(TEXTO1, TEXTO2) {
    document.querySelector('h1').innerHTML =
    `${TEXTO1}<br>
    <strong class="app__title-strong">${TEXTO2}</strong>`
    ;
}

function musicaAtivaDesativa(){
    if(checkBoxMusica.checked && situacaoStartPause == 'Pausar'){
        musica['luna'].play();
    }else{
        musica['luna'].pause();
    }
}

function trocaButtonComecarPausar(nomeArquivo){
    document.querySelector('.app__card-primary-button-icon').setAttribute('src', `/imagens/${nomeArquivo}.png` );
    document.querySelector('.app__card-primary-button span').textContent = `${situacaoStartPause}`;
}

// Relogio ------------------------------------- 

function cronIniciarPausar(){
    if(crons){
        musica['pause'].play();  // som Pausar temporizador
        cronZerar();
        return;
    }else{
        musica['play'].play(); // som inicio temporizador 
        crons = setInterval(()=>{contagem()}, 1000);
    }
}
function cronZerar(){
    clearInterval(crons);
    crons = null;
}
function contagem(){
    if (tempoAtual>=0){
        mudaRelogio();
        tempoAtual--;
    }else{
        musica['beep'].play(); // som de tempo esgotado 
        cronZerar();
        situacaoStartPause = 'Começar';
        musicaAtivaDesativa();
        trocaButtonComecarPausar(nomeDoArquivoImg[situacaoStartPause]);
        return;
    }
}
function mudaRelogio(){
    let tempo = new Date (tempoAtual * 1000);
    let tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute: '2-digit', second: '2-digit'});
    relogio.textContent = tempoFormatado;
}

// Configurações iniciais ---------------------------------------

mudaRelogio();

// Eventos ------------------------------------------------------

for (let i = 0; i < seletorDeContextos.length; i++) {
    seletorDeContextos[i].onclick = function () {
        selecionaContexto(i);
        alteraContexto(i);
        cronZerar();
        
        situacaoStartPause = 'Começar';
        musicaAtivaDesativa();
        trocaButtonComecarPausar(nomeDoArquivoImg[situacaoStartPause]);
    }
}

checkBoxMusica.addEventListener('change', () => { 
    musicaAtivaDesativa();
});

buttonComecarPausar.addEventListener('click', () => { 
    situacaoStartPause = situacaoStartPause == 'Começar'? 'Pausar': 'Começar';
    
    musicaAtivaDesativa();
    trocaButtonComecarPausar(nomeDoArquivoImg[situacaoStartPause]);

    cronIniciarPausar();
});
