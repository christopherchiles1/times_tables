function setup() {
  createCanvas(720, 405);

  radius       = (height / 2) - 15;
  unitVector   = createVector(radius, 0);
  offsetVector = createVector(radius + 15, radius + 15);

  // Variables (to be controlled interactively)
  modulus = 200;
  multiplier = 12;

  // find points along circle
  vectors = [];
  for(let i = 0; i < modulus; i++) {
    let angle = i * TWO_PI / modulus;
    newVector = unitVector.copy().rotate(angle).add(offsetVector);
    vectors.push(newVector);
  }

  noLoop();
}

function draw() {
  background(255);

  vectors.forEach(function(vector) {
    circle(vector.x, vector.y, 1);
  });

  vectors.forEach(function(vector, index) {
    let toVector = vectors[(index * multiplier) % modulus];
    line(vector.x, vector.y, toVector.x, toVector.y);
  });
}
