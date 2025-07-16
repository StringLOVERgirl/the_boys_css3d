export function drawImage(setImageSize,context,width,height,image,offsetX,offsetY,bgPositionY,newWidth,newHeight){
    setImageSize()
    console.log('drawning')
    context.clearRect(0,0,width, height)
    context.drawImage(image, 0-offsetX, 0-offsetY+bgPositionY, newWidth, newHeight)
  }