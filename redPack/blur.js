let canvasWidth = 800
let canvasHeight = 600
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
canvas.width = canvasWidth
canvas.height = canvasHeight

let clippingRegion = {
  x: 400,
  y: 200,
  r: 50
}
let image = new Image()
image.src = 'avatar.jpg'
image.onload = e => {
  initCanvas()
}

function initCanvas() {
  draw(image, clippingRegion)
}

function setClippingRegion(clippingRegion) {
  context.beginPath()
  context.arc(
    clippingRegion.x,
    clippingRegion.y,
    clippingRegion.r,
    0,
    Math.PI * 2,
    false
  )
  context.clip()
}

function draw(image, clippingRegion) {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.save()
  setClippingRegion(clippingRegion)
  context.drawImage(image, 0, 0)
  context.restore()
}
