const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formTarefas = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefa = document.querySelector('.app__section-task-list');

const listaDeTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

btnAdicionarTarefa.addEventListener('click', ()=>{
    formTarefas.classList.toggle('hidden')

});

// Submeter formulario      ----------------------------------------------

formTarefas.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    listaDeTarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));

    
});


listaDeTarefas.forEach(tarefa => {
   imprimeItemDaLista(tarefa)
});

function geraItemDaLista(tarefa){
    const itemLista = document.createElement('li');
    itemLista.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML =`
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const btn = document.createElement('button');
    btn.classList.add('app_button-edit');

    const btnImagem = document.createElement('img');
    btnImagem.setAttribute('src', '/imagens/edit.png')
    btn.append(btnImagem);

    itemLista.append(svg);
    itemLista.append(paragrafo);
    itemLista.append(btn);

    return (itemLista);
}

function imprimeItemDaLista(tarefa){
    console.log(`${tarefa}`);
    const itemDaLista = geraItemDaLista(tarefa);
    ulTarefa.append(itemDaLista);
}

