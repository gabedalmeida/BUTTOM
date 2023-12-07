function tocaSom(seletorDeAudio) {
    const elemento = document.querySelector(seletorDeAudio);
    
    if (elemento != null && elemento.localName === 'audio'){
        elemento.play();
        
    }else{
        console.log('Elemento não encontrado ou seletor inválido!');
    }
    
}

const listaDeTeclas = document.querySelectorAll('.tecla');

for (let contador = 0; contador < listaDeTeclas.length; contador ++) {

    const tecla = listaDeTeclas[contador];

    const instrumento = tecla.classList[1];
    //console.log(instrumento)

    const idAudio = `#som_${instrumento}`;

    tecla.onclick = function () {
        tocaSom(idAudio);

    
    }
   // console.log(contador);
   tecla.onkeydown =  function (event) {
        
    console.log(event.code === 'Space' || event.code === 'Enter')
    if (event.code == 'Space' || event.code == 'Enter') {
        tecla.classList.add('ativa');
        }
   }
   tecla.onkeyup = function () {
    tecla.classList.remove('ativa')
   }
}



 

