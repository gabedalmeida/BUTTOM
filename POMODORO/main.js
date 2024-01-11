const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPausebt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/POMODORO/sons/luna-rise-part-one.mp3');
musica.loop = true

 

const audioPlay = new Audio('/POMODORO/sons/play.wav');
const audioPause = new Audio('/POMODORO/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')


let tempoDecorridoSegundos = 1500;
let intervaloID = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500;
   alterarContexto('foco');
   focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () =>{
    tempoDecorridoSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto (contexto) {
    mostrarTempo();

    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/POMODORO/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`

            break;
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoSegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento)
        }
        zerar();
        return ;
    }
    tempoDecorridoSegundos -= 1;
    mostrarTempo();
}

startPausebt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar (){
    if(intervaloID){
        audioPause.play();
         
        zerar();
        return;
    }
    audioPlay.play();
    intervaloID = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtIcone.setAttribute('src', `/POMODORO/imagens/pause.png`);
    iniciarOuPausarBt.textContent = 'Pausar';

}

function zerar(){
    clearInterval(intervaloID);
    
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarBtIcone.setAttribute('src', `/POMODORO/imagens/play_arrow.png`);
    intervaloID = null;
     
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute:"2-digit", second:"2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()