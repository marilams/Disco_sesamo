const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const yellow= document.getElementById('yellow')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 10

class Game {
    constructor() {
      this.start()
      this.generarSecuencia() 
      this.nextLevel()
    }
    start() {
      btnStart.classList.toggle('hide')
      this.elegirColor = this.elegirColor.bind(this)
      this.level = 1
      this.colors = {
        blue,
        violet,
        yellow,
        green
      }
    }
    generarSecuencia() {
      this.secuencia = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }

    nextLevel(){
      this.iluminarSecuencia()
      this.clikcEvents()
      this.score = 0
    }
    transformarNumeroAColor(numero){
      switch (numero) {
        case 0:
          return 'blue'
        case 1:
          return 'violet'
        case 2:
          return 'yellow'
        case 3:
          return 'green'
      }
    }

    transformarColorANumero(color){
      switch (color) {
        case 'blue':
          return 0
        case 'violet':
          return 1
        case 'yellow':
          return 2
        case 'green':
          return 3
      }
    }
    iluminarSecuencia(){
      for( let i = 0; i < this.level; i++){
       const color = this.transformarNumeroAColor(this.secuencia[i])
       setTimeout(() => {
         this.iluminarColor(color)
       }, 1000*i);
      }
    }
    iluminarColor(color){
      this.colors[color].classList.add('light')
      setTimeout(() =>  this.apagarColor(color), 450);
    }
    apagarColor(color){
      this.colors[color].classList.remove('light')
    }
    clikcEvents(){
      this.colors.blue.addEventListener('click', this.elegirColor)
      this.colors.violet.addEventListener('click', this.elegirColor)
      this.colors.yellow.addEventListener('click', this.elegirColor)
      this.colors.green.addEventListener('click', this.elegirColor)
    }
    offClicks(){
      this.colors.blue.removeEventListener('click', this.elegirColor)
      this.colors.violet.removeEventListener('click', this.elegirColor)
      this.colors.yellow.removeEventListener('click', this.elegirColor)
      this.colors.green.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev){
      const nombreColor = ev.target.dataset.color
      var numeroColor = this.transformarColorANumero(nombreColor);
      this.iluminarColor(nombreColor)
      if (numeroColor === this.secuencia[this.score]){
        this.score++
        if(this.score === this.level){
          this.level++
          this.offClicks()
            if(this.level === (LAST_LEVEL + 1)){
              this.winGame()
            } else {
              setTimeout(() => {
                this.nextLevel()
              }, 1200);
            }
          }
        } else {
          this.lostTheGame()
        }
      }
      winGame(){
        swal('Felicidades!!', 'Ganaste el juego', 'success')
        .then(() => {
        this.start()
      })
    }
    lostTheGame(){
      swal('Oooooh', 'Lo sentimos, has fallado :(', 'error')
      .then(() => {
        this.offClicks()
        this.start()
      })
    }
}

function startGame(){
  window.game = new Game();
}
 
      