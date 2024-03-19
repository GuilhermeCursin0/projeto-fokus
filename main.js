let contextoAtual = document.querySelector('html').dataset;
let seletorDeContextos = document.querySelectorAll('.app__card-button');
const nomeContexto = [
    {nome:'foco', tempo: 15},
    {nome:'descanso-curto', tempo: 3},
    {nome:'descanso-longo', tempo: 9}
];
let imgPrincipal = document.querySelector('.app__image');
let relogio = document.getElementById('timer');
let checkBoxMusica = document.getElementById('alternar-musica');
let buttonComecarPausar = document.querySelector('.app__card-primary-button'); 
let situacaoStartPause = buttonComecarPausar.innerText;
const nomeDoArquivoImg = { Pausar: 'pause', Começar: 'play_arrow' };
const musica = {
    play: new Audio('/sons/play.wav'),
    pause: new Audio('/sons/pause.mp3'),
    beep: new Audio('/sons/beep.mp3'),
    luna: new Audio('sons/luna-rise-part-one.mp3')
};
musica['luna'].loop = true; // Musica toca em loop

// Configurações iniciais -----------------------------------
relogio.textContent = nomeContexto[0]['tempo'];
// Funções --------------------------------------------------

function selecionaContexto(indiceLista){
    seletorDeContextos.forEach( function(contexto) {
        contexto.classList.remove('active');
    });
    
    seletorDeContextos[indiceLista].classList.add('active');
    contextoAtual.contexto = nomeContexto[indiceLista]['nome'];
}

function alteraContexto(indiceLista) {
    if (indiceLista == 0) {
        mudaTextoH1('Otimize sua produtividade,', 'mergulhe no que importa.');

    } else if (indiceLista == 1) {
        mudaTextoH1('Que tal dar uma respirada?', 'Faça uma pausa curta!');

    } else if (indiceLista == 2) {
        mudaTextoH1('Hora de voltar à superfície.', 'Faça uma pausa longa.');
    }

    mudaImgEFundo(contextoAtual.contexto);
    relogio.textContent = nomeContexto[indiceLista]['tempo'];
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

// Eventos ------------------------------------------------------

for (let i = 0; i < seletorDeContextos.length; i++) {
    seletorDeContextos[i].onclick = function () {
        selecionaContexto(i);
        alteraContexto(i);
        
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


// pendencias ----------------------------------------

// Criar Relogio ------------------------------------- 
let crons = null;
let tempo ;

function cronIniciarPausar(){
    tempo = relogio.textContent;
    if(crons){
        // musica['pause'].play();  // som Pausar temporizador
        cronZerar();
        return;
    }else{
        // musica['play'].play(); // som inicio temporizador 
        crons = setInterval(()=>{contagem()}, 1000);
    }
}
function cronZerar(){
    clearInterval(crons);
    crons = null;
}
function contagem(){
    if (tempo>=0){
        relogio.textContent = tempo;
        tempo--;
    }else{
        // musica['beep'].play(); // som de tempo esgotado 
        cronZerar();
        return;
    }
}


