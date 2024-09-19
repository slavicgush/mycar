const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50,"KEYS",3,"red");



const traffic = [
  new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
  new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
  new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
  new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2,getRandomColor()),
  new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
  new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2,getRandomColor()),
  new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2,getRandomColor()),
];
//traffic.push(v8);
animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
   traffic[i].update(road.borders,[]); //[]
  }

  car.update(road.borders,traffic);

  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);

  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  car.draw(ctx);

  ctx.restore();
  requestAnimationFrame(animate);
}
