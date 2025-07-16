export function setCanvasSize(parentel, canvas, canvasStuff, bfPosY){

    let contBgStyles = getComputedStyle(parentel)
    canvasStuff.width  = parseFloat(contBgStyles.width)*1.1 // отрезаем пикс
    canvasStuff.height = parseFloat(contBgStyles.height)*1.1
    canvas.width = canvasStuff.width
    canvas.height = canvasStuff.height
  
    canvasStuff.bgPositionY = canvasStuff.height / 100 * bfPosY
    // эмуляция backgorund-postitionY в процентах от высоты канваса 
    // умножение ключевое 
    console.log(canvasStuff.width,canvasStuff.height)
  } 
  
  
  
 export function setImageSize(image, canvasStuff, imgStuff){
        
    const indexX = canvasStuff.width/image.width  // делим размер канваса 
    // на размер картинки, значит для масштабирования
    // картинки (части) нужно делить на индекс 
    const indexY = canvasStuff.height/image.height
    
    imgStuff.index = Math.max(indexX,indexY)
  
    imgStuff.newWidth = image.width*imgStuff.index
    imgStuff.newHeight = image.height*imgStuff.index
  
    imgStuff.offsetX = (imgStuff.newWidth - canvasStuff.width)/2
    imgStuff.offsetY = (imgStuff.newHeight - canvasStuff.height)/2
  
  } 
  
  
  
  export function drawImage(image,context,canvasStuff, imgStuff){
  
    console.log('drawning')
    context.clearRect(0,0, canvasStuff.width, canvasStuff.height)
    context.drawImage( image, 
      0 - imgStuff.offsetX, 
      0 - imgStuff.offsetY + canvasStuff.bgPositionY, 
      imgStuff.newWidth, 
      imgStuff.newHeight)
  }