const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("video");

canvas.width = 800;
canvas.height = 600;

let car = { x: 375, y: 500, width:50, height:80, speed:5 };
let roadOffset = 0;

let minDist = 50, maxDist = 300;
let speedFactor = 0.5;
let steer = 0;

function distance(a,b){
  return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2);
}

function update(){
  car.x += steer * 5;
  car.speed = 2 + speedFactor * 10;

  roadOffset += car.speed;
  if(roadOffset>40) roadOffset=0;

  let roadWidth=400;
  let roadX=canvas.width/2-roadWidth/2;

  if(car.x<roadX) car.x=roadX;
  if(car.x>roadX+roadWidth-car.width) car.x=roadX+roadWidth-car.width;
}

function draw(){
  ctx.fillStyle="green";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  let roadWidth=400;
  let roadX=canvas.width/2-roadWidth/2;
  ctx.fillStyle="gray";
  ctx.fillRect(roadX,0,roadWidth,canvas.height);

  ctx.fillStyle="yellow";
  for(let i=0;i<canvas.height;i+=40){
    ctx.fillRect(canvas.width/2-5,i+roadOffset,10,20);
  }

  ctx.fillStyle="cyan";
  ctx.fillRect(car.x,car.y,car.width,car.height);
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();

// MediaPipe setup
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(results => {
  if(results.multiHandLandmarks && results.multiHandLandmarks.length === 2){
    let h1 = results.multiHandLandmarks[0][0];
    let h2 = results.multiHandLandmarks[1][0];

    let d = distance(h1,h2);

    let norm = (d - minDist) / (maxDist - minDist);
    norm = Math.max(0, Math.min(1, norm));

    speedFactor = 0.8*speedFactor + 0.2*norm;

    let midX = (h1.x + h2.x)/2;
    steer = (midX - 0.5)*2;
  }
});

const camera = new Camera(video, {
  onFrame: async () => {
    await hands.send({image: video});
  },
  width: 640,
  height: 480
});
camera.start();
