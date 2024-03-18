let listaDeContextos = document.querySelectorAll('.app__card-button');
let imgPrincipal = document.querySelector('.app__image');

let checkBoxMusica = document.getElementById('alternar-musica');
let buttonComecarPausar = document.querySelector('.app__card-primary-button'); 
let situacao = buttonComecarPausar.innerText;
let nomeDoArquivoImg = {Pausar: 'pause', Começar: 'play_arrow'};

let musica = document.querySelector('.som-luna');

// Funções --------------------------------------------------

function selecionaContexto(parametro){
    listaDeContextos.forEach( function(contexto) {
        contexto.classList.remove('active');
    });
    
    listaDeContextos[parametro].classList.add('active');
}

function alteraContexto(x) {
    if (x == 0) {
        // Foco
        mudaImgEFundo('foco');
        mudaTextoH1('Otimize sua produtividade,', 'mergulhe no que importa.');

    } else if (x == 1) {
        // Curto
        mudaImgEFundo('descanso-curto');
        mudaTextoH1('Que tal dar uma respirada?', 'Faça uma pausa curta!');

    } else if (x == 2) {
        // Longo
        mudaImgEFundo('descanso-longo');
        mudaTextoH1('Hora de voltar à superfície.', 'Faça uma pausa longa.');

    }else{
    }
}

function mudaImgEFundo(parametro) {
    document.querySelector('html').dataset.contexto = parametro;
    imgPrincipal.setAttribute('src', `imagens/${parametro}.png`);

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
    if(checkBoxMusica.checked && situacao == 'Pausar'){
        musica.play();
    }else{
        musica.pause();
    }
}

function trocaButtonComecarPausar(nomeArquivo){
    document.querySelector('.app__card-primary-button-icon').setAttribute('src', `/imagens/${nomeArquivo}.png` );
    document.querySelector('.app__card-primary-button span').textContent = `${situacao}`;
}

// Eventos ------------------------------------------------------

for (let i = 0; i < listaDeContextos.length; i++) {
    listaDeContextos[i].onclick = function () {
        selecionaContexto(i);
        alteraContexto(i);

        situacao = 'Começar';
        musicaAtivaDesativa();
        trocaButtonComecarPausar(nomeDoArquivoImg[situacao]);
    }
}

checkBoxMusica.addEventListener('change', () => { 
    musicaAtivaDesativa();
});

buttonComecarPausar.addEventListener('click', () => { 
    situacao = situacao == 'Começar'? 'Pausar': 'Começar';
    
    musicaAtivaDesativa();
    trocaButtonComecarPausar(nomeDoArquivoImg[situacao]);
});

// Ainda pendente ----------------------------------------------------

