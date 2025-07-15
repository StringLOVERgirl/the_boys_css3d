import { use, useEffect, useRef } from 'react';
import './App.css';
import img from './john.png';

function Canvas({containerref}) {
  
  const canvasRef = useRef(null)
  const animationRef = useRef(null) // единственнаяцель - сохранить ссылку
  // на вызов ниже в риквест фрейм что бы отключить при размонтировании

let canvas,context, image
let newWidth, newHeight, offsetX, offsetY, index
let width, height, bgPositionY
let parentel


function setCanvasSize(){

  let contBgStyles = getComputedStyle(parentel)
   width  = parseFloat(contBgStyles.width)*1.1 // отрезаем пикс
   height = parseFloat(contBgStyles.height)*1.1
  canvas.width = width
  canvas.height = height

  bgPositionY = height / 100 * 20
  // эмуляция backgorund-postitionY в процентах от высоты канваса 
  // умножение ключевое 
  console.log(width,height)
} 

function setImageSize(){
      
  const indexX = width/image.width  // делим размер канваса 
  // на размер картинки, значит для масштабирования
  // картинки (части) нужно делить на индекс 
  const indexY = height/image.height
  index = Math.max(indexX,indexY)
  newWidth = image.width*index
  newHeight = image.height*index
  offsetX = (newWidth - width)/2
  offsetY = (newHeight - height)/2

} 

function drawImage(){
  setImageSize()
  console.log('drawning')
  context.clearRect(0,0,width, height)
  context.drawImage(image, 0-offsetX, 0-offsetY+bgPositionY, newWidth, newHeight)
}



  useEffect(() => { // при новом рендере вызывается функция очистки


    canvas = canvasRef.current
    context = canvas.getContext('2d');


     parentel = containerref.current

    if (!canvas || !parentel || !context) return;

    console.log(parentel)


setCanvasSize()
    

     image = new Image()
    
    image.src = img
    console.log(image)

    image.onload =()=>{ 
      drawImage()
       animate()
    }

    if(image.complete){
    drawImage()
      animate()
    }

    image.onerror = () => {
      console.error('Ошибка загрузки изображения');
      // Можно отобразить fallback, показать сообщение или остановить анимацию
    }

    
    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
      setImageSize()
      drawImage()
    });

    resizeObserver.observe(parentel);

    let time = 0


    function animate(){
const vawe = 5
      context.clearRect(0,0,width, height)

      context.drawImage(image, 
        0-offsetX, 0-offsetY+bgPositionY, newWidth, newHeight)
      for(let y = newHeight/4; y <= newHeight; y+=vawe){
        let sin = Math.sin(3.14/(100/y) + time)
        context.drawImage(image, // картинка
        // масштабировать можно в любой паре координат
        // в зависимости от цели   
        0, // нольпотому вся каринка 
        y/index, // увеливаем исходную область что бы шаг был такой чтобы 
        // полностью пройти картинку по выосте оригинальной
        image.width/2,
        vawe/index, // тоже самое что и игрик только с размеров волны
        // умножаем на индекс а ширины нет потому что они не масштабированы
        // масштабируем на лету координаты и переводим высоту 
        // волны в размерность картинки

        0-offsetX+sin,y-offsetY+bgPositionY, newWidth/2, vawe 
        //тут все просто ресайза и масштабирования нет
       // просто куда и как вставть на канвас и в каком размере 
       // картинку или ее часть 
       )
      }
        context.drawImage(image,

          0,
          image.height*0.6,
          image.width/2,
          image.height*0.4,

        0-offsetX,
        newHeight*0.6-offsetY+bgPositionY,
        newWidth/2,
        newHeight*0.4
        )

      time+=0.05
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
},[containerref])





  return (
    <canvas ref={canvasRef} className='canvas'></canvas>
  )
}



function CanvasSoldierBoy (){

  let canvasRef = useRef(null)


  return (
    <canvas ref={canvasRef} className='soldierBoy'></canvas>
  )
}

function App() {

  let sizeRef = useRef(null)
  let contRef = useRef(null)
  let canvasRef = useRef(null)
  let sizeSoldierBoyCanvasRef = useRef(null)


  useEffect(() => {

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

      <div className='cont'
      ref={contRef}
      >
        <div className='contBg' 
        ref={sizeRef}>
          {/* <div className='image'></div> */}
         <Canvas  containerref={sizeRef}
>         </Canvas>
        </div>
      </div>

        <div className='soldierBoyParent'>
          <div className='soldierBoyCont'>
            <CanvasSoldierBoy contref={sizeSoldierBoyCanvasRef}>
            </CanvasSoldierBoy>
          </div>
        </div>

        </div>
    </div>
  );
}

// стоит немного увеличить высоту канваса на случай выезда при анимации 3д

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


