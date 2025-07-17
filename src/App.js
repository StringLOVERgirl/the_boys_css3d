import { useEffect, useRef } from 'react';
import './App.css';
import img from './john.png';
import song1 from './assets/Soldiersong.mp3';
import soldierboy from './Soldier_boy_jensen_ackles_the_boys_s3_png_by_iwasboredsoididthis_del399r-fullview (1) (1).png'
import {setCanvasSize, setImageSize, drawImage} from './sizeHelper.js'

function Canvas({containerref}) {
  
  const canvasRef = useRef(null)
  const animationRef = useRef(null) // единственнаяцель - сохранить ссылку
  // на вызов ниже в риквест фрейм что бы отключить при размонтировании


let canvas,context, image

const imgStuff = {
  newWidth: null,
  newHeight: null,
  offsetX: null,
  offsetY: null,
  index: null
}
const canvasStuff = {
  width:null,
  height:null,
  bgPositionY:null
  }
  
let parentel


function setImage() {
  setImageSize(image, canvasStuff, imgStuff)
  drawImage(image,context,canvasStuff, imgStuff)
}  



  useEffect(() => { // при новом рендере вызывается функция очистки


    canvas = canvasRef.current
    context = canvas.getContext('2d');


     parentel = containerref.current

    if (!canvas || !parentel || !context) return;

    console.log(parentel)


    setCanvasSize(parentel, canvas, canvasStuff, 20)    

     image = new Image()
    
    image.src = img
    console.log(image)

    image.onload =()=>{ 
      setImage()
             animate()
    }

    if(image.complete){
      setImage()
      animate()
    }

    image.onerror = () => {
      console.error('Ошибка загрузки изображения');
      // Можно отобразить fallback, показать сообщение или остановить анимацию
    }

    
    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize(parentel, canvas, canvasStuff,20)
            setImage()
    });

    resizeObserver.observe(parentel);

    let time = 0

// анимейт и обзервер между ренедрами не получат новые значения будут
// работать с замкнутыми перменными
// а переменные в случае рендера не обновятся потмоу что обновляются 
// в эффект котоырй не запустится без изменения зависисотей 

    function animate() { // вызывется с локальными переменными из этого
      // блока поэтому аргументы не нужны 

      let { width, height, bgPositionY } = canvasStuff
      let { newWidth, newHeight, offsetX, offsetY, index } = imgStuff

      const vawe = 5
      context.clearRect(0, 0, width, height)
      context.drawImage(image, 0 - offsetX, 0 - offsetY + bgPositionY, newWidth, newHeight)

      for (let y = newHeight / 4; y <= newHeight; y += vawe) {

        let sin = Math.sin(3.14 / (100 / y) + time)

        context.drawImage(image, // картинка
          // масштабировать можно в любой паре координат
          // в зависимости от цели   
          0, // нольпотому вся каринка 
          y / index, // увеливаем исходную область что бы шаг был такой чтобы 
          // полностью пройти картинку по выосте оригинальной
          image.width / 2,
          vawe / index, // тоже самое что и игрик только с размеров волны
          // умножаем на индекс а ширины нет потому что они не масштабированы
          // масштабируем на лету координаты и переводим высоту 
          // волны в размерность картинки

          0 - offsetX + sin, y - offsetY + bgPositionY, newWidth / 2, vawe
          //тут все просто ресайза и масштабирования нет
          // просто куда и как вставть на канвас и в каком размере 
          // картинку или ее часть 
        )

      }

      context.drawImage(image,

        0,
        image.height * 0.6,
        image.width / 2,
        image.height * 0.4,

        0 - offsetX,
        newHeight * 0.6 - offsetY + bgPositionY,
        newWidth / 2,
        newHeight * 0.4
      )

      time += 0.05

      animationRef.current = requestAnimationFrame(animate) // получаем 
      // ссылку на анимацю чтобы в случае перезапуска компонента
      // оставноиться текущую анимацию и начать новую
      // дабы избежать наложения анимация   
    } 

  return(() => {

    resizeObserver.disconnect()
    image.onload = null // обнуляем обработчики и верхний
    image.onerror = null

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        ; // прерываем аницию
      }

  })

  // end of useEffect
},[containerref])





  return (
    <canvas ref={canvasRef} className='canvas'></canvas>
  )
}



