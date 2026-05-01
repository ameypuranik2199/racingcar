const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let car = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  width: 50,
  height: 80,
  speed: 5
};

let keys = {};
let roadOffset = 0;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function update() {
  if (keys["ArrowLeft"]) car.x -= 6;
  if (keys["ArrowRight"]) car.x += 6;

  if (keys["ArrowUp"]) car.speed += 0.1;
  if (keys["ArrowDown"]) car.speed -= 0.1;

  car.speed = Math.max(2, Math.min(car.speed, 15));

  roadOffset += car.speed;
  if (roadOffset > 40) roadOffset = 0;

  const roadWidth = 400;
  const roadX = canvas.width / 2 - roadWidth / 2;

  if (car.x < roadX) car.x = roadX;
  if (car.x > roadX + roadWidth - car.width)
    car.x = roadX + roadWidth - car.width;
}

function draw() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const roadWidth = 400;
  const roadX = canvas.width / 2 - roadWidth / 2;
  ctx.fillStyle = "gray";
  ctx.fillRect(roadX, 0, roadWidth, canvas.height);

  ctx.fillStyle = "yellow";
  for (let i = 0; i < canvas.height; i += 40) {
    ctx.fillRect(canvas.width / 2 - 5, i + roadOffset, 10, 20);
  }

  ctx.fillStyle = "cyan";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
