function setup() {
  createCanvas(720, 405);

  let margin = 15;

  radius         = (height / 2) - margin;
  unitVector     = createVector(radius, 0);
  circleLocation = createVector(radius + margin, radius + margin);
  menuLocation   = createVector(2 * radius + 3 * margin, margin)

  modulusSlider = createSlider(10, 300, 200);
  modulusSlider.position(menuLocation.x, menuLocation.y);

  multiplierSlider = createSlider(0, 100, 12);
  multiplierSlider.position(menuLocation.x, menuLocation.y + 25);
}

function draw() {
  let multiplier = multiplierSlider.value();
  let modulus    = modulusSlider.value();
  let points     = getCirclePoints(multiplier, modulus);

  background(255);

  drawCirclePoints(points);
  drawConnections(points, multiplier, modulus);
  drawLabels();
}

function getCirclePoints(multiplier, modulus) {
  let points = [];
  for(let i = 0; i < modulus; i++) {
    let angle = i * TWO_PI / modulus;
    nextPoint = unitVector.copy().rotate(angle).add(circleLocation);
    points.push(nextPoint);
  }

  return points;
}

function drawCirclePoints(points) {
  points.forEach(function(point) {
    circle(point.x, point.y, 1);
  });
}

function drawConnections(points, multiplier, modulus) {
  points.forEach(function(point, index) {
    let toPoint = points[(index * multiplier) % modulus];
    line(point.x, point.y, toPoint.x, toPoint.y);
  });
}

function drawLabels() {
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text(`Multiplier (${multiplierSlider.value()})`, multiplierSlider.x + multiplierSlider.width + 15, multiplierSlider.y + 8);
  text(`Modulus (${modulusSlider.value()})`, modulusSlider.x + modulusSlider.width + 15, modulusSlider.y + 8);
}
