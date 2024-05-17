let data = [];
let p;
let epoch = 0;
let button;
function setup() {
  createCanvas(745, 665);
  background(220);
  button = createButton("Next Epoch");
  button.position(width / 2 - 10, height - 25);
  strokeWeight(1.5);
  line(50, 50, width - 50, height - 50);
  p = new Perceptron();
  for (let i = 0; i < 100; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let z = x > y ? 1 : -1;
    data.push(createVector(x, y, z));
  }
  strokeWeight(2);
  for (let point of data) {
    fill(255, 0, 0);
    circle(point.x, point.y, 15);
  }
  textSize(20);
  strokeWeight(3);
  fill(0);
  text(`Epoch ${epoch}`, width - 100, 25);
}

function draw() {
  // background(220);
  button.mousePressed(startEpoch);
}

function startEpoch() {
  epoch++;
  stroke(220);
  strokeWeight(0);
  fill(220);
  rect(0, 0, width, 35);

  strokeWeight(1);
  fill(0);
  text(`Epoch ${epoch}`, width - 100, 25);

  p.train(data);
  let a = 100;
  let b = 101;
  let result = p.predict(a, b);
  //console.clear()
  console.log(`Prediction for ${a},${b}: `, result);
  console.log(`Actual class for ${a},${b}: `, -1);

  strokeWeight(1);
  fill(0);
  stroke(220);
  text(`Predicting class for ${a},${b}: ${result}`, 25, 25);
  fill(0, 0, 255);
  strokeWeight(4);
  stroke(0);
  circle(a, b, 20);
}
