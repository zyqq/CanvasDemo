let clock = document.getElementById('clock')
let bg = document.getElementById('bg')
let context = bg.getContext('2d')
let { width: bgWidth, height: bgHeight } = clock.getBoundingClientRect()
bg.width = bgWidth
bg.height = bgHeight
let image = new Image()
image.src = 'bg.jpg'
image.onload = e => {
  draw(image)
}
function draw(image) {
  context.clearRect(0, 0, bgWidth, bgHeight)
  context.save()
  context.drawImage(image, 0, 0)
  context.restore()
}
