class Perceptron {
  constructor() {
    this.lr = 0.1; //learning rate
    this.bias = 1; //bias value
    this.w1 = random(-1,1); //first weight
    this.w2 = random(-1,1); //second weight
  }

  //weighted sum of inputs
  linear_combiner(x1, x2) {
    return x1 * this.w1 + x2 * this.w2 + this.bias;
  }

  //activation function
  activation_function(yin) {
    if (yin < 0) return -1;
    if (yin > 0) return 1;
    return 0;
  }

  //predict the test set
  predict(x1, x2) {
    let prediction = this.linear_combiner(x1, x2);
    prediction = this.activation_function(prediction);
    return prediction;
  }

  //learn on single data
  learn(x1, x2, target) {
    let result = this.predict(x1, x2);
    let error = target - result;
    if (error == 0) return true; //do not learn if error is zero
    this.w1 += this.lr * error * x1; //update w1
    this.w2 += this.lr * error * x2; //update w2
    this.bias += this.lr * error; //update bias
    return false; //return false if error is non zero
  }

  //learn on lots of data
  train(data) {
    let trained = true;
    for (let i = 0; i < data.length; i++) {
      let result = this.learn(data[i].x, data[i].y, data[i].z);
      trained = trained && result;
    }
    return trained; //returns true if training is completed
  }
}

//generate coordinate plane points
function generateTrainingData(x_max, y_max) {
  for (let i = 0; i < totaldata; i++) {
    let random_x = random(0, x_max);
    let random_y = random(0, y_max);
    let group = random_x > random_y ? 1 : -1;
    let d = createVector(random_x, random_y, group);
    trainingData.push(d);
  }
}

function showLearnedBoundary(p) {
  let w1 = p.w1;
  let w2 = p.w2;
  let b = p.bias;
  let x1 = 0;
  let x2 = width;
  let y1 = -(x1 * w1 + b) / w2;
  let y2 = -(x2 * w1 + b) / w2;
  stroke(0)
  line(0, 0, width, height); //original boundary
  stroke(0,0,0,75)
  strokeWeight(8)
  line(x1, y1, x2, y2); //transparent thick black line
  strokeWeight(2)
  stroke(0)
  line(x1, y1, x2, y2); //opaque thin black line
}
