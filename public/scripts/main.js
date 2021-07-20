import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')


//Pegar todos os botoes com as classe check
const checkButtons = document.querySelectorAll('.actions a.check')


checkButtons.forEach(button => {
    //Adciona a escuta
    button.addEventListener('click', handleClick)
})


/*Quando botão delete for clicado ele abre o modal */
const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
    //Adciona a escuta
    button.addEventListener('click', (event) => handleClick(event,false)) 
})

function handleClick(event, check = true){
    event.preventDefault()    
    /* capturando informações por meio de dataset */
    const form = document.querySelector('.modal form')
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id
    const slug = check ? "check" : "delete"    
    
    /* construindo rota para envio via modal */
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)
    
    const text = check ? "Marcar como lida" : "Excluir"    
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
    modal.open()
}

//Pegar quando o marccar como lido for clicado





