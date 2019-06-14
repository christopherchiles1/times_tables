function setup() {
  createCanvas(720, 405);

  let margin = 15;

  radius         = (height / 2) - margin;
  unitVector     = createVector(radius, 0);
  circleLocation = createVector(radius + margin, radius + margin);
  menuLocation   = createVector(2 * radius + 3 * margin, margin)

  modulusSlider = createSlider(10, 500, 200);
  modulusSlider.position(menuLocation.x, menuLocation.y);

  multiplierSlider = createSlider(0, 100, 12);
  multiplierSlider.position(menuLocation.x, menuLocation.y + 25);
}

function draw() {
  let modulus = modulusSlider.value();
  let multiplier = multiplierSlider.value();
  
  let vectors = [];
  for(let i = 0; i < modulus; i++) {
    let angle = i * TWO_PI / modulus;
    newVector = unitVector.copy().rotate(angle).add(circleLocation);
    vectors.push(newVector);
  }

  background(255);

  vectors.forEach(function(vector) {
    circle(vector.x, vector.y, 1);
  });

  vectors.forEach(function(vector, index) {
    let toVector = vectors[(index * multiplier) % modulus];
    line(vector.x, vector.y, toVector.x, toVector.y);
  });
}
