let buttonSelect = document.querySelectorAll('.app__card-button');
let dataContexto = document.querySelector('html');
let imgA = document.querySelector('.app__image');


for (let i = 0; i < buttonSelect.length; i++) {
    buttonSelect[i].onclick = function () {
        alteraSeletor(i);
    }

    /* Pode utilizar outro metodo se quiser:------------------------

        buttonSelect[i].addEventListener( 'click', ()=>{alteraSeletor(i)} );
    */
}

function alteraSeletor(x) {
    buttonSelect[x].classList.add('active');

    if (x == 0) {
        // Foco
        removeActive(1, 2);
        mudaTextoH1('Otimize sua produtividade,', 'mergulhe no que importa.');
        alteraEstiloEImg('foco');

    } else if (x == 1) {
        // Curto
        removeActive(0, 2);
        mudaTextoH1('Que tal dar uma respirada?', 'Faça uma pausa curta!');
        alteraEstiloEImg('descanso-curto');

    } else if (x == 2) {
        // Longo
        removeActive(0, 1);
        mudaTextoH1('Hora de voltar à superfície.', 'Faça uma pausa longa.');
        alteraEstiloEImg('descanso-longo');

    }
}

function alteraEstiloEImg(parametro) {
    dataContexto.dataset.contexto = parametro;
    imgA.setAttribute('src', `imagens/${parametro}.png`);
/*
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

function removeActive(y, z) {
    buttonSelect[y].classList.remove('active');
    buttonSelect[z].classList.remove('active');
    // console.log('remove funciona');
}

function mudaTextoH1(TEXTO1, TEXTO2) {
    document.querySelector('h1').innerHTML =`${TEXTO1}<br><strong class="app__title-strong">${TEXTO2}</strong>`;
}

// Ainda pendente ----------------------------------------------------

let buttonComecar = document.getElementById('start-pause');
let tempoFoco = 1500;
let tempoCurto = 300;
let tempoLongo = 900;


buttonComecar.addEventListener('click', () => { console.log('ola mundo') });