function CanvasSoldierBoy ({size2ref}){

  let canvasRef2 = useRef(null)

    let canvas,context, image

    const imgStuff = {
      newWidth: null,
      newHeight: null,
      offsetX: null,
      offsetY: null,
      index: null
    }
    
    const canvasStuff = {
      width:null,
      height:null,
      bgPositionY:null
      }

let parentel


  function setImage() { // вызывается с локальными переменными 
    setImageSize(image, canvasStuff, imgStuff,1.2)
    drawImage(image,context,canvasStuff, imgStuff)
  }   

console.log('working')

  useEffect(()=>{

         parentel = size2ref.current


    canvas = canvasRef2.current
    console.log(parentel, canvas, 'working')

        if (!canvas || !parentel) return;

     context = canvas.getContext('2d')

      image = new Image()
      image.src = soldierboy
console.log('working')

setCanvasSize(parentel, canvas, canvasStuff, 30)    

      image.onload = setImage
    
    


    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize(parentel, canvas, canvasStuff, 30)    
      setImage()
    });

    resizeObserver.observe(parentel);

    return(()=>{
       resizeObserver.disconnect()
    image.onload = null // обнуляем обработчики и верхний
    image.onerror = null
    })

},[size2ref])

  return (
    <canvas ref={canvasRef2} className='soldierBoy'></canvas>
  )
  }





function App() {

  let sizeRef = useRef(null)
  let contRef = useRef(null)
  let soldierBoySizeRef = useRef(null)
  let songRef = useRef(null)
  let playStatusRef = useRef(false)

  let song
  let playStatus

  function playSong(){
    if(!playStatus){
      song.play()
      playStatus = !playStatus
    } else {
      song.pause()
      playStatus = false
    }
  }

// x
  useEffect(() => {
    
    playStatus= playStatusRef.current
    song = songRef.current
    console.log(song)

    window.addEventListener('mousemove', rotating)
    function rotating(e){
      let rotatexValue =( e.clientX - window.innerWidth/2  )* 0.01+'deg'
      let rotateyValue =( e.clientY - window.innerHeight/2  )* 0.01+'deg'
      let translateX = (( e.clientX - window.innerWidth/2)* -0.02+'px')
      let translateY = (( e.clientY - window.innerHeight/2)* -0.02+'px')

      console.log()

      document.documentElement.style.setProperty('--rotateX', rotatexValue)
      document.documentElement.style.setProperty('--rotateY', rotateyValue)
      document.documentElement.style.setProperty('--canvasTranslateX', translateX)
      document.documentElement.style.setProperty('--canvasTranslateY', translateY)


    }
    
    let vars = ['--rotateX','--rotateY','--canvasTranslateX','--canvasTranslateY']
    vars.forEach((e,i)=>{document.documentElement.style.setProperty(e, '0%')})

  },[])

  return (

    <div className="App">

      <div className='mainCont'>

      <div className='outside cont'
      ref={contRef}
      >
        <div className='middleCont contBg' 
        ref={sizeRef}>
          {/* <div className='image'></div> */}
         <Canvas  containerref={sizeRef}
>         </Canvas>
        </div>
      </div>

        <div className='outside soldierBoyParent'>
          <div className='middleCont soldierBoyCont'
          ref={soldierBoySizeRef}
          onClick={playSong}>
            <CanvasSoldierBoy size2ref={soldierBoySizeRef}>
            </CanvasSoldierBoy>
            <audio 
            ref={songRef}
             src={song1}></audio>
          </div>
        </div>

        </div>
    </div>
  );
}


export default App;

// объяснение логики смещения 
// ну а насчет         let sin = Math.sin(3.14/100*y + time)

// т к переменная игрик увеличивается на вейв  определяем насколько полос нарежет одни полный период 

// коллега сказал лучше писать так 

//         let sin = Math.sin(3.14/(100/y) + time)

// тут дальше идет понимание природы волн и периодичность синуса и значения в радианах 

// период синуса 6 28 значит волна полностью повторится каждый 6 28 12 56 и тд 

// т к мы передаем увеливающийся тайм так и будет расти но рост будет стабильный и каждый раз первое значение на первой итерации будет немного отличаться от предыдущего что и созщдает волну 

// амплитуда значений 1/-1 стандартная 

// тайм увеличивается относительно медленно разница между новымми итерациями будет небольшая анимация будет визуально медленнее 

// теперь самое интересно и возможно сложное как определить на сколько полос один цикл нарежет анимацию ? это определяяет /(100/y) дело в том что игрик увеличивается на 5 начиная с 0 значит значения линейно увелчиваются 0 5 10 и тд шаг 5 

// 100 /5 = 20 20 шагов до того как это выражение пример значение 1 и мы получим 3 14 / 1 значит пол периода и после этого до 200 с шагом 5 (по прежнему ) , значение будет постепенно расти и дойдя до 200 будет 6 28 полный период начинается новый период но пока все еще с тем же фазовым сдвигом т е каждый проход цикла фор меняется  фаза немного и создается волна 

// вот так 


