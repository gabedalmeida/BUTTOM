const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPausebt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/POMODORO/sons/luna-rise-part-one.mp3');
musica.loop = true

const audioPlay = new Audio('/POMODORO/sons/play.wav');
const audioPause = new Audio('/POMODORO/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')


let tempoDecorridoSegundos = 5;
let intervaloID = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
   alterarContexto('foco');
   focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () =>{
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto (contexto) {
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
        zerar();
        alert('Tempo finalizado!');
        return ;
    }
    tempoDecorridoSegundos -= 1;
    console.log('Temporizador:' + tempoDecorridoSegundos);
}

startPausebt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar (){
    if(intervaloID){
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloID = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloID);
    intervaloID = null;
}