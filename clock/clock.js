let dom = document.getElementById('clock')
let ctx = dom.getContext('2d')
// 长方形的宽高
let width = ctx.canvas.width
let height = ctx.canvas.height
// 时钟半径
let r = width / 2
let rem = width / 200

function drawBackground() {
  ctx.save()
  // 将原点移到长方形中心
  ctx.translate(r, r)
  // 开始绘制
  ctx.beginPath()
  // 线段宽度
  ctx.lineWidth = 10 * rem
  // 画圆，半径为 r-5，起始角度为0，终止角度为2π，顺时针方向
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false)
  // 画路径
  ctx.stroke()

  drawHourNumbers()
  drawSecondPoints()
}
function drawHourNumbers() {
  let hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
  ctx.font = rem * 18 + 'px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  hourNumbers.forEach((number, i) => {
    let rad = ((2 * Math.PI) / 12) * i
    let x = Math.cos(rad) * (r - 30 * rem)
    let y = Math.sin(rad) * (r - 30 * rem)
    ctx.fillText(number, x, y)
  })
}
function drawSecondPoints() {
  for (let i = 0; i < 60; i++) {
    let rad = ((2 * Math.PI) / 60) * i
    let x = Math.cos(rad) * (r - 18 * rem)
    let y = Math.sin(rad) * (r - 18 * rem)
    ctx.beginPath()
    i % 5 === 0 ? (ctx.fillStyle = '#000') : (ctx.fillStyle = '#ccc')
    ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false)
    ctx.fill()
  }
}

function drawHour(hour, minute) {
  ctx.save()
  ctx.beginPath()
  let rad = ((2 * Math.PI) / 12) * hour
  let mrad = ((2 * Math.PI) / 12 / 60) * minute
  ctx.rotate(rad + mrad)
  ctx.lineWidth = 6 * rem
  ctx.lineCap = 'round'
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r / 2)
  ctx.stroke()
  ctx.restore()
}

function drawMinute(minute) {
  ctx.save()
  ctx.beginPath()
  let rad = ((2 * Math.PI) / 60) * minute
  ctx.rotate(rad)
  ctx.lineWidth = 3 * rem
  ctx.lineCap = 'round'
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r + 30 * rem)
  ctx.stroke()
  ctx.restore()
}

function drawSecond(second) {
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = '#c14543'
  let rad = ((2 * Math.PI) / 60) * second
  ctx.rotate(rad)
  ctx.moveTo(-2 * rem, 20 * rem)
  ctx.lineTo(2 * rem, 20 * rem)
  ctx.lineTo(1, -r + 18 * rem)
  ctx.lineTo(-1, -r + 18 * rem)
  ctx.fill()
  ctx.restore()
}

function drawDot() {
  ctx.beginPath()
  ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false)
  ctx.fill()
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  let now = new Date()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()
  drawBackground()
  drawHour(hour, minute)
  drawMinute(minute)
  drawSecond(second)
  drawDot()
  ctx.restore()
}

draw()
setInterval(draw, 1000)
