export function setCanvasSize(parentel, canvas, canvasStuff, bfPosY){


let {canvaswidth,     
  canvasheight,    
  bgPositionY
} = canvasStuff.current

console.log('setCanvasSize', parentel, canvas)

    let contBgStyles = getComputedStyle(parentel)
    canvaswidth  = parseFloat(contBgStyles.width)*1.1 // отрезаем пикс
    canvasheight = parseFloat(contBgStyles.height)*1.1
    canvas.width  = canvaswidth
    canvas.height = canvasheight
  
    bgPositionY = canvasheight / 100 * bfPosY
    // эмуляция backgorund-postitionY в процентах от высоты канваса 
    // умножение ключевое 
    console.log(canvaswidth,canvasheight)

    canvasStuff.current = {
      canvaswidth,
      canvasheight,
      bgPositionY
    }
  } 
  
  
  
 export function setImageSize(imG, canvasStuff, imgStuff, scaleIndex=1){
  let image = imG.current

  let {canvaswidth,     
    canvasheight,    
    bgPositionY
  } = canvasStuff.current

   let { newWidth,
     newHeight,
     offsetX,
     offsetY,
     index    } = imgStuff.current
     console.log('set image',image, canvasStuff, imgStuff)


    const indexX = canvaswidth/image.width  // делим размер канваса 
    // на размер картинки, значит для масштабирования
    // картинки (части) нужно делить на индекс 
    const indexY = canvasheight/image.height
    
    index = Math.max(indexX,indexY)
  
    newWidth  = image.width  * index * scaleIndex
    newHeight = image.height * index * scaleIndex
  
    offsetX = (newWidth  - canvaswidth)  / 2
    offsetY = (newHeight - canvasheight) / 2

    imgStuff.current = {
      newWidth,
     newHeight,
     offsetX,
     offsetY,
     index   
    }
  
  } 
  
  
  
  export function drawImage(imG,cont,canvasStuff, imgStuff){

    let context = cont.current
    let image = imG.current
  
  let {canvaswidth,     
    canvasheight,    
    bgPositionY
  } = canvasStuff.current

   let { newWidth,
     newHeight,
     offsetX,
     offsetY,
     index    } = imgStuff.current
  
    console.log('drawning')
    context.clearRect(0,0, canvaswidth, canvasheight)
    context.drawImage( image, 
      0 - offsetX, 
      0 - offsetY + bgPositionY, 
      newWidth, 
      newHeight)
  }

    
 export function playSong(playStatusRef, songRef){
    if(!playStatusRef.current){
      songRef.current.play()
      playStatusRef.current = !playStatusRef.current
    } else {
      songRef.current.pause()
      playStatusRef.current = false
    }
  }