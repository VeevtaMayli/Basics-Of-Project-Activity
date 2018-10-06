const SUN_SPEED = 0.2;
const SUN_RADIUS = 40;
const HORIZON = 0.75;
const MAX_CLOUDS = 5;
const CLOUDS_MAX_HEIGHT = 0.15;
const CLOUD_SIZE_X = 50;
const SKY_COLOR = 240;

function HslColor({
    hue,
    saturation,
    lightness
}) {
    this.h = hue;
    this.s = saturation;
    this.l = lightness;
    this.MAX_HUE = 360;

    this.toFillStyle = function () {
        const h = Math.floor(this.h);
        const s = this.s * 100;
        const l = this.l * 100;
        return "hsl(" + h + "," + s + "%," + l + "%)";
    }
}

function Sun({
    startX,
    startY,
    radius,
    angle
}) {
    this.x = startX;
    this.y = startY;
    this.radius = radius;
    this.angle = angle;
}

function Cloud({
    startX,
    startY,
    speed,
    amplitude,
    frequency
}) {
    this.x = startX;
    this.y = startY;
    this.distanceY = startY;
    this.speed = speed;
    this.amplitude = amplitude;
    this.frequency = frequency;
}

function Sky({color}) {
    this.color = color;
}

function drawSky({ctx, sky, width, height}) {
    ctx.fillStyle = sky.color.toFillStyle();
    ctx.fillRect(0, 0, width, HORIZON * height);
}

function recolorSky({sky, angle}) {
    const lightness = 1 - (Math.sin(angle) + 1) * 0.5;
    sky.color.l = lightness;
}

function drawGrass({ctx, width, height}) {
    ctx.fillStyle = 'rgb(106,168,79)';
    ctx.fillRect(0, HORIZON * height, width, (1 - HORIZON) * height);
}

function drawSun({ctx, sun}) {
    ctx.fillStyle = 'rgb(255,229,153)';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, 2 * Math.PI);
    ctx.fill();
}

function moveSun({sun, dt, boxWidth, boxHeight}) {
    const deltaAngle = dt * SUN_SPEED;
    sun.angle = (sun.angle + deltaAngle) % (2 * Math.PI);
    sun.x = 400 * Math.cos(-sun.angle) + boxWidth / 2;
    sun.y = 400 * Math.sin(sun.angle) + HORIZON * boxHeight;
}

function drawCloud({ctx, cloud, radiusX, radiusY}) {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(207,226,243)';
    ctx.ellipse(cloud.x + radiusX, cloud.y + 1.7 * radiusY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.ellipse(cloud.x + 1.7 * radiusX, cloud.y + radiusY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.ellipse(cloud.x + 2.5 * radiusX, cloud.y + 1.7 * radiusY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function createCloud({boxWidth, boxHeight}) {
    const startX = Math.random() * boxWidth;
    const startY = Math.random() * CLOUDS_MAX_HEIGHT * boxHeight + 20;
    const speed = Math.random() * 80 + 20;
    const amplitude = Math.random() * 20;
    const frequency = Math.random() * 100 + 30;
    return new Cloud({startX, startY, speed, amplitude, frequency})
}

function moveCloud({cloud, dt, boxWidth, boxHeight}) {
    const deltaX = cloud.speed * dt;
    cloud.x -= deltaX;
    const deltaPhase = (cloud.x / cloud.frequency) % 2 * Math.PI;
    cloud.y = cloud.distanceY + (cloud.amplitude * Math.sin(deltaPhase));
    if (cloud.x + 2.5 * CLOUD_SIZE_X < 0) {
        cloud.x = boxWidth;
    }
}

function drawHouse(ctx) {
    //draw chimney
    ctx.fillStyle = 'rgb(102,102,102)';
    ctx.fillRect(550, 160, 35, 100);

    //draw roof
    ctx.fillStyle = 'rgb(204,0,0)';
    ctx.beginPath();
    ctx.moveTo(375, 300);
    ctx.lineTo(500, 150);
    ctx.lineTo(625, 300);
    ctx.lineTo(375, 300);
    ctx.fill();

    //draw wall
    ctx.fillStyle = 'rgb(191,144,0)';
    ctx.fillRect(375, 300, 250, 180);

    // draw window
    ctx.fillStyle = 'rgb(255,217,102)';
    ctx.fillRect(455, 320, 90, 100);

    //draw window frame
    ctx.strokeStyle = 'rgb(93,92,89)';
    ctx.beginPath();
    ctx.moveTo(455, 370);
    ctx.lineTo(545, 370);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(500, 320);
    ctx.lineTo(500, 420);
    ctx.stroke();
}

function redraw({ctx, width, height, sun, clouds, sky}) {
    drawSky({ctx, sky, width, height});
    drawSun({ctx, sun});
    drawGrass({ctx, width, height});
    drawHouse(ctx);
    for (let cloud of clouds) {
        drawCloud({ctx, cloud, radiusX: CLOUD_SIZE_X, radiusY: 30})
    }
}

function update({sun, clouds, sky, dt, boxWidth, boxHeight}) {
    moveSun({sun, dt, boxWidth, boxHeight});
    recolorSky({sky, angle: sun.angle});
    for (const cloud of clouds) {
        moveCloud({cloud, dt, boxWidth, boxHeight});
    }
}

function main() {
    const canvasEl = document.getElementById('canvas');
    const width = canvasEl.offsetWidth;
	const height = canvasEl.offsetHeight;
    
    const ctx = canvasEl.getContext('2d');

    let sun = new Sun({
        startX: 0.15 * width,
        startY: HORIZON * height,
        radius: SUN_RADIUS,
        angle: 0.5 * Math.PI
    });

    let sky = new Sky({
        color: new HslColor({
            hue: SKY_COLOR,
            saturation: 0.5,
            lightness: 0.5
        })
    });

    let clouds = [];
    for (let i = 0; i < MAX_CLOUDS; i++) {
        clouds.push(createCloud({
            boxWidth: width,
            boxHeight: height
        }));
    }

    redraw({ctx, width, height, sun, clouds, sky});

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimestamp = Date.now();
        const deltaTime = (currentTimestamp - lastTimestamp) * 0.001;
        lastTimestamp = currentTimestamp;
        update({sun, clouds, sky, dt: deltaTime, boxWidth: width, boxHeight: height});
        redraw({ctx, width, height, sun, clouds, sky});
        requestAnimationFrame(animateFn);
    };
    animateFn();
}