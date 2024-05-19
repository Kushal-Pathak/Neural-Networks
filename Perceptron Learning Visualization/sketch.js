let perceptron; //our perceptron
let trainingData = []; //training data's array
let totaldata = 200; //total number of training data to use
let iteration = 0; //to track the number of data points trained in an epoch
let epoch = 0; //to track total number of epochs
let div; //to show prediction text
let alpha; //slider to adjust learning rate

function setup() {
  createCanvas(720, 720);
  generateTrainingData(width, height); //generating training data
  div = createDiv("Prediction: ");
  div.position(width + 10, 5);
  div.style("font-size", "20px");
  div.style("font-family", "sans-serif");
  div.style("font-weight", "bold");
  alpha = createSlider(0.001, 100, 50, 0);
  alpha.position(width + 10, 35);
  alpha.size(145);
  perceptron = new Perceptron();
}

function draw() {
  frameRate(100);
  background(220);
  perceptron.lr = alpha.value();
  let data = trainingData[iteration];
  perceptron.learn(data.x, data.y, data.z);
  iteration++;
  for (data of trainingData) {
    let result = perceptron.predict(data.x, data.y);
    if (result == data.z) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    strokeWeight(2);
    if (data.z == 1) {
      push();
      translate(data.x, data.y);
      rectMode(CENTER);
      rect(0, 0, 10, 10);
      pop();
    } else {
      circle(data.x, data.y, 12);
    }
  }
  if (iteration == totaldata) iteration = 0;
  push();
  stroke(0);
  showLearnedBoundary(perceptron);
  pop();
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    var prediction = perceptron.predict(mouseX, mouseY);
    push();
    noFill();
    stroke(0, 0, 255);
    circle(mouseX, mouseY, 20);
    strokeWeight(10);
    stroke(0);
    point(mouseX, mouseY);
    pop();
  } else {
    prediction = null;
  }
  div.html(`Prediction: ${prediction}`);
}
