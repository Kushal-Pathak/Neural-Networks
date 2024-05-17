class Perceptron {
  constructor() {
    this.lr = 0.01; //learning rate
    this.bias = 1; //bias value
    this.w1 = random(-1, 1); //first weight
    this.w2 = random(-1, 1); //second weight
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

  //learn on single data
  learn(x1, x2, target) {
    let result = this.linear_combiner(x1, x2);
    result = this.activation_function(result);
    let error = target - result;
    this.w1 += this.lr * error * x1;
    this.w2 += this.lr * error * x2;
    this.bias += this.lr * error;
    stroke(0)
    strokeWeight(2)
    if (error == 0) fill(0, 255, 0);
    else fill(255, 0, 0);
    circle(x1, x2, 15);
  }

  //train on lots of data
  train(data) {
    for (let i = 0; i < data.length; i++) {
      this.learn(data[i].x, data[i].y, data[i].z);
    }
  }

  //predict the test set
  predict(x1, x2) {
    let prediction = this.linear_combiner(x1, x2);
    prediction = this.activation_function(prediction);
    return prediction;
  }
}
